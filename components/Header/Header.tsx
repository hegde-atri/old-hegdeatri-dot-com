import styles from "@/styles/Header.module.css";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { SunIcon } from "./Sun";
import { MoonIcon } from "./Moon";


const ThemeSwitch = () => {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();
	// useEffect only runs on the client, so now we can safely show the UI
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	if (theme == "dark") {
		return (
			<span onClick={() => setTheme('light')}>
				<SunIcon />
			</span>
		)
	} else {
		return (
			<span onClick={() => setTheme('dark')}>
				<MoonIcon />
			</span>
		)
	}
};

export function Header() {
	return (
		<header>
			<nav>
				<ul>Home</ul>
				<ThemeSwitch />
			</nav>
		</header>
	);
}
export default Header;
