/* eslint-disable @typescript-eslint/no-shadow */
/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ]
  }
  ```
*/
import { useEffect, useState } from 'react';
import { BadgeCheckIcon, CollectionIcon, GlobeAltIcon, UsersIcon } from '@heroicons/react/solid';
import { API } from 'aws-amplify';
import { classNames, getFromToInterval } from '../../utilities';

export default function CollectionProfile({ collection_address }) {
	const [meta, setMeta] = useState(null);
	const [loading, setLoading] = useState(true);

	function parseMethod(method) {
		switch (method) {
			case 'creator_hosted':
				return ['Creator Hosted', 'red'];
			case 'arweave:':
				return ['Arweave', 'green'];
			case 'ipns':
				return ['IPNS', 'yellow'];
			case 'ipfs':
				return ['IPFS', 'green'];
			case 'data':
				return ['On-chain', 'green'];
			case 'dweb':
				return ['DWEB', 'yellow'];
			default:
				return ['Unknown', 'gray'];
		}
	}

	async function getMETAData(collection_address) {
		setLoading(true);
		const { from, to, interval } = getFromToInterval(new Date(), '24h');
		try {
			const response = await API.get('Collections', `/ETH/${collection_address}`, {
				queryStringParameters: {
					chart_data: JSON.stringify({
						floor_price: true,
						twitter: true,
						discord: true,
					}),
					from,
					to,
					chain: 'ETH',
					interval,
				},
			});
			setMeta(response.data);
			setLoading(false);
			return response.data;
		} catch (e) {
			console.log(e);
			setLoading(false);
			return null;
		}
	}

	useEffect(() => {
		getMETAData(collection_address);
	}, []);

	return (
		<div className="xl:flex-shrink-0 xl:w-52 xl:border-r xl:border-gray-200 ">
			<div className="px-4 py-3.5 border-b">
				<div className="flex space-x-2 items-center">
					<h2 className="text-sm font-semibold">Meta</h2>
				</div>
			</div>
			<div>
				<>
					<img className="h-32 w-full object-cover xl:h-48" src={'assets/nftbull-logo.png'} alt="" />
					<div className={classNames('sm:flex sm:items-end sm:space-x-5 px-4', '-mt-14 sm:-mt-20')}>
						<div className="flex">
							<img
								className="h-18 w-18 rounded-full ring-4 ring-white sm:h-24 sm:w-24"
								src={'/assets/collection-logo.png'}
								alt=""
							/>
						</div>
					</div>
				</>
			</div>
			<div className="no-scrollbar overflow-y-scroll py-4 px-4">
				{!loading ? (
					<div className="flex items-center justify-between">
						<div className="flex-1 space-y-8">
							<div className="space-y-8 sm:space-y-0 sm:flex sm:justify-between xl:block xl:space-y-8">
								{/* Profile */}

								<div className="space-y-1">
									<div className="text-base font-medium text-gray-900">{"Interbull's by NFTBull"}</div>

									<div className="flex items-center space-x-2">
										<CollectionIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
										<span className="text-sm text-gray-500 font-medium">{10} NFT's</span>
									</div>
									<div className="flex items-center space-x-2">
										<UsersIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
										<span className="text-sm text-gray-500 font-medium">{1} Owners</span>
									</div>
								</div>

								<div className="space-y-1">
									<div className="text-sm font-medium text-gray-900">Marketplaces</div>
									<a
										href={'https://testnets.opensea.io/collection/interbull-ethberlin'}
										target="_blank"
										rel="noreferrer"
										className="group flex items-center space-x-2.5"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
											viewBox="0 0 90 90"
											aria-hidden="true"
											fill="currentColor"
										>
											<path
												d="M90 45C90 69.8514 69.8514 90 45 90C20.1486 90 0 69.8514 0 45C0 20.1486 20.1486 0 45 0C69.8566 0 90 20.1486 90 45Z"
												fill="#2081E2"
											/>
											<path
												d="M22.2011 46.512L22.3953 46.2069L34.1016 27.8939C34.2726 27.6257 34.6749 27.6535 34.8043 27.9447C36.76 32.3277 38.4475 37.7786 37.6569 41.1721C37.3194 42.5683 36.3948 44.4593 35.3545 46.2069C35.2204 46.4612 35.0725 46.7109 34.9153 46.9513C34.8413 47.0622 34.7165 47.127 34.5824 47.127H22.5432C22.2196 47.127 22.0301 46.7756 22.2011 46.512Z"
												fill="white"
											/>
											<path
												d="M74.38 49.9149V52.8137C74.38 52.9801 74.2783 53.1281 74.1304 53.1928C73.2242 53.5812 70.1219 55.0052 68.832 56.799C65.5402 61.3807 63.0251 67.932 57.4031 67.932H33.949C25.6362 67.932 18.9 61.1727 18.9 52.8322V52.564C18.9 52.3421 19.0803 52.1618 19.3023 52.1618H32.377C32.6359 52.1618 32.8255 52.4022 32.8024 52.6565C32.7099 53.5072 32.8671 54.3764 33.2693 55.167C34.0461 56.7435 35.655 57.7283 37.3934 57.7283H43.866V52.675H37.4673C37.1391 52.675 36.9449 52.2959 37.1345 52.0277C37.2038 51.9214 37.2824 51.8104 37.3656 51.6856C37.9713 50.8257 38.8358 49.4895 39.6958 47.9684C40.2829 46.9421 40.8516 45.8463 41.3093 44.746C41.4018 44.5472 41.4758 44.3438 41.5497 44.1449C41.6746 43.7936 41.804 43.4653 41.8965 43.1371C41.9889 42.8597 42.0629 42.5684 42.1369 42.2956C42.3542 41.3617 42.4467 40.3723 42.4467 39.3459C42.4467 38.9437 42.4282 38.523 42.3912 38.1207C42.3727 37.6815 42.3172 37.2423 42.2617 36.8031C42.2247 36.4147 42.1554 36.031 42.0814 35.6288C41.9889 35.0416 41.8595 34.4591 41.7115 33.8719L41.6607 33.65C41.5497 33.2478 41.4573 32.864 41.3278 32.4618C40.9626 31.1996 40.5418 29.9698 40.098 28.8186C39.9362 28.3609 39.7512 27.9217 39.5663 27.4825C39.2935 26.8213 39.0161 26.2203 38.7619 25.6516C38.6324 25.3927 38.5214 25.1569 38.4105 24.9165C38.2857 24.6437 38.1562 24.371 38.0268 24.112C37.9343 23.9132 37.8279 23.7283 37.754 23.5434L36.9634 22.0824C36.8524 21.8836 37.0374 21.6478 37.2546 21.7079L42.2016 23.0487H42.2155C42.2247 23.0487 42.2294 23.0533 42.234 23.0533L42.8859 23.2336L43.6025 23.437L43.866 23.511V20.5706C43.866 19.1512 45.0034 18 46.4089 18C47.1116 18 47.7496 18.2866 48.2073 18.7536C48.665 19.2206 48.9517 19.8586 48.9517 20.5706V24.935L49.4787 25.0829C49.5204 25.0968 49.562 25.1153 49.599 25.143C49.7284 25.2401 49.9133 25.3835 50.1491 25.5591C50.3341 25.7071 50.5329 25.8874 50.7733 26.0723C51.2495 26.4561 51.8181 26.9508 52.4423 27.5194C52.6087 27.6628 52.7706 27.8107 52.9185 27.9587C53.723 28.7076 54.6245 29.5861 55.4845 30.557C55.7249 30.8297 55.9607 31.1071 56.2011 31.3984C56.4415 31.6943 56.6958 31.9856 56.9177 32.2769C57.209 32.6652 57.5233 33.0674 57.7961 33.4882C57.9256 33.687 58.0735 33.8904 58.1984 34.0892C58.5497 34.6209 58.8595 35.1711 59.1554 35.7212C59.2802 35.9755 59.4097 36.2529 59.5206 36.5257C59.8489 37.2608 60.1078 38.0098 60.2742 38.7588C60.3251 38.9206 60.3621 39.0963 60.3806 39.2535V39.2904C60.436 39.5124 60.4545 39.7482 60.473 39.9886C60.547 40.756 60.51 41.5235 60.3436 42.2956C60.2742 42.6239 60.1818 42.9336 60.0708 43.2619C59.9598 43.5763 59.8489 43.9045 59.7056 44.2143C59.4282 44.8569 59.0999 45.4996 58.7115 46.1006C58.5867 46.3225 58.4388 46.5583 58.2908 46.7802C58.129 47.016 57.9626 47.238 57.8146 47.4553C57.6112 47.7327 57.3939 48.0239 57.172 48.2828C56.9732 48.5556 56.7697 48.8284 56.5478 49.0688C56.2381 49.434 55.9422 49.7808 55.6324 50.1137C55.4475 50.331 55.2487 50.5529 55.0452 50.7517C54.8464 50.9736 54.643 51.1724 54.4581 51.3573C54.1483 51.6671 53.8894 51.9075 53.6721 52.1063L53.1635 52.5733C53.0896 52.638 52.9925 52.675 52.8908 52.675H48.9517V57.7283H53.9079C55.0175 57.7283 56.0716 57.3353 56.9223 56.6141C57.2136 56.3598 58.485 55.2594 59.9876 53.5997C60.0384 53.5442 60.1032 53.5026 60.1771 53.4841L73.8668 49.5265C74.1211 49.4525 74.38 49.6467 74.38 49.9149Z"
												fill="white"
											/>
										</svg>
										<span className="text-sm text-gray-500 group-hover:text-gray-900 font-medium">Opensea</span>
									</a>
								</div>
								<div className="space-y-1">
									<div className="text-sm font-medium text-gray-900">Socials</div>

									<a
										href={'https://twitter.com/nftbullapp'}
										target="_blank"
										rel="noreferrer"
										className="group flex items-center space-x-2.5"
									>
										<svg
											className="h-5 w-5 text-[#1DA1F2] group-hover:text-[#1c99e6]"
											xmlns="http://www.w3.org/2000/svg"
											xmlnsXlink="http://www.w3.org/1999/xlink"
											version="1.1"
											fill="currentColor"
											id="Logo"
											x="0px"
											y="0px"
											width={18}
											height={15}
											viewBox="0 0 248 204"
											style={{ enableBackground: 'new 0 0 248 204' }}
											xmlSpace="preserve"
										>
											<g id="Logo_1_">
												<path
													id="white_background"
													d="M221.95,51.29c0.15,2.17,0.15,4.34,0.15,6.53c0,66.73-50.8,143.69-143.69,143.69v-0.04   C50.97,201.51,24.1,193.65,1,178.83c3.99,0.48,8,0.72,12.02,0.73c22.74,0.02,44.83-7.61,62.72-21.66   c-21.61-0.41-40.56-14.5-47.18-35.07c7.57,1.46,15.37,1.16,22.8-0.87C27.8,117.2,10.85,96.5,10.85,72.46c0-0.22,0-0.43,0-0.64   c7.02,3.91,14.88,6.08,22.92,6.32C11.58,63.31,4.74,33.79,18.14,10.71c25.64,31.55,63.47,50.73,104.08,52.76   c-4.07-17.54,1.49-35.92,14.61-48.25c20.34-19.12,52.33-18.14,71.45,2.19c11.31-2.23,22.15-6.38,32.07-12.26   c-3.77,11.69-11.66,21.62-22.2,27.93c10.01-1.18,19.79-3.86,29-7.95C240.37,35.29,231.83,44.14,221.95,51.29z"
												/>
											</g>
										</svg>
										<span className="text-sm text-gray-500 group-hover:text-gray-900 font-medium">Twitter</span>
									</a>
								</div>
								<div className="space-y-1">
									<div className="text-sm font-medium text-gray-900">Other</div>
									<div className="space-y-1">
										{meta.collection.collection_address && (
											<a
												href={'https://goerli.etherscan.io/address/' + '0x0de9db04578a41a19341240495c6894f5fc3f550'}
												target="_blank"
												rel="noreferrer"
												className="group flex items-center space-x-2.5"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
													viewBox="0 0 293.775 293.671"
												>
													<g id="etherscan-logo-circle" transform="translate(-219.378 -213.33)">
														<path
															id="Path_1"
															data-name="Path 1"
															d="M280.433,353.152A12.45,12.45,0,0,1,292.941,340.7l20.737.068a12.467,12.467,0,0,1,12.467,12.467v78.414c2.336-.692,5.332-1.43,8.614-2.2a10.389,10.389,0,0,0,8.009-10.11V322.073a12.469,12.469,0,0,1,12.468-12.47h20.778a12.469,12.469,0,0,1,12.467,12.467v90.279s5.2-2.106,10.269-4.245a10.408,10.408,0,0,0,6.353-9.577V290.9a12.466,12.466,0,0,1,12.466-12.467h20.778A12.468,12.468,0,0,1,450.815,290.9v88.625c18.014-13.055,36.271-28.758,50.759-47.639a20.926,20.926,0,0,0,3.185-19.537,146.6,146.6,0,0,0-136.644-99.006c-81.439-1.094-148.744,65.385-148.736,146.834a146.371,146.371,0,0,0,19.5,73.45,18.56,18.56,0,0,0,17.707,9.173c3.931-.346,8.825-.835,14.643-1.518a10.383,10.383,0,0,0,9.209-10.306V353.152"
															fill="#21325b"
														/>
														<path
															id="Path_2"
															data-name="Path 2"
															d="M244.417,398.641A146.808,146.808,0,0,0,477.589,279.9c0-3.381-.157-6.724-.383-10.049-53.642,80-152.686,117.4-232.79,128.793"
															transform="translate(35.564 80.269)"
															fill="#979695"
														/>
													</g>
												</svg>

												<span className="text-sm text-gray-500 group-hover:text-gray-900 font-medium">
													Etherscan
												</span>
											</a>
										)}
										<a
											href={'https://nftbull.app/'}
											target="_blank"
											rel="noreferrer"
											className="group flex items-center space-x-2.5"
										>
											<GlobeAltIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-500" />

											<span className="text-sm text-gray-500 group-hover:text-gray-900 font-medium">Website</span>
										</a>
									</div>
								</div>
								{/* Action buttons */}
								{/* <div className="flex flex-col sm:flex-row xl:flex-col">
															<Link to={'/explore'}>
																<button
																	type="button"
																	className="mt-3 inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 xl:ml-0 xl:mt-3 xl:w-full"
																>
																	Explore a new collection
																</button>
															</Link>
														</div> */}
							</div>
							{/* Meta info */}
						</div>
					</div>
				) : (
					<div className="justify-center items-center">
						<svg
							role="status"
							className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-black"
							viewBox="0 0 100 101"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
								fill="currentColor"
							/>
							<path
								d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
								fill="currentFill"
							/>
						</svg>
					</div>
				)}
			</div>
			{/* <div className="px-4 py-2.5 text-sm border-t border-gray-200">
								<a href="#" className="text-indigo-600 font-semibold hover:text-indigo-900">
									View all activity <span aria-hidden="true">&rarr;</span>
								</a>
							</div> */}
		</div>
	);
}
