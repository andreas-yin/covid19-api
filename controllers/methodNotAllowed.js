import messages from '../utils/messages.js';

const methodNotAllowed = (req, res, next) => {
  // Only GET and HEAD requests allowed
  return res
    .status(405)
    .set('Allow', 'GET, HEAD')
    .json({ message: messages['methodNotAllowed'] });
};

export default methodNotAllowed;
