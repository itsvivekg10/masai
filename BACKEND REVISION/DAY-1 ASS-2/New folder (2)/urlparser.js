const url = require("url");

function parseURL(inputUrl) {
  const parsed = new URL(inputUrl); 
  const queryParams = {};

  parsed.searchParams.forEach((value, key) => {
    queryParams[key] = value;
  });

  return {
    hostname: parsed.hostname,
    pathname: parsed.pathname,
    query: queryParams
  };
}

module.exports = parseURL;
