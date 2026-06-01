import { Router, Request, Response } from 'express';
import { ASSET_CATALOG } from '../types/asset.catalog';

const router = Router();

router.get('/', (req: Request, res: Response) => {
	res.json(ASSET_CATALOG);
});

export default router;
