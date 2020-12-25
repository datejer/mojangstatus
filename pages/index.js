import Head from "next/head";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/Home.module.css";

export default function Home() {
	const [status, setStatus] = useState([]);

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
			<Head>
				<title>MojangStatus</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>MojangStatus</h1>

				<div className={styles.list}>
					{status.map((service) => {
						let serviceName = Object.keys(service)[0];
						let serviceStatus = service[serviceName];
						return (
							<div className={styles.service} key={serviceName}>
								<span className={styles.serviceName}>{serviceName}</span>
								<span className={styles.serviceStatus}>{serviceStatus}</span>
							</div>
						);
					})}
				</div>

				<div>
					<code className={styles.code}>curl mojan.ga/api/check</code>
				</div>
			</main>

			<footer className={styles.footer}>
				<a href="https://ejer.ga/" target="_blank" rel="noopener noreferrer">
					Made by ejer
				</a>
			</footer>
		</div>
	);
}
