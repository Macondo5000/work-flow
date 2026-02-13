
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import DesignSystem from "./app/DesignSystem.tsx";
  import { PhoneFrame } from "./app/PhoneFrame.tsx";
  import "./styles/index.css";

  const isDesignSystem = window.location.hash === '#design';
  document.title = isDesignSystem ? 'UI Language System for AI Chat Behaviors — Work' : 'Work Flow Homepage';

  createRoot(document.getElementById("root")!).render(
    isDesignSystem ? (
      <DesignSystem />
    ) : (
      <PhoneFrame>
        <App />
      </PhoneFrame>
    )
  );
