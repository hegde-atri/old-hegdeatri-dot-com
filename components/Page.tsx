import Head from "next/head";

export function Page({ children, title, description, keywords }: any) {
  return (
    <div>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
				<meta name="keywords" content={keywords} />
				<link rel="icon" href="/favicon.ico" />
			</Head>
      <div>{children}</div>
      </div>
	);
}

Page.defaultProps = {
	title: "Atri Hegde",
	description: "A personal website with posts and wikis",
	keywords: "Linux, Personal website, Blog",
};

export default Page;