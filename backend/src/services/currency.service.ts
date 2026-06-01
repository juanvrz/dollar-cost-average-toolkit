import { AssetPriceHistory, PricePoint } from '../types/asset.types';

export function convertPriceHistory(priceHistory: AssetPriceHistory, exchangeRates: AssetPriceHistory): AssetPriceHistory {
	// Using a Map for O(1) date lookups instead of O(n) array search.
	const ratesByDate = new Map<string, number>();
	exchangeRates.prices.forEach((rate) => {
		ratesByDate.set(rate.date, rate.price);
	});

	const convertedPrices: PricePoint[] = priceHistory.prices.map((point) => {
		const rate = findClosestRate(point.date, ratesByDate);
		return {
			date: point.date,
			price: point.price / rate,
		};
	});

	return {
		symbol: priceHistory.symbol,
		prices: convertedPrices,
	};
}

// Asset and exchange rate dates don't always match (e.g. BTC trades on weekends, forex doesn't).
// If the exact date is missing, we fall back to the closest available rate.
function findClosestRate(targetDate: string, ratesByDate: Map<string, number>): number {
	if (ratesByDate.has(targetDate)) {
		return ratesByDate.get(targetDate)!;
	}

	const target = new Date(targetDate).getTime();
	let closestDate = '';
	let minDiff = Infinity;

	for (const date of ratesByDate.keys()) {
		const diff = Math.abs(new Date(date).getTime() - target);
		if (diff < minDiff) {
			minDiff = diff;
			closestDate = date;
		}
	}

	return ratesByDate.get(closestDate)!;
}
