import avax from '../../../assets/img/avax.png';
import sol from '../../../assets/img/sol.png';
import eth from '../../../assets/img/eth.png';
import ape from '../../../assets/img/ape.png';
import { SparkLineComponent } from './sparkline';
import { classNames } from '../../../utilities';

function getTokenLogo(symbol) {
	switch (symbol) {
		case 'ETH':
			return eth;
		case 'SOL':
			return sol;
		case 'AVAX':
			return avax;
		case 'APE':
			return ape;
	}
}

function StatsMarqueeToken({ symbol, price, change, changePercent, dark }) {
	return (
		<div className="inline-block w-max">
			<div className="inline-block w-60" href="#">
				<div className="flex items-center w-full h-full">
					<div className={classNames(dark ? 'text-gray-200' : 'text-ebony-clay-900', 'grid grid-cols-3 w-4/5 ml-4 h-8')}>
						<div className="flex w-full space-x-1 items-center">
							<div className="flex items-center justify-center rounded-full overflow-hidden">
								<img className="w-5" src={getTokenLogo(symbol)} alt="" />
							</div>
							<span className="w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-left text-sm font-semibold">
								{symbol}
							</span>
						</div>
						<div className="flex items-center">
							<div className="text-left text-sm">
								<div>
									<div className="flex h-4 items-center gap-0.5">
										<span>${Number(price).toFixed(2)}</span>
									</div>
								</div>
							</div>
						</div>
						{/* <div className="flex items-center">
							<div className="text-left text-sm">
								<div style={{ fontSize: '12px' }}>
									<div className="flex h-4 items-center gap-0.5">
										<div style={{ color: 'rgb(245, 30, 85)' }}>-3.9%</div>
									</div>
								</div>
							</div>
						</div> */}
					</div>
				</div>
			</div>
		</div>
	);
}

export default StatsMarqueeToken;
