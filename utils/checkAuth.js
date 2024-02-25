import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
  const logout = () => res.redirect('/login');

  if (token) {
    try {
      const decoded = jwt.verify(token, 'secret123');

      req.userId = decoded._id;
      next();
    } catch (err) {
       return logout();
    }
  } else return logout();
};
