import React from 'react';
import type { ReactElement } from 'react';
import { Layout } from '~/components';
import type { NextPageWithLayout } from './_app';

import { useGetNFTsForContract } from '~/hooks';

import { Input, Button } from 'antd';

import NFTCard from '~/components/nft-card';

const Home: NextPageWithLayout = () => {
	const [address, setAddress] = React.useState<string>('');
	const { fetch, next, data, isLoading, error } = useGetNFTsForContract({
		contractAddress: address,
	});

	return (
		<div className='lex flex flex-col justify-center gap-16 p-8 sm:p-16'>
			<div className='flex flex-col items-center justify-center gap-3 sm:flex-row'>
				<Input
					placeholder='NFT Contract Address'
					className='max-w-md'
					size='large'
					onChange={(e) => setAddress(e.target.value)}
				/>
				<Button
					className='bg-primary'
					size='large'
					type='primary'
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					onClick={fetch}
					disabled={isLoading}
				>
					Fetch
				</Button>
				<Button
					className='bg-primary'
					size='large'
					type='primary'
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					onClick={next}
					disabled={isLoading || !data}
				>
					Next Page
				</Button>
			</div>
			<div className='flex flex-row flex-wrap justify-center gap-4'>
				{error && <div className='text-red-500'>{error.message}</div>}
				{data?.nfts.map((nft) => <NFTCard key={nft.tokenId} nft={nft} />)}
			</div>
		</div>
	);
};

Home.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Home;
