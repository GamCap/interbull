import { Link } from 'react-router-dom';
import { nFormatter } from '../../../utilities';

export default function CollectionCard({ collection }) {
	return (
		<Link to={`/collections/${collection.collection_address}`}>
			<div className="flex flex-col h-full relative group">
				<div className="absolute transition-all duration-1000 opacity-20 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg filter  group-hover:opacity-50 group-hover:-inset-1 group-hover:duration-200" />{' '}
				<div className="h-full flex flex-col rounded-lg border bg-white border-gray-200 relative overflow-hidden">
					<div className="flex-shrink-0">
						<img
							className="h-48 w-full object-cover"
							src={
								collection.featured_image_url
									? collection.featured_image_url
									: collection.large_collection_logo
									? collection.large_collection_logo
									: collection.collection_logo
							}
							alt=""
						/>
					</div>
					<div className="flex-1 bg-white p-4 flex flex-col justify-between">
						<div className="flex items-center">
							<div className="flex-shrink-0">
								<span className="sr-only">{collection.name}</span>
								<img className="h-10 w-10 rounded-full" src={collection.collection_logo} alt="" />
							</div>
							<div className="ml-3">
								<p className="text-sm font-medium text-gray-900">{collection.name}</p>
								<div className="flex space-x-1 text-sm text-gray-500">
									<span>{collection.num_owners} owners</span>
									<span aria-hidden="true">&middot;</span>
									<span>{collection.total_supply} NFTs</span>
								</div>
							</div>
						</div>
						<div className="mt-4 flex-1 flex flex-col justify-end space-y-2 ">
							<div className="flex justify-between">
								<p className="text-sm font-medium text-gray-500">Chain</p>
								<div className="flex-shrink-0 h-4 w-4">
									{collection.chain === 'ETH' && (
										<img className="rounded-full" src={require('../../../assets/img/eth.png')} alt="" />
									)}
									{collection.chain === 'SOL' && (
										<img className="rounded-full" src={require('../../../assets/img/sol.png')} alt="" />
									)}
								</div>
							</div>
							<div className="flex justify-between">
								<p className="text-sm font-medium text-gray-500">Average Price (7d)</p>
								<p className="text-sm font-medium text-gray-500">
									Ξ{nFormatter(collection.seven_day_average_price / 10 ** 9)}
								</p>
							</div>
							<div className="flex justify-between">
								<p className="text-sm font-medium text-gray-500">Volume (7d)</p>
								<p className="text-sm font-medium text-gray-500">Ξ{nFormatter(collection.seven_day_volume / 10 ** 9)}</p>
							</div>
							<div className="flex justify-between">
								<p className="text-sm font-medium text-indigo-600">Momentum Score</p>
								<p className="text-sm font-medium text-indigo-600">{nFormatter(collection.last_momentum / 10 ** 9)}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
}
