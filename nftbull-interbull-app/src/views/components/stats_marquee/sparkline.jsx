// import React, { useEffect, useState, useMemo } from 'react';
// import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';
// export function SparkLineComponent({ data, colorGreen, height }) {
// 	const sparkLinesRef = React.createRef();
// 	const imageRef = React.createRef();
// 	const [isImageReady, setIsImageReady] = useState(false);
// 	const [optimizedImageSrc, setOptimizedImageSrc] = useState('');

// 	const LinearGradientFill = useMemo(
// 		() =>
// 			({ stopColor, id }) => {
// 				return (
// 					<linearGradient id={id} x1="0%" y1="0%" x2="0%" y2="100%">
// 						<stop offset="0%" stopColor={stopColor} stopOpacity={colorGreen ? '0.6' : '0.8'} />
// 						<stop offset="50%" stopColor={stopColor} stopOpacity={colorGreen ? '0.3' : '0.4'} />
// 						<stop offset="100%" stopColor={stopColor} stopOpacity="0.0" />
// 					</linearGradient>
// 				);
// 			},
// 		[]
// 	);

// 	const generateOptimizedImageSrc = (imageSrcBase64) => {
// 		const canvas = document.createElement('canvas');
// 		canvas.height = 45;
// 		canvas.width = 250;

// 		const context = canvas.getContext('2d');
// 		const image = new Image();

// 		image.onload = () => {
// 			context?.drawImage(image, 0, 0, canvas.width, canvas.height);

// 			// see https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL
// 			// to see how the options were defined.
// 			setOptimizedImageSrc(canvas.toDataURL('image/png', 0.4));
// 		};

// 		// Assigning the src instantiates the onload method.
// 		image.src = imageSrcBase64;
// 	};

// 	const generateImageFromSvg = (svgElement) => {
// 		const xml = new XMLSerializer().serializeToString(svgElement);
// 		const svgBase64 = btoa(xml);
// 		const base64Start = 'data:image/svg+xml;base64,';
// 		const image64 = base64Start + svgBase64;

// 		generateOptimizedImageSrc(image64);

// 		setIsImageReady(true);
// 	};

// 	useEffect(() => {
// 		if (sparkLinesRef.current && data?.length) {
// 			const svg = sparkLinesRef.current.children[0];

// 			generateImageFromSvg(svg);
// 		}
// 	}, [sparkLinesRef]);

// 	useEffect(() => {
// 		if (optimizedImageSrc) {
// 			imageRef.current.src = optimizedImageSrc;
// 		}
// 	}, [optimizedImageSrc]);

// 	return (
// 		<div className="w-full pt-2">
// 			{!isImageReady ? (
// 				<div ref={sparkLinesRef} className={isImageReady ? 'hidden' : ''}>
// 					<Sparklines data={data} height={height} margin={6}>
// 						<svg>
// 							<defs>
// 								<LinearGradientFill id="red-gradient" stopColor={'#424242'} />
// 								<LinearGradientFill id="green-gradient" stopColor={'#fd6930'} />
// 							</defs>
// 						</svg>
// 						<SparklinesLine
// 							style={{
// 								stroke: colorGreen ? '#fd6930' : '#424242',
// 								strokeWidth: 4,
// 								// eslint-disable-next-line quotes
// 								fill: `url(#${colorGreen ? 'green' : 'red'}-gradient)`,
// 								fillOpacity: '1',
// 							}}
// 						/>
// 						<SparklinesSpots size={6} style={{ fill: colorGreen ? '#fd6930' : '#424242' }} />
// 					</Sparklines>
// 				</div>
// 			) : null}
// 			{/* Img required for better webpage performance */}
// 			<img ref={imageRef} alt="" />
// 		</div>
// 	);
// }
