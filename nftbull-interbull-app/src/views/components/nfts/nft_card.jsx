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
	console.log(outbox_abi);
	const { config, error } = usePrepareContractWrite({
		chainId: 43113,
		addressOrName: '0xb94925F31ADA788108FaF7DBAF8ce649377ab7Be'.toLowerCase(),
		contractInterface: cross_vault_abi,
		functionName: 'dispatchCall',
		args: [0, '0x0000000000000000000000007c5b5bda7f1d1f70a6678abb4d894612fc76498f'],
	});
	const { data, isLoading, isSuccess, write } = useContractWrite(config);

	function buy(priceInWETH, message) {
		config.args = [priceInWETH, message];

		console.log(data, isLoading, isSuccess, write);
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
				<button onClick={() => buy(nft.price * 10 ** 18, getHexFromNFT(nft?.listing))}>Buy</button>
			</div>
		</div>
	);
}
