var generateMessage = (from , text) => {
  return {
    text ,
    from ,
    createdAt : new Date().getTime()
  }
};

var generateLocationMessage = (from, lat ,lng) => {
  return {
    from ,
    url : `https://www.google.com/maps?q=${lat},${lng}`,
    createdAt : new Date().getTime()
  }
};

module.exports = {generateMessage , generateLocationMessage};
