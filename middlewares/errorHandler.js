import { DEBUG_MODE } from '../Config';
import { ValidationError } from 'joi';
import CustomErrorHandler from '../Services/CustomErrorHandler';

const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let data = {
    message: 'Internal Server error',
    ...(DEBUG_MODE === 'true' && { originalError: err.message }),
  };
  if (err instanceof ValidationError) {
    statusCode = 422;
    data = {
      message: err.message,
    };
  }

  if (err instanceof CustomErrorHandler) {
    statusCode = err.status;
    data = {
      message: err.message,
    };
  }

  console.log(data);
  return res.status(statusCode).json(data);
};

export default errorHandler;
