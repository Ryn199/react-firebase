import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";


const ThemeSwitcher = () => {

    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <div onClick={toggleTheme}>
            <h1>theme: {theme}</h1>
        </div>
    )
}

export default ThemeSwitcher