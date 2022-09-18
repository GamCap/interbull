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
import { useEffect, useRef, useState } from 'react';
import { BadgeCheckIcon, CollectionIcon, GlobeAltIcon, UsersIcon } from '@heroicons/react/solid';
import { Outlet, useLocation, useOutletContext, useParams } from 'react-router-dom';
import { API } from 'aws-amplify';
import { getFromToInterval, timeSince } from '../../utilities.tsx';
import { BanIcon, ShoppingCartIcon, TagIcon } from '@heroicons/react/outline';
import * as queries from '../../graphql/queries';
import * as subscriptions from '../../graphql/subscriptions';
import Tabs from '../components/tabs';
import { graphQLSubscription, nFormatter, shortenTokenId } from '../../utilities';

function switchIcon(txType, marketplace) {
	switch (txType) {
		case 'sale':
			return (
				<div className="relative">
					<div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center ring-8 ring-white">
						<ShoppingCartIcon className="w-5 h-5 text-gray-500" aria-hidden="true" />
					</div>

					<span className="absolute -bottom-1 -right-2 px-0.5 py-px">{switchSource(marketplace)}</span>
				</div>
			);
		case 'cancel_list':
			return (
				<div className="relative">
					<div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center ring-8 ring-white">
						<BanIcon className="w-5 h-5 text-gray-500" aria-hidden="true" />
					</div>

					<span className="absolute -bottom-1 -right-2 px-0.5 py-px">{switchSource(marketplace)}</span>
				</div>
			);
		case 'list':
			return (
				<div className="relative">
					<div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center ring-8 ring-white">
						<TagIcon className="w-5 h-5 text-gray-500" aria-hidden="true" />
					</div>

					<span className="absolute -bottom-1 -right-2 px-0.5 py-px">{switchSource(marketplace)}</span>
				</div>
			);
	}
}
function switchSource(txType) {
	switch (txType) {
		case 'opensea':
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-4 w-4 text-gray-400 group-hover:text-gray-500"
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
			);
		case 'looksrare':
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					xmlnsXlink="http://www.w3.org/1999/xlink"
					className="h-4 w-4 text-gray-400 group-hover:text-gray-500"
					aria-hidden="true"
					fill="currentColor"
					version={1.0}
					id="katman_1"
					viewBox="160 120 480 360"
					xmlSpace="preserve"
				>
					<style
						type="text/css"
						dangerouslySetInnerHTML={{
							__html: '\n\t.st0{fill:#2DE370;}\n\t.st1{fill:#121619;}\n\t.st2{fill-rule:evenodd;clip-rule:evenodd;fill:#FFFFFF;}\n',
						}}
					/>
					<path className="st0" d="M298.3,98L146,249.5L399.7,502l253.7-252.4L501.1,98H298.3z" />
					<path
						className="st1"
						d="M291.2,196.4c59.9-60,157.1-60,217,0l51.8,51.8l-51.8,51.8c-59.9,60-157.1,60-217,0l-51.8-51.8L291.2,196.4z"
					/>
					<path
						className="st2"
						d="M399.7,311.7c-35,0-63.4-27.7-63.4-61.8s28.4-61.8,63.4-61.8s63.4,27.7,63.4,61.8S434.8,311.7,399.7,311.7z"
					/>
					<path
						className="st1"
						d="M399.7,274.9c-14.7,0-26.7-12-26.7-26.7c0-14.8,12-26.7,26.7-26.7c14.7,0,26.7,12,26.7,26.7  C426.4,263,414.5,274.9,399.7,274.9z"
					/>
				</svg>
			);
		case 'x2y2':
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-4 w-4 text-gray-400 group-hover:text-gray-500"
					viewBox="0 0 512 512"
					aria-hidden="true"
					fill="currentColor"
				>
					<path
						d="M459.265 100.353C420.038 62.0229 366.378 38.4 307.2 38.4C187.023 38.4 89.6 135.823 89.6 256C89.6 376.177 187.023 473.6 307.2 473.6C366.377 473.6 420.038 449.977 459.265 411.647C412.474 472.661 338.831 512 256 512C114.615 512 0 397.385 0 256C0 114.615 114.615 0 256 0C338.831 0 412.474 39.339 459.265 100.353Z"
						fill="url(#paint0_linear_3_635)"
					/>
					<path
						d="M144.588 380.518C175.97 411.182 218.898 430.08 266.24 430.08C362.382 430.08 440.32 352.142 440.32 256C440.32 159.858 362.382 81.92 266.24 81.92C218.898 81.92 175.97 100.818 144.588 131.482C182.021 82.6712 240.935 51.2 307.2 51.2C420.308 51.2 512 142.892 512 256C512 369.108 420.308 460.8 307.2 460.8C240.935 460.8 182.021 429.329 144.588 380.518Z"
						fill="url(#paint1_linear_3_635)"
					/>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M409.6 256C409.6 340.831 340.831 409.6 256 409.6C171.169 409.6 102.4 340.831 102.4 256C102.4 171.169 171.169 102.4 256 102.4C340.831 102.4 409.6 171.169 409.6 256ZM358.4 256C358.4 312.554 312.554 358.4 256 358.4C199.446 358.4 153.6 312.554 153.6 256C153.6 199.446 199.446 153.6 256 153.6C312.554 153.6 358.4 199.446 358.4 256Z"
						fill="url(#paint2_linear_3_635)"
					/>
					<defs>
						<linearGradient id="paint0_linear_3_635" x1={0} y1="247.172" x2={512} y2="247.172" gradientUnits="userSpaceOnUse">
							<stop stopColor="#00E0FF" />
							<stop offset={1} stopColor="#562EC8" />
						</linearGradient>
						<linearGradient id="paint1_linear_3_635" x1={0} y1="247.172" x2={512} y2="247.172" gradientUnits="userSpaceOnUse">
							<stop stopColor="#00E0FF" />
							<stop offset={1} stopColor="#562EC8" />
						</linearGradient>
						<linearGradient id="paint2_linear_3_635" x1={0} y1="247.172" x2={512} y2="247.172" gradientUnits="userSpaceOnUse">
							<stop stopColor="#00E0FF" />
							<stop offset={1} stopColor="#562EC8" />
						</linearGradient>
					</defs>
				</svg>
			);
	}
}

