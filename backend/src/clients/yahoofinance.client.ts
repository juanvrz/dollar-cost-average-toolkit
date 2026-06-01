import YahooFinance from 'yahoo-finance2';
import { AssetPriceHistory, PricePoint } from '../types/asset.types';

const yahooFinance = new YahooFinance();

interface YahooQuote {
	date: Date;
	close: number | null;
}

interface YahooChartResult {
	quotes: YahooQuote[];
}

export type Frequency = 'daily' | 'weekly' | 'biweekly' | 'monthly';

type YahooInterval = '1d' | '1wk' | '1mo';

function mapFrequencyToInterval(frequency: Frequency): YahooInterval {
	switch (frequency) {
		case 'daily':
			return '1d';
		case 'weekly':
			return '1wk';
		case 'biweekly':
			return '1wk';
		case 'monthly':
			return '1mo';
	}
}

export async function fetchHistoricalPrices(symbol: string, startDate: Date, endDate: Date, frequency: Frequency): Promise<AssetPriceHistory> {
	const interval = mapFrequencyToInterval(frequency);
	const result = (await yahooFinance.chart(symbol, { period1: startDate, period2: endDate, interval })) as unknown as YahooChartResult;
	let prices: PricePoint[] = result.quotes.map((row) => ({ date: row.date.toISOString().split('T')[0], price: row.close ?? 0 }));

	if (frequency === 'biweekly') {
		prices = prices.filter((_, i) => i % 2 === 0);
	}

	return { symbol, prices };
}

export async function fetchHistoricalExchangeRates(fromCurrency: string, toCurrency: string, startDate: Date, endDate: Date, frequency: Frequency): Promise<AssetPriceHistory> {
	const symbol = `${fromCurrency}${toCurrency}=X`;
	return fetchHistoricalPrices(symbol, startDate, endDate, frequency);
}
