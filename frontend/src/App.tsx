import React from "react";
import AppBar from "./components/Appbar/Appbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BooksView from "./views/BooksView";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./chakra/theme";

const router = createBrowserRouter([
  {
    path: "/books",
    element: <BooksView />,
  },
]);

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AppBar />
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
