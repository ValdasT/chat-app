import React, { useContext, useEffect } from "react";
import RoundButton from '../CustomButtons/RoundButton/Roundbutton';
import { GlobalContext } from '../../context/GlobalState';
import { IoMoonOutline, IoSunnyOutline } from 'react-icons/io5'

const ThemeChanger = () => {
    const { themeState, setThemeState } = useContext(GlobalContext);

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div style={{ width: '100%' }} onClick={handleChange}>
            {themeState ? <RoundButton icon={<IoMoonOutline />} />
                : <RoundButton icon={<IoSunnyOutline />} />}
        </div>
    );
};

export default ThemeChanger;
