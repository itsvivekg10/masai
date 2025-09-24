import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { setupSwagger } from './services/swagger.js';

import authRoutes from './routes/auth.routes.js';
import dishRoutes from './routes/dish.routes.js';
import orderRoutes from './routes/order.routes.js';
import chefRoutes from './routes/chef.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

setupSwagger(app);

app.use('/auth', authRoutes);
app.use('/dishes', dishRoutes);
app.use('/orders', orderRoutes);
app.use('/chef', chefRoutes);

app.get('/', (_req, res) => res.send('Dish Booking API OK'));
await connectDB();

export default app;
