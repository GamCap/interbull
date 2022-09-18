import { useEffect, useRef, ReactNode } from 'react';
import humanFormat from 'human-format';
import { API, graphqlOperation } from 'aws-amplify';
import { Observable } from 'rxjs';

export async function generateDayWiseTimeSeries(toDate, type, yrange) {
	await wait(1000);

	let count = 45;
	let interval = 8 * 24 * 60 * 60 * 1000;
	let baseval = new Date(toDate - (count - 1) * interval).getTime();
	if (type === '24h') {
		count = 24;
		interval = 60 * 60 * 1000;
		toDate = new Date(toDate).setMinutes(0, 0, 0);
		baseval = new Date(toDate - (count - 1) * interval).getTime();
	} else if (type === '7d') {
		count = 28;
		interval = 6 * 60 * 60 * 1000;
		const tempDate = new Date(toDate);
		if (tempDate.getUTCHours() < 6 && tempDate.getTime() >= 0) {
			tempDate.setUTCHours(0, 0, 0, 0);
		} else if (tempDate.getUTCHours() >= 6 && tempDate.getUTCHours() < 12) {
			tempDate.setUTCHours(6, 0, 0, 0);
		} else if (tempDate.getUTCHours() >= 12 && tempDate.getUTCHours() < 18) {
			tempDate.setUTCHours(12, 0, 0, 0);
		} else if (tempDate.getUTCHours() >= 18 && tempDate.getUTCHours() < 24) {
			tempDate.setUTCHours(18, 0, 0, 0);
		}
		toDate = new Date(tempDate.getTime());
		baseval = new Date(toDate - (count - 1) * interval).getTime();
	} else if (type === '30d') {
		count = 30;
		interval = 24 * 60 * 60 * 1000;
		baseval = new Date(toDate - (count - 1) * interval).getTime();
	} else if (type === '3m') {
		count = 30;
		interval = 3 * 24 * 60 * 60 * 1000;
		baseval = new Date(toDate - (count - 1) * interval).getTime();
	} else if (type === '1y') {
		count = 45;
		interval = 8 * 24 * 60 * 60 * 1000;
		baseval = new Date(toDate - (count - 1) * interval).getTime();
	}
	let i = 0;
	const series: any[] = [];
	while (i < count) {
		const x = baseval;
		const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

		series.push([x, y]);
		baseval += interval;
		i++;
	}
	return series;
}

export function nFormatter(num, digits) {
	const scale = new humanFormat.Scale({
		'': 1,
		k: 1000,
		M: 1000000,
		G: 1000000000,
	});
	try {
		return humanFormat(num, {
			maxDecimal: 'auto',
			separator: '',
			scale: scale,
		});
	} catch (error) {
		return '-';
	}

	// const lookup = [
	// 	{ value: 1, symbol: '' },
	// 	{ value: 1e3, symbol: 'k' },
	// 	{ value: 1e6, symbol: 'M' },
	// 	{ value: 1e9, symbol: 'G' },
	// 	{ value: 1e12, symbol: 'T' },
	// 	{ value: 1e15, symbol: 'P' },
	// 	{ value: 1e18, symbol: 'E' },
	// ];
	// const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
	// const item = lookup
	// 	.slice()
	// 	.reverse()
	// 	.find(function (item) {
	// 		return num >= item.value;
	// 	});
	// return item ? (Number(num) / item.value).toFixed(digits).replace(rx, '$1') + item.symbol : num;
}

export function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}

export function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export function getFromToInterval(toDate, type) {
	let count = 45;
	let interval = 8 * 24 * 60 * 60 * 1000;
	if (type === '24h') {
		count = 24;
		interval = 60 * 60 * 1000;
	} else if (type === '7d') {
		count = 28;
		interval = 6 * 60 * 60 * 1000;
	} else if (type === '30d') {
		count = 30;
		interval = 24 * 60 * 60 * 1000;
	} else if (type === '3m') {
		count = 30;
		interval = 3 * 24 * 60 * 60 * 1000;
	} else if (type === '1y') {
		count = 45;
		interval = 8 * 24 * 60 * 60 * 1000;
	}
	toDate = new Date(toDate).setMinutes(0, 0, 0);
	const baseval = new Date(toDate - (count - 1) * interval).getTime();
	return {
		from: baseval / 1000,
		to: toDate / 1000,
		interval: interval / 1000 / 2,
	};
}

