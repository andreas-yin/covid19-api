export const getHealthcheck = async (req, res, next) => {
  const healthcheck = {
    uptime: process.uptime(),
    responsetime: process.hrtime(),
    message: 'OK',
    timestamp: Date.now(),
  };

  try {
    res.status(200).json(healthcheck);
  } catch (err) {
    healthcheck.message = err;
    res.status(500).json(healthcheck);
  }
};
