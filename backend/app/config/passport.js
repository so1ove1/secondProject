import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { db } from './db.config.js';

export default function (passport) {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    };

    passport.use(
        new JwtStrategy(opts, async (jwt_payload, done) => {
            try {
                const user = await db.user.findByPk(jwt_payload.id);
                if (user) return done(null, user);
                return done(null, false);
            } catch (e) {
                return done(e, false);
            }
        })
    );
}