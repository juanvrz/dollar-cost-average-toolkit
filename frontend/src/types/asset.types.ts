export type Currency = 'USD' | 'EUR';

export type AssetCategory = 'crypto' | 'stock' | 'index' | 'commodity';

export interface AssetDefinition {
	id: string;
	name: string;
	category: AssetCategory;
	nativeCurrency: Currency;
	yahooSymbol: string;
}
