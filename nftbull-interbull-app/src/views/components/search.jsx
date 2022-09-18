/*
  This example requires Tailwind CSS v3.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useState } from 'react';
import { Combobox, Dialog, Transition } from '@headlessui/react';
import { DocumentIcon, SearchIcon, XIcon } from '@heroicons/react/solid';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { API } from 'aws-amplify';
import * as queries from '../../graphql/queries';
import { nFormatter } from '../../utilities';

const people = [
	{
		id: 1,
		name: 'Leslie Alexander',
		phone: '1-493-747-9031',
		email: 'lesliealexander@example.com',
		role: 'Co-Founder / CEO',
		url: 'https://example.com',
		profileUrl: '#',
		imageUrl:
			'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
	{
		id: 2,
		name: 'Leslie Alexander',
		phone: '1-493-747-9031',
		email: 'lesliealexander@example.com',
		role: 'Co-Founder / CEO',
		url: 'https://example.com',
		profileUrl: '#',
		imageUrl:
			'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
];

const recent = [];

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function Search({ open, setOpen }) {
	const [query, setQuery] = useState('');
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState([]);

	let promise = null;

	async function searchCollections(text) {
		if (promise) {
			API.cancel(promise);
		}
		promise = API.graphql({ query: queries.searchCollections, variables: { query: text } });
	}

	async function handleOnChange(input) {
		setQuery(input);
		setLoading(true);
		searchCollections(input);
		const res = await promise;
		setResult(res.data.searchCollections);
		setLoading(false);
	}

	async function handleAfterLeave() {
		setQuery('');
		setResult([]);
		setLoading(false);
	}

	return (
		<Transition.Root show={open} as={Fragment} afterLeave={() => handleAfterLeave()}>
			<Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20" onClose={setOpen}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
				</Transition.Child>

				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0 scale-95"
					enterTo="opacity-100 scale-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100 scale-100"
					leaveTo="opacity-0 scale-95"
				>
					<Combobox
						as="div"
						className="mx-auto max-w-3xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
						onChange={(collection) =>
							(window.location = window.location.origin + '/collections/' + collection.collection_address)
						}
					>
						{({ activeOption }) => (
							<>
								<div className="relative">
									<XIcon
										onClick={() => setOpen(false)}
										className="cursor-pointer absolute top-3.5 right-4 h-5 w-5 text-gray-400"
										aria-hidden="true"
									/>
									<SearchIcon
										className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
										aria-hidden="true"
									/>
									<Combobox.Input
										className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-sm text-gray-800 placeholder-gray-400 focus:ring-0"
										placeholder="Start typing..."
										onChange={(event) => handleOnChange(event.target.value)}
									/>
								</div>

								{loading ? (
									<div className="p-5 flex justify-center items-center">
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
								) : result.length > 0 ? (
									<div className="flex divide-x divide-gray-100">
										<div
											className={classNames(
												'max-h-[26rem] min-w-0 flex-auto scroll-py-4 overflow-y-hidden px-6 py-4',
												activeOption && 'sm:h-[26rem]'
											)}
										>
											{query === '' && (
												// <h2 className="mt-2 mb-4 text-xs font-semibold text-gray-500">Recent searches</h2>
												<h2 className="mt-2 mb-4 text-xs font-semibold text-gray-500">Start typing...</h2>
											)}
											<Combobox.Options static hold className="-mx-2 text-sm text-gray-700">
												{(query === '' ? recent : result).map((collection) => (
													<Combobox.Option
														key={collection.id}
														value={collection}
														className={({ active }) =>
															classNames(
																'flex cursor-default select-none items-center rounded-md p-2',
																active && 'bg-gray-100 text-gray-900'
															)
														}
													>
														{({ active }) => (
															<>
																<img
																	src={collection.collection_logo}
																	alt=""
																	className="h-6 w-6 flex-none rounded-full"
																/>
																<span className="ml-3 flex-auto truncate">{collection.name}</span>
																{active && (
																	<ChevronRightIcon
																		className="ml-3 h-5 w-5 flex-none text-gray-400"
																		aria-hidden="true"
																	/>
																)}
															</>
														)}
													</Combobox.Option>
												))}
											</Combobox.Options>
										</div>

										{activeOption && (
											<div className="hidden h-96 w-1/2 flex-none flex-col divide-y divide-gray-100 overflow-y-auto sm:flex">
												<div className="flex-none p-6 text-center">
													<img
														src={activeOption.collection_logo}
														alt=""
														className="mx-auto h-16 w-16 rounded-full"
													/>
													<h2 className="mt-3 font-semibold text-gray-900">{activeOption.name}</h2>
													{/* <div className="flex space-x-2 justify-center pt-2">
													{activeOption.opensea_url && (
														<a
															href={activeOption.opensea_url}
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
														</a>
													)}
													{activeOption.looksrare_url && (
														<a
															href={activeOption.looksrare_url}
															target="_blank"
															rel="noreferrer"
															className="group flex items-center space-x-2.5"
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																xmlnsXlink="http://www.w3.org/1999/xlink"
																className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
																aria-hidden="true"
																fill="currentColor"
																version={1.0}
																id="katman_1"
																viewBox="168 126 560 420"
																xmlSpace="preserve"
															>
																<style
																	type="text/css"
																	dangerouslySetInnerHTML={{
																		__html: '\n\t.st0{fill:#2DE370;}\n\t.st1{fill:#121619;}\n\t.st2{fill-rule:evenodd;clip-rule:evenodd;fill:#FFFFFF;}\n',
																	}}
																/>
																<path
																	className="st0"
																	d="M298.3,98L146,249.5L399.7,502l253.7-252.4L501.1,98H298.3z"
																/>
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
														</a>
													)}
												</div> */}

													{/* <p className="text-sm leading-6 text-gray-500 line-clamp-2">{activeOption.chain}</p> */}
												</div>
												<div className="flex flex-auto flex-col justify-between p-6">
													<dl className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm text-gray-700">
														<dt className="col-end-1 font-semibold text-gray-900">Average Price (7d)</dt>
														<dd>Ξ{nFormatter(activeOption.seven_day_average_price / 10 ** 9)}</dd>
														<dt className="col-end-1 font-semibold text-gray-900">Volume (7d)</dt>
														<dd>Ξ{nFormatter(activeOption.seven_day_volume / 10 ** 9)}</dd>
														<dt className="col-end-1 font-semibold text-gray-900">Collection Size</dt>
														<dd>{activeOption.total_supply}</dd>
														<dt className="col-end-1 font-semibold text-gray-900">Owners</dt>
														<dd>{activeOption.num_owners}</dd>
														<dt className="col-end-1 font-semibold text-gray-900">Website</dt>
														<dd className="truncate">
															<a
																href={`https://${activeOption.project_website}`}
																className="text-gray-600 underline"
															>
																{activeOption.project_website}
															</a>
														</dd>
													</dl>
													<a
														href={`/collections/${activeOption.collection_address}`}
														className="text-gray-600 underline"
													>
														<button
															type="button"
															className="mt-6 w-full rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
														>
															Explore Project
														</button>
													</a>
												</div>
											</div>
										)}
									</div>
								) : query !== '' && result.length === 0 ? (
									<div className="py-14 px-6 text-center text-sm sm:px-14">
										<DocumentIcon className="mx-auto h-6 w-6 text-gray-400" aria-hidden="true" />
										<p className="mt-4 font-semibold text-gray-900">No collections found</p>
										<p className="mt-2 text-gray-500">We couldn’t find anything with that term. Please try again.</p>
									</div>
								) : (
									<></>
								)}
							</>
						)}
					</Combobox>
				</Transition.Child>
			</Dialog>
		</Transition.Root>
	);
}
