import React from "react";
import AppBar from "./components/Appbar/Appbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BooksView from "./views/BooksView";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./chakra/theme";
import { RecoilRoot } from "recoil";
import StudentsView from "./views/StudentsView";
import { fetchBooks } from "./api/bookService";

const router = createBrowserRouter([
  {
    path: "/books",
    element: <BooksView />,
  },
  {
    path: "/students",
    element: <StudentsView />,
  },
]);

function App() {
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default App;