function wait(milliseconds) {
	return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export function timeSince(now: number, date: Date) {
	const seconds = Math.floor((now - new Date(date).getTime()) / 1000);

	let interval = seconds / 31536000;

	if (interval >= 1) {
		return Math.floor(interval) + ' y';
	}
	interval = seconds / 2592000;
	if (interval >= 1) {
		return Math.floor(interval) + ' m';
	}
	interval = seconds / 86400;
	if (interval >= 1) {
		return Math.floor(interval) + ' d';
	}
	interval = seconds / 3600;
	if (interval >= 1) {
		return Math.floor(interval) + ' h';
	}
	interval = seconds / 60;
	if (interval >= 1) {
		return Math.floor(interval) + ' min';
	}
	return Math.floor(seconds) + ' sec';
}

export const graphQLSubscription = (subscription: string, options: any, callback: (d: any) => void) => {
	return (API.graphql(graphqlOperation(subscription, options)) as any).subscribe({
		next: ({ provider, value }) => callback(value),
		error: (error) => console.warn(error),
	});
};

// export const ViewportBlock = handleViewport(((props) => {
// 	const { inViewport, forwardedRef, enterCount } = props;
// 	return (
// 		<div className="viewport-block" ref={forwardedRef}>
// 			{!inViewport && enterCount < 1 ? null : props.children}
// 		</div>
// 	);
// }) as unknown as ReactNode);

// export class NFTBullTheme extends am5.Theme {
// 	setupDefaultRules() {
// 		// Set theme rules here
// 		// ...
// 		this.rule('AxisRendererX').setAll({
// 			minGridDistance: 50,
// 		});
// 		this.rule('AxisRendererY').setAll({
// 			minGridDistance: 30,
// 		});
// 		this.rule('XYChart').setAll({
// 			panX: false,
// 			panY: false,
// 			wheelX: 'none',
// 			wheelY: 'none',
// 		});
// 		this.rule('Grid', ['y']).setAll({
// 			stroke: am5.color(0x6b7280),
// 			strokeWidth: 1,
// 			opacity: 1,
// 			strokeDasharray: [4, 4],
// 		});
// 		this.rule('Grid', ['x']).setAll({
// 			visible: false,
// 		});

// 		// this.rule('ValueAxis').setAll({
// 		// 	stroke: am5.color(0x6b7280),
// 		// 	strokeWidth: 1,
// 		// 	opacity: 1,
// 		// 	strokeDasharray: [10, 5],
// 		// });

// 		this.rule('Label').setAll({
// 			fill: am5.color(0x6b7280),
// 			fontSize: '0.6em',
// 		});
// 		this.rule('GaplessDateAxis').setAll({
// 			dateFormats: {
// 				millisecond: 'mm:ss SSS',
// 				second: 'HH:mm:ss',
// 				minute: 'HH:mm',
// 				hour: 'HH:mm',
// 				day: 'MMM dd',
// 				week: 'MMM dd',
// 				month: 'MMM',
// 				year: 'yyyy',
// 			},
// 		});
// 		this.rule('ColorSet').set('colors', [am5.color(0x44bcff), am5.color(0xff44ec), am5.color(0xff675e)]);
// 	}
// }

export function shortenAddress(address) {
	if (address) {
		return `${address.substring(0, 6)}...${address.slice(-4)}`;
	} else return null;
}

export function shortenTokenId(tokenId) {
	if (String(tokenId).length > 8) {
		return `${tokenId.substring(0, 4)}...${tokenId.slice(-2)}`;
	} else return tokenId;
}
