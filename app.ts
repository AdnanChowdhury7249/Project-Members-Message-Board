import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import session from 'express-session';
import passport from 'passport';

import './config/auth'; // Your Passport config
import authRoutes from './routes/authRoute';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'your-secret',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// Auth routes
app.use('/auth', authRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
