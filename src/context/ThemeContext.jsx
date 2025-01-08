// const {createContext} = require("react");
import { createContext, useState } from "react";

const ThemeContext = createContext();

export default ThemeContext;

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("Light");

    const toggleTheme = () => {
        setTheme(theme === "Light" ? "Dark" : "Light");
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}


export { ThemeProvider };
