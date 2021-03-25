import React, { useState, useEffect } from "react";
import RoundButton from '../CustomButtons/RoundButton/Roundbutton';
import { IoMoonOutline, IoSunnyOutline } from 'react-icons/io5'

const ThemeChanger = () => {
    const [themeState, setThemeState] = useState(false);

    const handleChange = () => {
        setThemeState(!themeState);

        if (themeState) {
            localStorage.setItem("Theme", "dark");
            document.body.classList.add("dark-mode");
        } else {
            localStorage.setItem("Theme", "light");
            document.body.classList.remove("dark-mode");
        }
    };

    useEffect(() => {
        // const input = document.querySelector('.form-input');
        // input.classList.add('dark');
        const getTheme = localStorage.getItem("Theme");
        if (getTheme === "dark") {
            document.body.classList.add("dark-mode");
            setThemeState(false)
        } else {
            setThemeState(true)
        }
    }, []);

    return (
        <div style={{ width: '100%' }} onClick={handleChange}>
            {themeState ? <RoundButton icon={<IoMoonOutline />} text={'Dark mode'} />
                : <RoundButton icon={<IoSunnyOutline />} text={'Light mode'} />}
        </div>
    );
};

export default ThemeChanger;
