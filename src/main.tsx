import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {BrowserRouter, Route,Routes} from 'react-router-dom'

import App from "./App.tsx";
import { ROUTES } from "./constants/routes.ts";
import { Header } from "./Header.tsx";

// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>      
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path={ROUTES.MAIN} element={<App />} />
          <Route path={ROUTES.COMPARISON} element={<div>hi</div>} />
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
