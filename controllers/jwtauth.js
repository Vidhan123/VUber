const authenticate = require('../config/jwtConfig');

exports.login = (req, res) => {
  try {
    const token = authenticate.getToken({ email: req.user.email });
    res
      .json({
        success: true,
        token: token,
        msg: 'Logged In',
        details: req.user,
      })
      .cookie('access_token', token, { httpOnly: true, sameSite: true });
  } catch (err) {
    console.log(err);
  }
};

exports.ologin = (req, res) => {
  try {
    const token = authenticate.getToken({ email: req.user.email });
    res
      .cookie('access_token', token, { httpOnly: true, sameSite: true })
      .redirect('http://localhost:3000/dashboard');
  } catch (err) {
    console.log(err);
  }
};

const { verifyUser } = authenticate;
exports.verify = verifyUser;
