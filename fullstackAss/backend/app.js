import express from 'express';
import cors from 'cors';
import morgan from 'morgan';


import authRoutes from './routes/auth.routes.js';
import profileRoutes from './routes/profile.routes.js';
import usersRoutes from './routes/users.routes.js';
import resourcesRoutes from './routes/resources.routes.js';


const app = express();


app.use(cors({ origin: process.env.CORS_ORIGIN || '*', credentials: false }));
app.use(express.json());
app.use(morgan('dev'));


app.get('/', (req, res) => res.json({ status: 'OK', service: 'RBAC API' }));


app.use('/register', authRoutes); /