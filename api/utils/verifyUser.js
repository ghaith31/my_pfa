import jwt from 'jsonwebtoken';
import { errorHandler } from './eroor.js';


export const verifyToken = (req, res, next) => {
  
  const token = req.headers.authorization;

  if (!token) return next(errorHandler(401, 'Unauthorized'));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, 'Forbidden'));

    req.user = user;
    next();
  });
};
