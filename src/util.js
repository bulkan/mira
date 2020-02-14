const marshall = (miraConfig = {}) => {
  return btoa(JSON.stringify(miraConfig));
};

const unmarshall = s => {
  try {
    return JSON.parse(atob(s));
  } catch(e) {
    return null;
  }
};

module.exports = { marshall, unmarshall};