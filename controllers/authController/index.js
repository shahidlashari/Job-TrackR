const { isEmail, isLength } = require('validator');
const jwt = require('jwt-simple');
const { User } = require('../../models');
const { secret } = require('../../config');

function tokenForUser(user) {
  // 1st argument is the information we want to encode
  // 2nd argument is the secret we are going to use to encrypt it
  // By convention all json web tokens have a sub property
  // by sub we mean subject. As in who does this token belong to?
  // iat or issued at time is another convention by jwt
  const timeStamp = new Date().getTime();
  // This subject will become the payload in our strategy
  // jwt.encode takes 2 parameters:
  // 1st is what you want the token to look like, as well as the values for each field
  // 2nd parameter is the secret you want to use to encode the token
  return jwt.encode({ sub: user._id, iat: timeStamp }, secret);
}

module.exports = {
  signUp: async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'You must provide username, email and password' });
    }

    if (!isEmail(email)) {
      return res.status(400).json({ error: 'You must provide a valid email address' });
    }

    if (!isLength(password, { min: 6 })) {
      return res.status(400).json({ error: 'Your password must be at least 6 characters long' });
    }

    try {
      // See if a user with the given username exists
      const existingUserName = await User.findOne({ username });
      if (existingUserName) { return res.status(401).json({ error: 'User username already exists' }); }
      // See if a user with the given email exists
      const existingUser = await User.findOne({ email });
      if (existingUser) { return res.status(401).json({ error: 'User email already exists' }); }
      const user = await new User({ username, email, password }).save();
      // Eventually we will send a token
      return res.status(200).json({ token: tokenForUser(user) });
    } catch (e) {
      return res.status(403).json(e);
    }
  },
  signIn: (req, res) => res.status(200).json({ token: tokenForUser(req.user) }),
};
