import './polyfills';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports.js';
import reportWebVitals from './reportWebVitals';
import 'flowbite';
import { allChains, Chain, configureChains, defaultChains, WagmiConfig } from 'wagmi';

import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

import { createClient } from 'wagmi';

// API key for Ethereum node
// Two popular services are Infura (infura.io) and Alchemy (alchemy.com)
// const infuraId = process.env.INFURA_ID;
const infuraId = 'e44e74d4f8d74f57a2b8432faec0701f';

// const avalancheFuji: Chain = {
// 	id: 43113,
// };
// Configure chains for connectors to support
const configuredChains: Chain[] = [
	{
		id: 43113,
		name: 'Avalanche FUJI C-Chain',
		network: '43113',
		nativeCurrency: {
			name: 'Avalanche',
			symbol: 'AVAX',
			decimals: 18,
		},
		rpcUrls: {
			default: 'https://api.avax-test.network/ext/bc/C/rpc',
		},
		blockExplorers: {
			default: {
				name: 'Snowtrace',
				url: 'https://testnet.snowtrace.io/',
			},
		},
		testnet: true,
		// ens: {
		// 	address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
		// },
		// multicall: {
		// 	address: '0xca11bde05977b3631167028862be2a173976ca11',
		// 	blockCreated: 14353601,
		// },
	},
];
const { chains, provider } = configureChains(configuredChains, [infuraProvider({ apiKey: infuraId }), publicProvider()]);

console.log(allChains);

// Set up connectors
export const connectors = [
	new MetaMaskConnector({
		chains,
	}),
	new CoinbaseWalletConnector({
		chains,
		options: {
			appName: 'nftbull',
		},
	}),
	new WalletConnectConnector({
		chains,
		options: {
			infuraId,
			qrcode: true,
		},
	}),
];

// STYLE IMPORTS
import './index.scss';

Amplify.configure({
	API: {
		endpoints: [
			{
				name: 'Transactions',
				endpoint: 'https://api.gamcapresearch.com/transactions',
			},
			{
				name: 'Collections',
				endpoint: 'https://api.gamcapresearch.com/collections',
			},
			{
				name: 'Charting',
				endpoint: 'https://api.gamcapresearch.com/charting',
			},
			{
				name: 'Utilities',
				endpoint: 'https://api.gamcapresearch.com/utilities',
			},
		],
	},
	aws_project_region: 'eu-central-1',
	aws_appsync_graphqlEndpoint: 'https://m6pxkznsqjd57gv4v4abfzvg2m.appsync-api.eu-central-1.amazonaws.com/graphql',
	aws_appsync_region: 'eu-central-1',
	aws_appsync_authenticationType: 'API_KEY',
	aws_appsync_apiKey: 'da2-z2cdd2zfyrbo3nzohm6hd7edfm',
});
// Amplify.configure(awsExports);

const client = createClient({
	autoConnect: true,
	connectors,
	provider,
});

ReactDOM.render(
	<React.StrictMode>
		<WagmiConfig client={client}>
			<App />
		</WagmiConfig>
	</React.StrictMode>,
	document.getElementById('root')
);

const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

// Change the icons inside the button based on previous settings
if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
	themeToggleLightIcon?.classList.remove('hidden');
} else {
	themeToggleDarkIcon?.classList.remove('hidden');
}

const themeToggleBtn = document.getElementById('theme-toggle');

export function toggleBtnClicked() {
	// toggle icons inside button
	themeToggleDarkIcon?.classList.toggle('hidden');
	themeToggleLightIcon?.classList.toggle('hidden');

	// if set via local storage previously
	if (localStorage.getItem('theme')) {
		if (localStorage.getItem('theme') === 'light') {
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}

		// if NOT set via local storage previously
	} else {
		if (document.documentElement.classList.contains('dark')) {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		} else {
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		}
	}
}

themeToggleBtn?.addEventListener('click', toggleBtnClicked);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
