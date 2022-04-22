import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import authenticateUser from './middlewares/auth';
import authRoutes from './routes/authRoutes';
import restrictedRoutes from './routes/restrictedRoutes';
import publicRoutes from './routes/publicRoutes';
const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/api', publicRoutes);
app.use('/api', authenticateUser, restrictedRoutes);

app.listen(3333);
