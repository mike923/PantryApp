const sendError = (error, res) => {
  console.log('Food Item error', error);
  res.status(500).json({
    payload: null,
    message: error.message,
    error: true,
  });
};

const createUpdateString = (updateData) => {
  const updateColumns = Object.keys(updateData);
  console.log('creating update string...', updateColumns);
  const updateString = updateColumns.map(updateColumn => `${updateColumn} = $/${updateColumn}/`).join(', ');
  console.log('update string created: ', updateString);
  return [updateColumns, updateString];
};


module.exports = {
  createUpdateString,
  sendError,
}