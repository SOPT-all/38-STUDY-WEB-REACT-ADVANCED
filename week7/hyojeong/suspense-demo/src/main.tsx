import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import SuspenseCacheDemo from "./SuspenseCacheDemo";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SuspenseCacheDemo />
  </StrictMode>,
);
