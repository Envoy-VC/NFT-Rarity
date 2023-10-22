import React from 'react';

import type { NftWithRarity } from '~/hooks/nfts-for-contract';

import { Image } from 'antd';

interface Props {
	nft: NftWithRarity;
}

const NFTCard = ({ nft }: Props) => {
	const { title, rarityScore, media, rawMetadata, tokenId } = nft;
	const image =
		media.at(0)?.thumbnail ?? media.at(0)?.gateway ?? rawMetadata?.image ?? '';
	return (
		<div className='NFTCardShadow group flex flex-col overflow-hidden rounded-xl'>
			<div className='max-h-fit overflow-hidden'>
				<Image
					src={image}
					alt={title}
					className='aspect-square w-full max-w-xs rounded-t-xl transition-all duration-300 ease-in-out group-hover:scale-110'
					preview={false}
				/>
			</div>
			<div className='flex flex-col rounded-b-xl px-2 py-3'>
				<div className='text-xl font-semibold'>
					{title === '' ? tokenId : title}
				</div>
				<div className='text-[1rem]'>
					Rarity Score: <span className='font-medium'>{rarityScore.toFixed(2)}</span>
				</div>
			</div>
		</div>
	);
};

export default NFTCard;
