import { Currency } from './asset.catalog';
import { Frequency } from '../clients/yahoofinance.client';

export interface DCAInput {
	assetId: string;
	amountPerPurchase: number;
	currency: Currency;
	startDate: string;
	endDate: string;
	frequency: Frequency;
}

export interface DCAPurchase {
	date: string;
	pricePerUnit: number;
	unitsBought: number;
	amountInvested: number;
	totalInvested: number;
	totalUnits: number;
	portfolioValue: number;
}

export interface DCAResult {
	input: DCAInput;
	purchases: DCAPurchase[];
	summary: DCASummary;
}

export interface DCASummary {
	totalInvested: number;
	totalUnits: number;
	finalPrice: number;
	finalValue: number;
	absoluteReturn: number;
	percentageReturn: number;
}
