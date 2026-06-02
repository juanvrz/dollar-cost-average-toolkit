import type { Currency } from './asset.types';
export type { Currency };

export type Frequency = 'daily' | 'weekly' | 'biweekly' | 'monthly';

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

export interface DCASummary {
	totalInvested: number;
	totalUnits: number;
	finalPrice: number;
	finalValue: number;
	absoluteReturn: number;
	percentageReturn: number;
}

export interface DCAResult {
	input: DCAInput;
	purchases: DCAPurchase[];
	summary: DCASummary;
}
