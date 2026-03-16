import { getTopStories, getNewStories } from "./api.js";
import { Header } from "./components/Header.js";
import { LiveUpdates } from "./components/LiveUpdates.js";
import { Main } from "./components/Main.js";
import { Container } from "./Container.js";

let currentState = "top";

export const handleNavigationClick = (event) => {
  const linkText = event.target.textContent.toLowerCase();
  switch (linkText) {
    case "new":
      currentState = "new";
      break;
    case "top":
      currentState = "top";
      break;
    case "past":
      currentState = "past";
      break;
    case "comments":
      currentState = "comments";
      break;
    case "ask":
      currentState = "ask";
      break;
    case "show":
      currentState = "show";
      break;
    case "jobs":
      currentState = "jobs";
      break;
    default:
      currentState = "top";
  }
  renderApp();
};

const fetchStoriesByState = async () => {
  switch (currentState) {
    case "new":
      return await getNewStories();
    case "past":
      return await getTopStories();
    case "comments":
      return () => {};
    case "ask":
      return await getTopStories();
    case "show":
      return await getTopStories();
    case "jobs":
      return await getTopStories();
    case "top":
    default:
      return await getTopStories();
  }
};

const renderApp = async () => {
  const stories = await fetchStoriesByState();
  const $app = document.getElementById("app");
  $app.innerHTML = "";
  const $container = Container();
  $container.append(
    Header({ title: "Hacker News" }),
    LiveUpdates(),
    await Main(stories.slice(0, 3)),
  );
  $app.append($container);
};

renderApp();
