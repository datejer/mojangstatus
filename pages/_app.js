import { ThemeProvider } from "next-themes";
import "../styles/globals.css";
import "status-indicator/styles.css";

function MyApp({ Component, pageProps }) {
	return (
		<ThemeProvider defaultTheme="system">
			<Component {...pageProps} />
		</ThemeProvider>
	);
}

export default MyApp;
