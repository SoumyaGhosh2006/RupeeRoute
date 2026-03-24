import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import "./styles/theme.css";
import "./styles/glass.css";
import "./styles/dashboard.css";

function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="app-shell">
      <button
        className="theme-toggle glass"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        aria-label="Toggle theme"
      >
        {theme === "light" ? "Switch to Dark" : "Switch to Light"}
      </button>
      <Dashboard />
    </div>
  );
}

export default App;
