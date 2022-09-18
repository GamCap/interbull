import MarqueeCard from './marquee_card';

function Marquee() {
	return (
		<div className="bg-white/60 dark:bg-gray-800/80 py-2 flex items-center overflow-hidden top-0">
			<div className="marquee">
				{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
					<MarqueeCard key={`marquee-card-${i}`} />
				))}
			</div>
		</div>
	);
}

export default Marquee;
