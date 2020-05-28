const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local');
const { User } = require('../models');
const { secret } = require('../config');

// Setup options for jwt
const jwtOptions = {
  // Look specifically from the header where it's called authorization
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: secret,
};

// Create jwt strategy for handling JWT
// This strategy is for authenticating users on each request
const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  // payload === { sub: user._id, iat: timeStamp }

  // See if the user ID in the payload exists in our database
  //  If it does, call 'done' with that user
  //  otherwise, call done without a user object
  try {
    // const user = await User.findById(payload.sub);
    const user = await User.findById(payload.sub).select('-password');
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
});

// By defualt, Localstrategy is looking for a username
// However, we're using email and not username
// So here I'm saying, hey if you're looking for the username,
// look for the email property from the request instead
const localOptions = { usernameField: 'email' };

// Create LocalStrategy for users to sign in using email and password
const localLogin = new LocalStrategy(localOptions, async (email, password, done) => {
  try {
    // See if there's a user with this email
    const user = await User.findOne({ email });
    // If no user with this email, we pass null as there's no error
    // We pass false as a 2nd arg because we didn't find a user
    if (!user) {
      return done(null, false);
    }

    // Compare the password given to the encrypted password in the database
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return done(null, false);
    }
    // If we do find a match, return done with no error and the user we found
    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
});

// Lets passport know that we have delcared a 'jwt' strategy
// If we call passport.authenticate('jwt')
// Passport will refer to this jwtLogin strategy that we defined
passport.use(jwtLogin);

// Lets passport know that we have declared a 'local' strategy
// If we call passport.authenticate('local'), passport will refer
// to this localLogin as the strategy that we defined
passport.use(localLogin);
