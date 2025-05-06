import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import pool from '../db/pool';

passport.use(new LocalStrategy(
  { usernameField: 'email' }, // if using email instead of username
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

