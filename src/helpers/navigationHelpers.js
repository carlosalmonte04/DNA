import { addNavigationHelpers } from "react-navigation";
import { addListener } from "@dnaStore";

export const getCurrentRouteName = nav => {
  if (nav.index === undefined) {
    const name = nav.routeName
      .split("")
      .slice(0)
      .join("");

    return name;
  }

  return getCurrentRouteName(nav.routes[nav.index]);
};

export const getCurrentRoute = ({ routes }) => {
  let route = routes[routes.length - 1];
  while (route.index !== undefined) route = route.routes[route.index];
  return route;
};
