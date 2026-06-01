export type Currency = 'USD' | 'EUR';

export type AssetCategory = 'crypto' | 'stock' | 'index' | 'commodity';

export interface AssetDefinition {
	id: string;
	name: string;
	category: AssetCategory;
	nativeCurrency: Currency;
	yahooSymbol: string;
}
export const ASSET_CATALOG: AssetDefinition[] = [
	{ id: 'btc', name: 'Bitcoin', category: 'crypto', nativeCurrency: 'USD', yahooSymbol: 'BTC-USD' },
	{ id: 'eth', name: 'Ethereum', category: 'crypto', nativeCurrency: 'USD', yahooSymbol: 'ETH-USD' },
	{ id: 'sp500', name: 'S&P 500', category: 'index', nativeCurrency: 'USD', yahooSymbol: '^GSPC' },
	{ id: 'nasdaq', name: 'NASDAQ-100', category: 'index', nativeCurrency: 'USD', yahooSymbol: 'QQQ' },
	{ id: 'msci-world', name: 'MSCI World', category: 'index', nativeCurrency: 'USD', yahooSymbol: 'URTH' },
	{ id: 'emerging-markets', name: 'Emerging Markets', category: 'index', nativeCurrency: 'USD', yahooSymbol: 'EEM' },
	{ id: 'gold', name: 'Gold', category: 'commodity', nativeCurrency: 'USD', yahooSymbol: 'GLD' },
	{ id: 'silver', name: 'Silver', category: 'commodity', nativeCurrency: 'USD', yahooSymbol: 'SLV' },
	{ id: 'aapl', name: 'Apple', category: 'stock', nativeCurrency: 'USD', yahooSymbol: 'AAPL' },
	{ id: 'goog', name: 'Google', category: 'stock', nativeCurrency: 'USD', yahooSymbol: 'GOOG' },
	{ id: 'amzn', name: 'Amazon', category: 'stock', nativeCurrency: 'USD', yahooSymbol: 'AMZN' },
	{ id: 'nvda', name: 'NVIDIA', category: 'stock', nativeCurrency: 'USD', yahooSymbol: 'NVDA' },
];
