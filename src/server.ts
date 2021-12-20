import express from 'express';
import publicRoutes from './routes/public';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/', publicRoutes);

app.listen(3333);
