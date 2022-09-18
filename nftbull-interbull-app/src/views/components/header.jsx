import { useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { API } from 'aws-amplify';
import { Link } from 'react-router-dom';
import Wallet from './wallet';
import { useAccount, useBalance } from 'wagmi';
import { shortenAddress } from '../../utilities';
import Network from './network';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

const navigation = [
	{ name: 'Home', href: '/', comingSoon: false },
	{ name: 'Documentation', href: 'https://nftbull.gitbook.io/interbull/', comingSoon: false },
];

export default function Header({ dark = false, prices }) {
	const [post, setPost] = useState(null);
	const [loading, setLoading] = useState(false);
	const [openWallet, setOpenWallet] = useState(false);

	const { address, isConnected, isConnecting, isDisconnected, connector } = useAccount();
	const { data, isSuccess } = useBalance({
		addressOrName: address,
	});

	return (
		<header className="sticky top-0 z-10">
			<Disclosure as="nav" className={classNames(dark ? 'bg-ebony-clay-600' : 'bg-white', '')}>
				{({ open }) => (
					<>
						<div className="mx-auto px-2 sm:px-4 lg:px-8">
							<div className="flex justify-between h-20">
								<div className="flex px-2 lg:px-0">
									<Link to={'/'} className="self-center">
										<div className="flex-shrink-0 flex items-center">
											<img className="h-20 w-auto" src="/assets/nftbull-main.svg" alt="" />

											<div
												id="beta-badge"
												className=" bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] py-0 px-1.5 mx-2 text-xs flex items-center font-semibold text-white rounded-full"
											>
												<p>ETHBerlin Demo</p>
											</div>
										</div>
									</Link>
									<div className="hidden lg:ml-6 lg:flex lg:space-x-8 items-center">
										{/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
										{navigation.map((item, index) => (
											<>
												{item.comingSoon ? (
													<>
														<div
															data-tooltip-target={'nav' + index}
															key={'nav' + item.name}
															className={classNames(
																'px-3 py-2 cursor-not-allowed dark:text-gray-400 font-medium text-sm',
																dark ? 'text-gray-400' : 'text-gray-600'
															)}
														>
															{item.name}
														</div>
														<div
															id={'nav' + index}
															role="tooltip"
															className="inline-block absolute invisible z-10 py-2 px-3 font-medium text-white bg-ebony-clay-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 dark:bg-ebony-clay-700"
														>
															Coming Soon!
															<div className="tooltip-arrow" data-popper-arrow></div>
														</div>
													</>
												) : (
													<>
														<a
															key={'nav-comingsoon' + item.name}
															href={item.href}
															className={classNames(
																'px-3 py-2 dark:text-white font-medium text-sm',
																dark ? 'text-white' : 'text-gray-900'
															)}
														>
															{item.name}
														</a>
													</>
												)}
											</>
										))}
									</div>
								</div>
								{/* <Feedback open={openFeedback} setOpen={setOpenFeedback} /> */}
								<Wallet open={openWallet} setOpen={setOpenWallet} />
								<div className="flex items-center lg:hidden">
									{/* Mobile menu button */}
									<Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
										<span className="sr-only">Open main menu</span>
										{open ? (
											<XIcon className="block h-6 w-6" aria-hidden="true" />
										) : (
											<MenuIcon className="block h-6 w-6" aria-hidden="true" />
										)}
									</Disclosure.Button>
								</div>
								<div className="hidden lg:ml-4 lg:flex lg:items-center lg:space-x-4">
									<Network />
									<div className="group divide-x text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700">
										{isSuccess && (
											<div className="bg-gray-100 group-hover:bg-gray-200 px-3 py-1 mx-1 my-1 rounded-lg">
												{Number(data?.formatted).toFixed(4)} {data?.symbol}
											</div>
										)}

										<button
											onClick={() => setOpenWallet(true)}
											type="button"
											className="inline-flex items-center px-4 py-2"
										>
											<svg
												className="mr-2 w-4 h-4 my-1"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
												></path>
											</svg>
											{isConnected ? shortenAddress(address) : 'Connect wallet'}
										</button>
									</div>
								</div>
							</div>
						</div>

						<Disclosure.Panel className="lg:hidden">
							<div className="pt-2 pb-3 space-y-1">
								{/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-600 hover:bg-ebony-clay-50 hover:border-gray-300 hover:text-gray-800" */}
								<Disclosure.Button
									as="a"
									href="/"
									className="border-transparent text-gray-600 hover:bg-ebony-clay-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
								>
									Home
								</Disclosure.Button>
								<Disclosure.Button
									as="a"
									href="/explore"
									className="border-transparent text-gray-600 hover:bg-ebony-clay-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
								>
									Collections
								</Disclosure.Button>
							</div>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>
		</header>
	);
}
