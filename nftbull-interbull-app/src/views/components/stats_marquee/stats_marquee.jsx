import { useState } from 'react';
import { classNames } from '../../../utilities';
import StatsMarqueeBlockchain from './stats_marquee_network';
import StatsMarqueeToken from './stats_marquee_token';

function StatsMarquee({ data, dark = false }) {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<>
			{data.prices && (
				<div
					className={classNames(
						isOpen ? 'translate-y-0' : '-translate-y-full -z-40',
						'transform ease-in-out transition-all duration-500 top-24'
					)}
				>
					<div className=" overflow-hidden flex h-9">
						<div
							className={classNames(
								isOpen ? 'opacity-100' : 'opacity-0 bg-transparent',
								dark ? 'bg-white/10' : 'bg-white/70',
								' transform ease-in-out transition-all duration-300 marquee items-center'
							)}
						>
							<div
								className={classNames(
									'inline-block w-max h-max items-center border-r-2',
									!dark ? 'border-ebony-clay-700' : 'border-gray-200'
								)}
							>
								<div className="inline-block w-32">
									<div className="flex justify-center w-full h-full">
										<span
											className={classNames('font-semibold text-sm', !dark ? 'text-ebony-clay-700' : 'text-gray-200')}
										>
											{'Tokens (24hr)'}
										</span>
									</div>
								</div>
							</div>
							{Object.keys(data.prices).map((key, i) => (
								<StatsMarqueeToken key={`marquee-token-${key}-${i}`} symbol={key} price={data.prices[key]} dark={dark} />
							))}
							<div
								className={classNames(
									'inline-block w-max h-max items-center border-r-2',
									!dark ? 'border-ebony-clay-700' : 'border-gray-200'
								)}
							>
								<div className="inline-block w-36">
									<div className="flex justify-center w-full h-full">
										<span
											className={classNames('font-semibold text-sm', !dark ? 'text-ebony-clay-700' : 'text-gray-200')}
										>
											{'NFT Sales (24hr)'}
										</span>
									</div>
								</div>
							</div>
							{[
								{
									name: 'Avalanche',
									symbol: 'AVAX',
									volume: 1043442,
								},
								{
									name: 'Solana',
									symbol: 'SOL',
									volume: 3374339,
								},
								{
									name: 'Ethereum',
									symbol: 'ETH',
									volume: 41593145,
								},
							].map((key, i) => (
								<StatsMarqueeBlockchain
									key={`marquee-blockchain-${key}-${i}`}
									symbol={key.symbol}
									volume={key.volume}
									name={key.name}
									dark={dark}
								/>
							))}
							<div
								className={classNames(
									'inline-block w-max h-max items-center border-r-2',
									!dark ? 'border-ebony-clay-700' : 'border-gray-200'
								)}
							>
								<div className="inline-block w-32">
									<div className="flex justify-center w-full h-full">
										<span
											className={classNames('font-semibold text-sm', !dark ? 'text-ebony-clay-700' : 'text-gray-200')}
										>
											{'Tokens (24hr)'}
										</span>
									</div>
								</div>
							</div>
							{Object.keys(data.prices).map((key, i) => (
								<StatsMarqueeToken
									key={`stats-marquee-token-1-${key}-${i}`}
									symbol={key}
									price={data.prices[key]}
									dark={dark}
								/>
							))}
							<div
								className={classNames(
									'inline-block w-max h-max items-center border-r-2',
									!dark ? 'border-ebony-clay-700' : 'border-gray-200'
								)}
							>
								<div className="inline-block w-36">
									<div className="flex justify-center w-full h-full">
										<span
											className={classNames('font-semibold text-sm', !dark ? 'text-ebony-clay-700' : 'text-gray-200')}
										>
											{'NFT Sales (24hr)'}
										</span>
									</div>
								</div>
							</div>
							{[
								{
									name: 'Avalanche',
									symbol: 'AVAX',
									volume: 1043442,
								},
								{
									name: 'Solana',
									symbol: 'SOL',
									volume: 3374339,
								},
								{
									name: 'Ethereum',
									symbol: 'ETH',
									volume: 41593145,
								},
							].map((key, i) => (
								<StatsMarqueeBlockchain
									key={`stats-marquee-block-chain-${key}-${i}`}
									symbol={key.symbol}
									volume={key.volume}
									name={key.name}
									dark={dark}
								/>
							))}
						</div>
					</div>
					{/* Marquee close button */}
					{/* <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer fixed left-1/2 -bottom-3">
						<div className={classNames('rounded-md shadow relative w-4 h-4', dark ? 'bg-ebony-clay-800' : 'bg-white')}>
							<svg
								className={classNames(
									isOpen ? 'rotate-180' : '',
									dark ? 'text-white' : 'text-black',
									'w-4 h-4 transition-transform duration-500'
								)}
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
							</svg>
						</div>
					</div> */}
				</div>
			)}
			{!data.prices && (
				<div className={classNames(dark ? 'bg-white/10' : 'bg-white/70')}>
					<div className="flex justify-center items-center h-9">
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
				</div>
			)}
		</>
	);
}

export default StatsMarquee;
