import React, { useEffect, useState, useRef } from 'react';
import { API } from 'aws-amplify';
import { PuzzleIcon } from '@heroicons/react/solid';
import * as queries from '../../../graphql/queries';
import NFTCard from '../../components/nfts/nft_card';
import nfts from './data.json';

export default function NFTsSubpage() {
	const [loading, setLoading] = useState(false);
	const [view, setView] = useState('grid');

	const [finished, setFinished] = useState(false);

	return (
		<div className="bg-white">
			<div className="p-4">
				{/* Product grid */}
				<section aria-labelledby="nfts">
					{nfts.length === 0 && !loading ? (
						<div className="py-14 px-6 content-center items-center justify-center text-center text-sm sm:px-14">
							<PuzzleIcon className="mx-auto h-6 w-6 text-gray-400" aria-hidden="true" />
							<p className="mt-4 font-semibold text-gray-900">No assets found</p>
							<p className="mt-2 text-gray-500">We couldn’t find anything.</p>
						</div>
					) : (
						<div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
							{nfts.map((nft) => (
								<NFTCard key={nft.id} nft={nft} />
							))}
						</div>
					)}

					{/* {!loading && !finished && (
						<div
							onClick={() => {
								// getNFTs();
							}}
							className="flex content-center items-center justify-center text-center mt-6 px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 w-full"
						>
							Load more
						</div>
					)} */}
					{loading && (
						<div className="flex content-center items-center justify-center text-center mt-6 px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 w-full">
							<svg
								role="status"
								className="inline w-4 h-4 text-ebony-clay-200 animate-spin dark:text-ebony-clay-600 fill-black"
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
				</section>
			</div>
		</div>
	);
}
