import Head from "next/head";
import React from "react";
import styles from "@/styles/Layout.module.css";
import Header from "./Header/Header";
import Footer from "./Footer";

export function Layout({ children, title, description, keywords }: any) {
	return (
		<div className={styles.container}>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
				<meta name="keywords" content={keywords} />
				<link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div>{children}</div>
            <Footer />
		</div>
	);
}

Layout.defaultProps = {
	title: "Atri Hegde",
	description: "A personal website with posts and wikis",
	keywords: "Linux, Personal website, Blog",
};

export default Layout;
