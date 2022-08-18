import styles from "@/styles/Header.module.css";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { SunIcon } from "./Sun";
import { MoonIcon } from "./Moon";
import Link from "next/link";


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
			<span className={styles.themeButton} onClick={() => setTheme('light')}>
				<SunIcon />
			</span>
		)
	} else {
		return (
			<span className={styles.themeButton} onClick={() => setTheme('dark')}>
				<MoonIcon />
			</span>
		)
	}
};

export function Header() {
	return (
		<header className={styles.header}>
			<div className={styles.headerDiv}>
				<Link href="/">
					<a className={styles.navLink}>
						<span className={styles.name}>Atri Hegde</span>
					</a>
				</Link>
				<nav className={styles.nav}>
					<Link href="/posts">
						<a className={styles.navLink}>Posts</a>
					</Link>
					<Link href="/projects">
						<a className={styles.navLink}>Projects</a>
					</Link>
					<Link href="/about">
						<a className={styles.navLink}>About</a>
					</Link>
				</nav>
				<nav className={styles.themeNav}>
					<ThemeSwitch />
				</nav>
			</div>
		</header>
	);
}
export default Header;
