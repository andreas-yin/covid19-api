import {
  METHOD_NOT_ALLOWED,
  INVALID_PATH,
  INTERNAL_SERVER_ERROR,
} from '../constants/messages.js';

export const invalidPath = (req, res, next) => {
  return res.status(404).json({ message: INVALID_PATH });
};

export const methodNotAllowed = (req, res, next) => {
  // Only GET and HEAD requests allowed
  return res
    .status(405)
    .set('Allow', 'GET, HEAD')
    .json({ message: METHOD_NOT_ALLOWED });
};

export const internalServerError = (req, res, next) => {
  return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
};
