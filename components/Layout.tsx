import Head from "next/head";
import React from "react";
import styles from "@/styles/Layout.module.css";
import Header from "./Header/Header";
import Footer from "./Footer";

export function Layout({ children }: any) {
	return (
		<div className={styles.container}>
			{/* <Head>
				<title>{title}</title>
				<meta name="description" content={description} />
				<meta name="keywords" content={keywords} />
				<link rel="icon" href="/favicon.ico" />
			</Head> */}
			<Header />
			<div>{children}</div>
		</div>
	);
}



export default Layout;
