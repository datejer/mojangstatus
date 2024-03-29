import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import axios from "axios";
import SEO from "../components/SEO";

import styles from "../styles/Home.module.css";

export default function Home() {
  const [status, setStatus] = useState([]);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    axios
      .get(`/api/check`)
      .then((response) => {
        setStatus(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={styles.container}>
      <SEO />

      <main className={styles.main}>
        <h1 className={styles.title}>MojangStatus</h1>
        <p className={styles.description}>
          Cached Mojang Status API - no more rate limiting!
        </p>

        <div className={styles.list}>
          {status.length === 0 ? (
            <div className={styles.dotflashing}></div>
          ) : (
            status.map((service) => {
              let serviceName = Object.keys(service)[0];
              let serviceStatus = service[serviceName];
              return (
                <div className={styles.service} key={serviceName}>
                  <span className={styles.serviceName}>{serviceName}</span>
                  {serviceStatus === "green" ? (
                    <span
                      className={styles.serviceStatus}
                      style={{
                        color: "var(--status-indicator-color-positive)",
                      }}
                    >
                      No issues{" "}
                      <status-indicator positive pulse></status-indicator>
                    </span>
                  ) : (
                    ""
                  )}
                  {serviceStatus === "yellow" ? (
                    <span
                      className={styles.serviceStatus}
                      style={{
                        color: "var(--status-indicator-color-intermediary)",
                      }}
                    >
                      Some issues{" "}
                      <status-indicator intermediary pulse></status-indicator>
                    </span>
                  ) : (
                    ""
                  )}
                  {serviceStatus === "red" ? (
                    <span
                      className={styles.serviceStatus}
                      style={{
                        color: "var(--status-indicator-color-negative)",
                      }}
                    >
                      Service unavailable{" "}
                      <status-indicator negative pulse></status-indicator>
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              );
            })
          )}
        </div>

        <code className={styles.code}>curl https://mojan.ga/api/check</code>
      </main>

      <footer className={styles.footer}>
        <a
          className={styles.themeSwitch}
          onClick={() =>
            theme === "dark" ? setTheme("light") : setTheme("dark")
          }
        >
          {theme === "dark" ? "🌞" : "🌙"}
        </a>
        <a href="https://ejer.ga/" target="_blank" rel="noopener noreferrer">
          Made by <span className={styles.name}>ejer</span>
        </a>
      </footer>
    </div>
  );
}