function switchColor(txType) {
	switch (txType) {
		case 'sale':
			return 'bg-gray-100';
		case 'cancel_list':
			return 'bg-gray-100';
		case 'list':
			return 'bg-gray-100';
	}
}

function getActivityText(txType) {
	switch (txType) {
		case 'sale':
			return 'has been sold';
		case 'cancel_list':
			return 'listing has been cancelled';
		case 'list':
			return 'has been listed';
	}
}
function getSymbolImage(symbol) {
	switch (symbol) {
		case 'WETH':
			return (
				<svg viewBox="0 0 48 96" focusable="false" className="inline-block w-2">
					<path d="M23.9913 8.91397L23.4668 10.6955V62.3857L23.9913 62.909L47.9848 48.7262L23.9913 8.91397Z" fill="#DF5960" />
					<path d="M23.9942 8.91397L0 48.7262L23.9942 62.909V37.82V8.91397Z" fill="#EE9398" />
					<path d="M23.9909 67.4524L23.6953 67.8128V86.2252L23.9909 87.0881L47.9985 53.2773L23.9909 67.4524Z" fill="#DF5960" />
					<path d="M23.9935 87.0879V67.4522L0 53.2772L23.9935 87.0879Z" fill="#EE9398" />
					<path d="M23.9941 62.9063L47.987 48.7239L23.9941 37.818V62.9063Z" fill="#CF373E" />
					<path d="M0 48.7242L23.9935 62.9066V37.8183L0 48.7242Z" fill="#DF5960" />
				</svg>
			);
		case 'ETH':
			return (
				<svg viewBox="0 0 48 96" focusable="false" className="inline-block w-2">
					<path d="M23.9932 8.91386L23.4688 10.6953V62.3843L23.9932 62.9075L47.9862 48.725L23.9932 8.91386Z" fill="#767676" />
					<path d="M23.9936 8.91386L0 48.725L23.9936 62.9075V37.8191V8.91386Z" fill="#8E8E8E" />
					<path d="M23.9914 67.4523L23.6958 67.8128V86.2251L23.9914 87.088L47.9991 53.2772L23.9914 67.4523Z" fill="#5F5F5F" />
					<path d="M23.9936 87.088V67.4523L0 53.2772L23.9936 87.088Z" fill="#8E8E8E" />
					<path d="M23.9937 62.9066L47.9867 48.7242L23.9937 37.8183V62.9066Z" fill="#5F5F5F" />
					<path d="M0 48.7242L23.9936 62.9066V37.8183L0 48.7242Z" fill="#767676" />
				</svg>
			);
		default:
			return symbol;
	}
}
// function getActivityText(txType) {
// 	switch (txType) {
// 		case 'exchange':
// 		case 'successful':
// 			return 'Sale of';
// 		case 'placeBid':
// 		case 'offer_entered':
// 			return 'Bid placed for';
// 		case 'acceptBid':
// 			return 'Bid accepted for';
// 		case 'cancelBid':
// 			return 'Bid cancelled for';
// 		case 'cancelEscrow':
// 			return 'Escrow cancelled for';
// 		case 'initializeEscrow':
// 		case 'created':
// 			return 'Escrow initialized for';
// 	}
// }

