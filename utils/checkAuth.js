import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
  const logout = () => {
    res.status(401).json({
      errorMessage: 'Нет доступа.'
    });
  };

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_KEY);

      req.userId = decoded._id;
      next();
    } catch (err) {
       return logout();
    }
  } else return logout();
};
