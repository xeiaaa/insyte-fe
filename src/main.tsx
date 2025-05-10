import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { ClerkProvider } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import App from "./App.tsx";
import LoginPage from "./pages/auth/Login.page.tsx";
import RegisterPage from "./pages/auth/Register.page.tsx";
import HomePage from "./pages/home/Home.page.tsx";
import CreateNewNotePage from "./pages/notes/CreateNewNote.page.tsx";
import NotePage from "./pages/notes/Note.page.tsx";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/notes/new" element={<CreateNewNotePage />} />
              <Route path="/notes/:noteId" element={<NotePage />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </BrowserRouter>
      </ClerkProvider>
    </QueryClientProvider>
  </StrictMode>
);
