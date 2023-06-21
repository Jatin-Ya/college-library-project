import express from 'express'
import driverRouter from './routes/driverRoute';

const app: express.Application = express();

app.use(express.json());
app.use('/api/v1/drivers/', driverRouter);

export default app;