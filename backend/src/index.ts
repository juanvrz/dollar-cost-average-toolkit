import express from 'express';
import cors from 'cors';
import healthRoutes from './routes/health.routes';
import pricesRoutes from './routes/prices.routes';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/health', healthRoutes);
app.use('/api/prices', pricesRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
