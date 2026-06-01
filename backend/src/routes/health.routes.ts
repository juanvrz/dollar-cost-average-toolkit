import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.json({ status: 'ok', message: 'DCA Toolkit backend is running' });
});

export default router;
