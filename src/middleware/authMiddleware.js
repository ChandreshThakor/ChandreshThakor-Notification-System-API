const jwt = require('jsonwebtoken');
const i18n = require('../utils/i18nConfig');

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access token is missing' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    
    if(user){
      i18n.setLocale(req, user.lang || 'en');
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateJWT;
