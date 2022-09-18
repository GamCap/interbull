/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronDownIcon, ExternalLinkIcon } from '@heroicons/react/solid';
import { useNetwork, useSwitchNetwork } from 'wagmi';

const publishingOptions = [
	{
		title: 'Ethereum',
		description: 'Etherscan',
		current: true,
		logo: require('../../assets/img/eth.png'),
		comingSoon: false,
		link: 'https://etherscan.io/',
	},
	{
		title: 'Solana',
		description: 'Solscan',
		current: false,
		logo: require('../../assets/img/sol.png'),
		comingSoon: true,
		link: 'https://solscan.io/',
	},
	{
		title: 'Avalanche',
		description: 'Explorer',
		current: false,
		logo: require('../../assets/img/avax.png'),
		comingSoon: true,
		link: 'https://explorer.avax.network/',
	},
];

function getLogoFromChainId(id) {
	switch (id) {
		case 43113:
			return require('../../assets/img/avax.png');
		default:
			break;
	}
}

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function Network() {
	const [selected, setSelected] = useState(publishingOptions[0]);
	const { chain } = useNetwork();
	const { chains, error, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork();

	return (
		<Listbox value={selected} onChange={setSelected}>
			{({ open }) => (
				<>
					<Listbox.Label className="sr-only">Change published status</Listbox.Label>
					<div className="relative">
						<div className="inline-flex rounded-md">
							<div className="relative z-0 inline-flex rounded-md">
								<div className="relative inline-flex items-center py-2 pl-3 pr-4 border border-gray-200 rounded-l-md">
									<img className="h-4 w-4 rounded-full" src={getLogoFromChainId(chain?.id)} alt="" />
									<p className="ml-2.5 text-sm font-medium">{chain?.name}</p>
								</div>
								<Listbox.Button className="relative inline-flex items-center p-2 border border-gray-200 border-l-0 rounded-l-none rounded-r-md text-sm font-medium hover:bg-gray-100 focus:outline-none focus:z-10">
									<span className="sr-only">Change published status</span>
									<ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
								</Listbox.Button>
							</div>
						</div>

						<Transition
							show={open}
							as={Fragment}
							leave="transition ease-in duration-100"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Listbox.Options className="origin-top-right absolute z-10 right-0 mt-2 w-72 rounded-md shadow-lg overflow-hidden bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none">
								{chains.map((chn) => (
									<Listbox.Option
										disabled={chn.comingSoon}
										key={chn.id}
										className={({ active }) =>
											classNames(
												active ? 'bg-gray-100' : 'text-gray-900',

												'cursor-default select-none relative p-4 text-sm'
											)
										}
										value={chn}
									>
										{({ select, active }) => (
											<div className="flex flex-col">
												<div className="inline-flex space-x-2">
													<img className="h-4 w-4 rounded-full" src={getLogoFromChainId(chn.id)} alt="" />
													<p className={select ? 'font-semibold' : 'font-normal'}>{chn.name}</p>
												</div>
												<div className={classNames('flex mt-2')}>
													<a
														href={chn.blockExplorers.default.url}
														target="_blank"
														rel="noreferrer"
														className=" inline-flex"
													>
														{chn.blockExplorers.default.name}
														<ExternalLinkIcon className="w-4 h-4" />{' '}
													</a>
												</div>
											</div>
										)}
									</Listbox.Option>
								))}
							</Listbox.Options>
						</Transition>
					</div>
				</>
			)}
		</Listbox>
	);
}
