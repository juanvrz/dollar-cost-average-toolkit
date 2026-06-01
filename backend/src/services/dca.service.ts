import { fetchHistoricalPrices, fetchHistoricalExchangeRates } from '../clients/yahoofinance.client';
import { convertPriceHistory } from './currency.service';
import { ASSET_CATALOG } from '../types/asset.catalog';
import { DCAInput, DCAResult, DCAPurchase, DCASummary } from '../types/dca.types';
import { AssetPriceHistory } from '../types/asset.types';

export async function simulateDCA(input: DCAInput): Promise<DCAResult> {
	const asset = ASSET_CATALOG.find((a) => a.id === input.assetId);
	if (!asset) {
		throw new Error(`Asset not found: ${input.assetId}`);
	}

	const startDate = new Date(input.startDate);
	const endDate = new Date(input.endDate);

	let priceHistory: AssetPriceHistory = await fetchHistoricalPrices(asset.yahooSymbol, startDate, endDate, input.frequency);

	if (input.currency !== asset.nativeCurrency) {
		const exchangeRates = await fetchHistoricalExchangeRates(input.currency, asset.nativeCurrency, startDate, endDate, input.frequency);
		priceHistory = convertPriceHistory(priceHistory, exchangeRates);
	}

	const purchases = buildPurchases(priceHistory, input.amountPerPurchase);
	const summary = buildSummary(purchases);

	return { input, purchases, summary };
}

function buildPurchases(priceHistory: AssetPriceHistory, amountPerPurchase: number): DCAPurchase[] {
	let totalInvested = 0;
	let totalUnits = 0;

	return priceHistory.prices.map((point) => {
		const unitsBought = amountPerPurchase / point.price;
		totalInvested += amountPerPurchase;
		totalUnits += unitsBought;
		const portfolioValue = totalUnits * point.price;

		return {
			date: point.date,
			pricePerUnit: point.price,
			unitsBought,
			amountInvested: amountPerPurchase,
			totalInvested,
			totalUnits,
			portfolioValue,
		};
	});
}

function buildSummary(purchases: DCAPurchase[]): DCASummary {
	if (purchases.length === 0) {
		return {
			totalInvested: 0,
			totalUnits: 0,
			finalPrice: 0,
			finalValue: 0,
			absoluteReturn: 0,
			percentageReturn: 0,
		};
	}

	const last = purchases[purchases.length - 1];
	const absoluteReturn = last.portfolioValue - last.totalInvested;
	const percentageReturn = (absoluteReturn / last.totalInvested) * 100;

	return {
		totalInvested: last.totalInvested,
		totalUnits: last.totalUnits,
		finalPrice: last.pricePerUnit,
		finalValue: last.portfolioValue,
		absoluteReturn,
		percentageReturn,
	};
}
