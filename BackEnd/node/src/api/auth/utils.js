const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const accessLevels = [
  'revoked',
  'pending',
  'user',
  'admin'
]

passport.use(new JWTStrategy({
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
}, async (token, done) => done(null, token.user)));

module.exports.hasAccess = function (accessLevelRequired) {
  if(!accessLevelRequired) throw new Error('Access level needs to be set');
  if(accessLevels.indexOf(accessLevelRequired) === -1) throw new Error(`${accessLevelRequired} does not exist`);
  return [
    passport.authenticate('jwt', { session: false} ),
    (req, res, next) => {
      if(req.user) {
        if(accessLevels.includes(req.user.accessLevel) && accessLevels.indexOf(req.user.accessLevel) >= accessLevels.indexOf(accessLevelRequired)) {
          next();
        } else {
          return res.status(403).send('Forbidden');
        }
      } else {
        return res.status(401).send('Unauthorized');
      }
    }
  ]
}