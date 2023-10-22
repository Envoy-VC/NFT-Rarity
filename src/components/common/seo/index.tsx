import { NextSeo } from 'next-seo';

const SEO = () => {
	return (
		<NextSeo
			title='NFT Rarity'
			description='A simple NFT Rarity calculator using Alchemy APIs.'
			openGraph={{
				url: 'https://w3-starter.vercel.app',
				title: 'Web3 Hackathon Starter',
				description: 'A simple NFT Rarity calculator using Alchemy APIs.',
				images: [
					{
						url: 'https://i.ibb.co/H44m9Xd/OG.png',
						width: 1200,
						height: 630,
						alt: 'NFT Rarity OG Image',
						type: 'image/png',
					},
				],
				siteName: 'NFT Rarity',
			}}
			twitter={{
				handle: '@Envoy_1084',
				site: '@Envoy_1084',
				cardType: 'summary_large_image',
			}}
		/>
	);
};

export default SEO;
