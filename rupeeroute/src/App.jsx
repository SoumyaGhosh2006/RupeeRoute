import { useEffect, useState } from "react";

function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle Mode
      </button>

      {/* Your dashboard */}
    </>
  );
}

export default App;