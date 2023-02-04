import { METHOD_NOT_ALLOWED } from '../constants/messages.js';

export const methodNotAllowed = (req, res, next) => {
  // Only GET and HEAD requests allowed
  return res
    .status(405)
    .set('Allow', 'GET, HEAD')
    .json({ message: METHOD_NOT_ALLOWED });
};
