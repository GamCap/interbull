import React, { useEffect, useState } from 'react';

import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/header';
import TokenPricesHeader from './components/token_prices_header';
import { API } from 'aws-amplify';
import Footer from './components/footer';
import { classNames } from '../utilities';

export default function Main() {
	const [tokenPrices, setTokenPrices] = useState(null);
	const [opacity, setOpacity] = useState(0.8);

	const location = useLocation();

	async function getTokenPrices() {
		try {
			const response = await API.get('Utilities', `/token-prices`, {
				queryStringParameters: {},
			});
			setTokenPrices(response);
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		getTokenPrices();
	}, []);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll); // attaching scroll event listener
	}, []);

	const handleScroll = async () => {
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		const scrollHeight = document.documentElement.scrollHeight;
		const clientHeight = document.documentElement.clientHeight;
		let scrolled = (scrollTop / (scrollHeight - clientHeight)) * 10;
		scrolled = scrolled.toPrecision(1);

		setOpacity(0.8 - scrolled * 2 < 0.15 ? 0.15 : 0.8 - scrolled * 2);
	};

	return (
		<>
			<div className="relative bg-noise dark:bg-dark-noise">
				<div className="bg-white dark:bg-black bg-opacity-80 dark:bg-opacity-80">
					{/* <TokenPricesHeader prices={tokenPrices} /> */}
					<Header prices={tokenPrices} />
					<Outlet context={{ prices: tokenPrices }} />
				</div>
			</div>
		</>
	);
}
