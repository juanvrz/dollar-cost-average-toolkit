import { Router, Request, Response } from 'express';
import { simulateDCA } from '../services/dca.service';
import { DCAInput } from '../types/dca.types';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
	try {
		const input = req.body as DCAInput;

		if (!input.assetId || !input.amountPerPurchase || !input.currency || !input.startDate || !input.endDate || !input.frequency) {
			return res.status(400).json({ error: 'Missing required fields' });
		}

		const result = await simulateDCA(input);
		res.json(result);
	} catch (error) {
		console.error(error);
		const message = error instanceof Error ? error.message : 'Failed to simulate DCA';
		res.status(500).json({ error: message });
	}
});

export default router;
