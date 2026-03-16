export const getTopStories = async () =>
  fetch("https://hacker-news.firebaseio.com/v0/topstories.json").then((res) =>
    res.json(),
  );

export const getStory = async (id) => {
  console.log(id);
  return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
    (res) => res.json(),
  );
};

export const getNewStories = async () =>
  fetch("https://hacker-news.firebaseio.com/v0/newstories.json")
    .then((res) => res.json())
    .catch(console.error);
