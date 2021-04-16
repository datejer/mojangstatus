import Head from "next/head";

export default function SEO() {
	return (
		<Head>
			<title>MojangStatus</title>
			<link rel="icon" href="/favicon.png" />

			<meta name="title" content="MojangStatus" />
			<meta
				name="description"
				content="Cached Mojang Status API - no more rate limiting!"
			/>

			<meta property="og:type" content="website" />
			<meta property="og:url" content="https://mojan.ga/" />
			<meta property="og:title" content="MojangStatus" />
			<meta
				property="og:description"
				content="Cached Mojang Status API - no more rate limiting!"
			/>
			<meta property="og:image" content="/favicon.png" />

			<meta property="twitter:url" content="https://mojan.ga/" />
			<meta property="twitter:domain" content="mojan.ga" />
			<meta property="twitter:title" content="MojangStatus" />
			<meta
				property="twitter:description"
				content="Cached Mojang Status API - no more rate limiting!"
			/>
			<meta property="twitter:image" content="/favicon.png" />

			<meta property="og:site_name" content="MojangStatus" />
			<meta name="theme-color" content="#ffffff" />
		</Head>
	);
}
