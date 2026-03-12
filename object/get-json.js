/**
 *
 * @param {string} path
 * @param {Object} params
 * @returns
 */
const getJSON = async (path, params = {}) => {
  const url = new URL(path);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Response status: ${response.status}`);
  const body = await response.json();
  if (body.error) throw new Error(body.error);
  return body.data;
};

console.log(
  await getJSON("https://jsonplaceholder.typicode.com/posts/1", {
    yolo: "les kikis",
  }),
);
