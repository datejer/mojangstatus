import { ThemeProvider } from "next-themes";
import "../styles/globals.css";
import "status-indicator/styles.css";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider defaultTheme="system">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
