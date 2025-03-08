import { FaMoon, FaSun } from "react-icons/fa6";
import {useEffect, useState} from "react";

export default function ChangeThemeButton() {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    const toogleTheme = () => {
        if (theme === "light") {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    }

    useEffect(() => {
        function refreshTheme() {
            if (theme === "dark") {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
            localStorage.setItem("theme", theme)
        }

        refreshTheme()
    }, [theme]);

    return (
        <button onClick={toogleTheme}>
            {
                theme === "dark" ? <FaSun/> : <FaMoon/>
            }
        </button>
    )
}