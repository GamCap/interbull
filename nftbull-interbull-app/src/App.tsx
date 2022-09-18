import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
// import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { StoreProvider } from '@utils';
import { AppRoutes } from '@components/common';

// const NETWORK = WalletAdapterNetwork.Devnet; // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.

export const App: FC = () => {
	return (
		<BrowserRouter>
			<StoreProvider>
				<AppRoutes />
			</StoreProvider>
		</BrowserRouter>
	);
};
