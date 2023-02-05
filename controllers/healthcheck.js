export const getHealthcheck = async (req, res, next) => {
  const healthcheck = {
    uptime: process.uptime(),
    responsetime: process.hrtime(),
    message: 'OK',
    timestamp: Date.now(),
  };

  res.json(healthcheck);
};
