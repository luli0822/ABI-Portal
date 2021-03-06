import React from 'react';

function PlayButton() {
	return (
		<svg width="40" height="40" viewBox="0 0 40 40">
			<defs>
				<path
					id="a"
					d="M20 0C8.973 0 0 8.973 0 20s8.973 20 20 20 20-8.973 20-20S31.027 0 20 0zm0 36.436c-9.057 0-16.436-7.38-16.436-16.436 0-9.057 7.38-16.436 16.436-16.436 9.057 0 16.436 7.38 16.436 16.436 0 9.057-7.38 16.436-16.436 16.436zm-3.648-24.36c-.461-.252-1.048.083-1.048.586l-.042 14.634c0 .545.587.88 1.048.629l12.705-7.296c.46-.252.46-.923 0-1.216l-12.663-7.338z"
				/>
			</defs>
			<g fill="none" fillRule="evenodd">
				<mask id="b" fill="#fff">
					<use xlinkHref="#a" />
				</mask>
				<g fill="#FFF" mask="url(#b)">
					<path d="M-47-48H97V96H-47z" />
				</g>
			</g>
		</svg>
	);
}

export default PlayButton;
