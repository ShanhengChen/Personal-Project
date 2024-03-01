const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
passport.use(new GoogleStrategy({
  clientID: '1092906863789-5giqulc4lgphfqcqf5rbjoghgac0unca.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: 'http://localhost:8080/auth/google/callback',
},
(accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

module.exports = passport;


//    "passport": "^0.7.0",
//"express-session": "^1.18.0",
//"passport-google-oauth20": "^2.0.0"