const formatMessage = (userName, text) => {
  var d = new Date();
  return {
    userName,
    text,
    time: d.toLocaleTimeString(),
  };
};

module.exports = { formatMessage };
