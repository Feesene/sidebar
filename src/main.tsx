import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/layout/lists", element: <>/layout/lists</> },
      { path: "/layout/examples/teste1", element: <>/layout/examples/teste1</> },
      { path: "/layout/examples/teste2", element: <>/layout/examples/teste2</> },
      { path: "/layout/examples/teste3", element: <>/layout/examples/teste3</> },
      { path: "/chart1", element: <>/charts/chart1</> },
      { path: "/layout/charts/chart2", element: <>/charts/chart2</> },
      { path: "/layout/charts/chart3", element: <>/charts/chart3</> },
      { path: "/usuarios/adicionar", element: <>/usuarios/adicionar</> },
      { path: "/usuarios/remover", element: <>/usuarios/remover</> },
      { path: "/usuarios/lista1", element: <>/usuarios/lista1</> },
      { path: "/usuarios/lista2", element: <>/usuarios/lista2</> },
      { path: "/usuarios/lista3", element: <>/usuarios/lista3</> },
      { path: "/veiculos", element: <>/veiculos</> },
    ],
    errorElement: <>Não encontrado</>,
  },
  { path: "/*", element: <App />, children: [{ path: "/*", element: <>Não encontrado</> }] },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
