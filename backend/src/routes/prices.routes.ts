import { Router, Request, Response } from 'express';
import { fetchHistoricalPrices, Frequency } from '../clients/yahoofinance.client';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
	try {
		const symbol = req.query.symbol as string;
		const start = req.query.start as string;
		const end = req.query.end as string;
		const frequency = req.query.frequency as Frequency;

		if (!symbol || !start || !end || !frequency) {
			return res.status(400).json({ error: 'Missing required parameters: symbol, start, end, frequency' });
		}

		const validFrequencies: Frequency[] = ['daily', 'weekly', 'biweekly', 'monthly'];
		if (!validFrequencies.includes(frequency)) {
			return res.status(400).json({ error: 'Invalid frequency. Must be: daily, weekly, biweekly or monthly' });
		}

		const data = await fetchHistoricalPrices(symbol, new Date(start), new Date(end), frequency);
		res.json(data);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to fetch prices' });
	}
});

export default router;
