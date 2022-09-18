import { Outlet, useLocation, useParams } from 'react-router-dom';
import Tabs from '../components/tabs';
import NFTsSubpage from '../subpages/nft/nfts_subpage';
import ActivityFeed from './activity_feed';
import CollectionProfile from './profile';

export default function CollectionPage() {
	const location = useLocation();
	const collection_address = '0xED5AF388653567Af2F388E6224dC7C4b3241C544'.toLowerCase();

	return (
		<div className="bg-white relative flex flex-col border-y" style={{ height: 'calc(100vh - 92px)' }}>
			{/* 3 column wrapper */}
			<div className="relative h-full w-full mx-auto lg:flex">
				{/* Left sidebar & main wrapper */}
				<div className="flex flex-col flex-1 min-w-0 xl:flex-row overflow-y-scroll">
					{/* Account profile */}
					<CollectionProfile collection_address={collection_address} />
					{/* Projects List */}
					<div className="flex flex-col lg:min-w-0 lg:flex-1">
						<div className="sticky top-0 bg-white border-y border-t-0 z-[3]">
							<div className="px-4 py-3.5 ">
								<div className="flex space-x-2 items-center">
									<h2 className="text-sm font-semibold">Listings</h2>
								</div>
							</div>
						</div>
						{/* Transactions graph*/}
						<section className="flex-1 no-scrollbar xl:overflow-y-scroll">
							<NFTsSubpage />,
						</section>
					</div>
				</div>
			</div>
		</div>
	);
}
