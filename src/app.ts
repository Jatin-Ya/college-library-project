import express from 'express'
import studentsRouter from './routes/studentsRoutes';

const app: express.Application = express();

app.use(express.json());
app.use('/api/v1/drivers/', studentsRouter);

export default app;