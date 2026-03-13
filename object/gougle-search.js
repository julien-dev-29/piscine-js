// fake `getJSON` function
let getJSON = async (url) => url;

/**
 *
 * @param {string} serverName
 * @param {string} q
 */
const queryServers = async (serverName, q) => {
  const url1 = `/${serverName}?q=${q}`;
  const url2 = `/${serverName}_backup?q=${q}`;

  return Promise.race([getJSON(url1), getJSON(url2)]);
};

/**
 *
 * @param {string} q
 * @returns {Object}
 */
const gougleSearch = async (q) => {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(Error("timeout")), 80),
  );
  const search = Promise.all([
    queryServers("web", q),
    queryServers("image", q),
    queryServers("video", q),
  ]).then(([web, image, video]) => ({
    web,
    image,
    video,
  }));
  return Promise.race([timeout, search]);
};

console.log(await gougleSearch("hello+world"));
