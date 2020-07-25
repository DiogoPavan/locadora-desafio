import status from 'http-status';

class ApiError {
  constructor(message, statusCode = status.BAD_REQUEST) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default ApiError;
