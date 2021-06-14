const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../../persistence/users');
const Email = require('../../email');

module.exports = {
  async login(req, res) {
    try {
      let { email, password } = req.body;
      if (!email) return res.status(400).json({ message: 'Email Required!' });
      if (!password)
        return res.status(400).json({ message: 'Password Required!' });
      email = email.toLowerCase();

      const user = await User.getByEmail(email);

      if (!user) return res.status(404).json({ message: 'Incorrect login, please try again' });

      const valid = await bcrypt.compare(password, user.password);

      if (!valid)
        return res.status(401).json({ message: 'Incorrect login, please try again' });

      if (user.accessLevel === 'pending')
        return res
          .status(401)
          .json({ message: 'Your account has not been approved yet!' });
      if (user.accessLevel === 'revoked')
        return res.status(401).json({ message: 'Something went wrong' });
      if (user.accessLevel === 'denied')
        return res.status(401).json({ message: 'Something went wrong' });

      const tokenBody = {
        id: user.id,
        name: user.name,
        email: user.email,
        accessLevel: user.accessLevel,
      };

      const token = jwt.sign({ user: tokenBody }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });

      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json({ message: 'An Error Occurred', error });
    }
  },
  async register(req, res) {
    try {
      let { email, name, password, companyName, jobTitle } = req.body;
      if (!email || !name || !password || !companyName || !jobTitle)
        return res.status(400).json({
          message:
            'Name, Email, Password, Company Name and Job Title must be provided',
        });

      email = email.toLowerCase();
      const invalid = await emailAlreadyInUse(email);
      console.log(invalid);
      if (invalid)
        return res.status(400).json({ message: 'Email already in use!' });

      const user = await User.create({
        email,
        name,
        password,
        companyName,
        jobTitle,
        accessLevel: 'pending',
      });
      delete user.password;

      Email.send(
        email,
        'register-account',
        {},
        'Sondar Properties - Successful Application'
      ).catch((error) => {
        console.log(`Error register accoint email for ${email}`);
        console.log(error);
      });

      const message = {
        url: process.env.FE_BASE_URL,
      };

      Email.send(
        'bradley.marsh@developyn.com',
        'admin-new-user',
        message,
        'Sondar Properties - New Request'
      ).catch((error) => {
        console.log(`Error admin new user email for ${email}`);
        console.log(error);
      });

      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'An Error Occurred', error });
    }
  },
  async forgotPassword(req, res) {
    try {
      let { email } = req.body;
      if (!email) return res.status(400).json({ message: 'Email Required' });
      email = email.toLowerCase();

      const user = await User.getByEmail(email);
      const { id } = user;

      //Clear previous reset token
      await User.clearResetToken(id);

      const resetToken = await crypto.randomBytes(64).toString('base64');

      let expireDate = new Date();
      expireDate.setHours(expireDate.getHours() + 1);

      await User.addResetToken(id, resetToken, expireDate);

      const message = {
        url: `${
          process.env.FE_BASE_URL
        }/ResetPassword/?token=${encodeURIComponent(
          resetToken
        )}&email=${encodeURIComponent(email)}`,
      };

      Email.send(
        email,
        'forgot-password',
        message,
        'Sondar Properties - Password Reset'
      ).catch((error) => {
        console.log(`Error forgot password email for ${email}`);
        console.log(error);
      });

      return res
        .status(200)
        .json({ message: 'Reset Token Generated', resetToken });
    } catch (error) {
      return res.status(500).json({ message: 'An Error Occurred', error });
    }
  },
  async resetPassword(req, res) {
    try {
      let { email, password, token } = req.body;
      if (!email || !password)
        return res.status(400).json({ message: 'Email and password required' });
      if (!token) return res.status(400).json({ message: 'Token required' });

      email = email.toLowerCase();

      const user = await User.getByEmail(email);

      console.log(token);

      if (token !== user.resetToken)
        return res.status(401).json({ message: 'Invalid Token' });

      const time = new Date();
      if (time > token.resetTokenExpir)
        return res.status(401).json({ message: 'Token expired!' });

      await User.changePassword(user.id, password);

      await User.clearResetToken(user.id);

      const message = {
        url: process.env.FE_BASE_URL,
      };

      Email.send(
        email,
        'success-password-reset',
        message,
        'Sondar Properties - Password Successfully Reset'
      ).catch((error) => {
        console.log(`Error successful password reset email for ${email}`);
        console.log(error);
      });

      return res.status(200).json({ message: 'Password successfully reset!' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'An Error Occurred', error });
    }
  },
};

async function emailAlreadyInUse(email) {
  try {
    let user = await User.getByEmail(email);
    return user ? true : false;
  } catch (error) {
    console.log(error);
  }
}
