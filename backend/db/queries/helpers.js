const sendError = (error, res) => {
  console.log('Food Item error', error);
  res.status(500).json({
    payload: null,
    message: error.message,
    error: true,
  });
};

module.exports = {
  sendError
}