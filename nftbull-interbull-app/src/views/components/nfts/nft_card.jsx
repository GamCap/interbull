import { ethers } from 'ethers';
import { Link } from 'react-router-dom';
import { nFormatter, shortenAddress } from '../../../utilities';
import seaport_abi from './abis/seaport.json';
import outbox_abi from './abis/outbox.json';
import cross_vault_abi from './abis/cross_vault.json';

import { useContractWrite, usePrepareContractWrite } from 'wagmi';

function getHexFromNFT(trade_data) {
	const additionalRecipients = trade_data['protocol_data']['parameters']['consideration'].slice(1);

	const parsedAdditionalRecipents = [additionalRecipients[0]['startAmount'], additionalRecipients[0]['recipient']];

	const seaportInterface = new ethers.utils.Interface(seaport_abi);

	// entire data packing
	const data = [
		trade_data['protocol_data']['parameters']['consideration'][0]['token'],
		trade_data['protocol_data']['parameters']['consideration'][0]['identifierOrCriteria'],
		trade_data['protocol_data']['parameters']['consideration'][0]['startAmount'],
		trade_data['protocol_data']['parameters']['offerer'],
		trade_data['protocol_data']['parameters']['zone'],
		trade_data['protocol_data']['parameters']['offer'][0]['token'],
		trade_data['protocol_data']['parameters']['offer'][0]['identifierOrCriteria'],
		trade_data['protocol_data']['parameters']['offer'][0]['startAmount'],
		trade_data['protocol_data']['parameters']['orderType'],
		trade_data['protocol_data']['parameters']['startTime'],
		trade_data['protocol_data']['parameters']['endTime'],
		trade_data['protocol_data']['parameters']['zoneHash'],
		trade_data['protocol_data']['parameters']['salt'],
		trade_data['protocol_data']['parameters']['conduitKey'],
		trade_data['protocol_data']['parameters']['conduitKey'],
		trade_data['protocol_data']['parameters']['totalOriginalConsiderationItems'] - 1,
		[parsedAdditionalRecipents],
		trade_data['protocol_data']['signature'],
	];
	const encodedOrderData = seaportInterface.encodeFunctionData('fulfillBasicOrder', [data]);
	return encodedOrderData;
}

export default function NFTCard({ nft }) {
	const { config, error } = usePrepareContractWrite({
		chainId: 43113,
		addressOrName: '0xc507A7c848b59469cC44A3653F8a582aa8BeC71E'.toLowerCase(),
		contractInterface: outbox_abi,
		functionName: 'dispatch',
		args: [5, '0x000000000000000000000000576834fC77837E0B04c58FBE9A97Eb38E59B3932', getHexFromNFT(nft?.listing)],
	});
	const { write } = useContractWrite(config);

	function buy() {
		write?.();
	}
	return (
		<div key={nft.name} className="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden">
			<div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96">
				<img src={nft?.image} className="w-full h-full object-center object-cover sm:w-full sm:h-full" />
			</div>
			<div className="flex-1 p-4 space-y-2 flex flex-col">
				<h3 className="text-sm font-medium text-gray-900">
					<a onClick={() => buy(getHexFromNFT(nft?.listing))} href={nft?.href}>
						<span aria-hidden="true" className="absolute inset-0" />
						{nft?.name}
					</a>
				</h3>
				<p className="text-sm text-gray-500">{error?.message}</p>
				<div className="flex-1 flex space-x-2">
					<img src={require('../../../assets/img/eth.png')} alt="" className="flex-shrink-0 h-4 w-4" />
					<p className="text-base font-medium text-gray-900">{nft?.price}</p>
				</div>
				<button
					className="mt-6 w-full rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
					onClick={() => buy()}
				>
					Buy
				</button>
			</div>
		</div>
	);
}
