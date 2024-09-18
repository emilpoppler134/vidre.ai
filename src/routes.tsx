import { RouterProvider, createBrowserRouter } from "react-router-dom";

import LandingPage from "./views/LandingPage";
import NotFound from "./views/NotFound";
import Project from "./views/Project";
import ProjectCreate from "./views/ProjectCreate";
import Projects from "./views/Projects";
import Settings from "./views/Settings";

const Routes = () => {
  const routesForPublic = [
    {
      path: "/",
      element: <LandingPage />,
      errorElement: <NotFound />,
    },
    {
      path: "/settings",
      element: <Settings />,
    },
    {
      path: "/projects",
      element: <Projects />,
    },
    {
      path: "/new-project",
      element: <ProjectCreate />,
    },
    {
      path: "/projects/:id",
      element: <Project />,
    },
  ];

  const router = createBrowserRouter([...routesForPublic]);

  return <RouterProvider router={router} />;
};

export default Routes;
