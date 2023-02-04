import { INVALID_PATH } from '../constants/messages.js';

const invalidPath = (req, res) => {
  return res.status(404).json({ message: INVALID_PATH });
};

export default invalidPath;
