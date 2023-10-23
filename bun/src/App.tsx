import { useState, useEffect } from "react"
import Map from './components/Map'
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";

function App() {

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "system"
  );
  const element = document.documentElement;
  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

  function onSystemDefault() {
    if (localStorage.theme === "dark" || (!("theme" in localStorage) && darkQuery.matches)) {
      element.classList.add("dark")
    } else {
      element.classList.remove("dark")
    }
  }
  onSystemDefault();

  useEffect(() => {
    switch (theme) {
      case "dark":
        element.classList.add("dark")
        localStorage.setItem("theme", "dark")
        break;
      case "light":
        element.classList.remove("dark")
        localStorage.setItem("theme", "light")
        break;
      default:
        localStorage.removeItem("theme")
        onSystemDefault();
        break;
    }
  }, [theme]);


  function handleThemeSwitch() {
    setTheme(theme === 'dark' ? "light" : "dark");
    console.log("clicked!")
  }

  return (
    <div className={`flex flex-col h-screen dark:bg-black dark:text-gray-100`}>
      <Map />
      <Topbar handleThemeSwitch={handleThemeSwitch} />
      <Sidebar />
      
    </div>
  )
}

export default App
