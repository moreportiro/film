import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { ThemeProvider } from "./context/ThemeProvider.jsx";
import { Routers } from "./components/Routers.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <Routers />
    </ThemeProvider>
  </StrictMode>
);
