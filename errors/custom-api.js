/* eslint-disable no-useless-constructor */
class CustomAPIError extends Error {
  constructor(message) {
    super(message);
  }
}

export default CustomAPIError;
