class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };

// class ApiError extends Error {
//     constructor(message, errors = [], statusCode = 500, stack = "") {
//         super(message)
//         this.statusCode = statusCode
//         this.errors = errors
//         this.message = message
//         this.success = false
//         this.data = null
//     }
// }
// export {ApiError}
