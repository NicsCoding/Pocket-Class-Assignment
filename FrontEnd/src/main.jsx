import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import InstructorDashboard from "./InstructorDashboard.jsx";
import StudentDashboard from "./StudentDashboard.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Login_Page, { createLoginData } from "./LoginPageUser.jsx";
const Router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/instructor",
          element: <InstructorDashboard />,
        },
        { path: "/student", element: <StudentDashboard /> },
      ],
    },
    {
      path: "/login-page",
      element: <Login_Page></Login_Page>,
      action: createLoginData,
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={Router}></RouterProvider>
  </StrictMode>
);