export default function ActivityFeed({ collection_address }) {
	const [activities, _setActivities] = useState([]);
	const [activitiesLoading, setActivitiesLoading] = useState(false);

	const setActivities = (data) => {
		activitiesRef.current = data;
		_setActivities(data);
	};
	const activitiesRef = useRef([]);
	const subscription = useRef(null);

	const [now, setNow] = useState(new Date().getTime());

	async function getActivities(collection_address) {
		setActivitiesLoading(true);
		try {
			const response = await API.graphql({
				query: queries.queryCollectionEvents,
				variables: { collection_address: collection_address, chain: 'ETH', first: 30 },
			});
			setActivities(response.data.queryCollectionEvents.items);
		} catch (e) {
			console.log(e);
			setActivities(e.data.queryCollectionEvents.items);
		}
		setActivitiesLoading(false);
	}

	async function subscribeActivities(address) {
		try {
			subscription.current = graphQLSubscription(subscriptions.onCreateCollectionEvent, { collection_address: address }, (data) => {
				const newActivities = [data.data.onCreateCollectionEvent, ...activitiesRef.current]
					.sort((a, b) => b.timestamp - a.timestamp)
					.slice(0, 30);
				setActivities(newActivities);
			});
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		window.scrollTo(0, 0);
		subscribeActivities(collection_address);
		getActivities(collection_address);
		const interval = setInterval(() => {
			setNow(new Date().getTime());
		}, 1000);
		return () => {
			subscription?.current?.unsubscribe();
			clearInterval(interval);
		};
	}, []);

	return (
		<div className="lg:flex-shrink-0 flex flex-col lg:border-l lg:border-gray-200">
			<div className="px-4 py-3.5 border-b">
				<div className="flex space-x-2 items-center">
					<h2 className="text-sm font-semibold">Activities</h2>
					<span className="flex h-2 w-2">
						<span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-300 opacity-75"></span>
						<span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
					</span>
				</div>
			</div>
			<div className="no-scrollbar overflow-y-scroll py-4 px-4 lg:w-64">
				<div className="">
					<ul className="">
						{!activitiesLoading ? (
							activities.map((item, itemIdx) => (
								<li key={Math.random()}>
									<div className="relative pb-8">
										{itemIdx !== activities.length - 1 ? (
											<span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
										) : null}
										<div className="relative flex space-x-3">
											<div className="self-center">{switchIcon(item.event_type, item.source)}</div>
											<div className="self-center min-w-0 flex-1 flex justify-between space-x-4">
												<div>
													<p className="text-sm text-gray-500 dark:text-gray-400">
														<a
															href={
																item.source === 'opensea'
																	? 'https://opensea.io/assets/ethereum/' +
																	  item.collection_address +
																	  '/' +
																	  item.token_id
																	: item.source === 'looksrare'
																	? 'https://looksrare.org/collections/' +
																	  item.collection_address +
																	  '/' +
																	  item.token_id
																	: null
															}
															target="_blank"
															rel="noreferrer"
														>
															<span className="font-bold hover:underline">
																#{shortenTokenId(item.token_id)}
															</span>
														</a>
														<br></br>
														<span>{getActivityText(item.event_type)}</span>
														{item.event_type !== 'cancel_list' && item.price && (
															<>
																<br></br>
																<span>
																	{'for '}
																	{nFormatter(Number(item.price) / 10 ** 18)}{' '}
																	{getSymbolImage(item.payment_symbol)}
																</span>
															</>
														)}
													</p>
												</div>
												<div className="text-right text-sm whitespace-nowrap text-gray-500">
													<time dateTime={item.timestamp * 1000}>
														{timeSince(now, new Date(item.timestamp * 1000))}
													</time>
												</div>
											</div>
										</div>
									</div>
								</li>
							))
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
					</ul>
				</div>
			</div>
			{/* <div className="px-4 py-2.5 text-sm border-t border-gray-200">
								<a href="#" className="text-indigo-600 font-semibold hover:text-indigo-900">
									View all activity <span aria-hidden="true">&rarr;</span>
								</a>
							</div> */}
		</div>
	);
}
