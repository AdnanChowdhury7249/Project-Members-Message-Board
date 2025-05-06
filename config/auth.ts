import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import pool from '../db/pool';

type User = {
  id: number;
  email: string;
  password_hash: string;
};

passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      const user = result.rows[0];

      if (!user) return done(null, false, { message: 'Incorrect email or password.' });

      const match = await bcrypt.compare(password, user.password_hash);
      if (!match) return done(null, false, { message: 'Incorrect email or password.' });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

// ✅ These go outside the strategy definition
passport.serializeUser((user: any, done) => {
  done(null, (user as { id: number }).id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    const user = result.rows[0];
    done(null, user);
  } catch (err) {
    done(err);
  }
});
