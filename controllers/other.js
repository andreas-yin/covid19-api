import messages from '../utils/messages.js';

const invalidPath = (req, res) => {
  return res.status(404).json({ message: messages['invalidPath'] });
};

export default invalidPath;
