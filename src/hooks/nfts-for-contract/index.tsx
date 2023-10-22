import React from 'react';
import { env } from '~/env.mjs';
import { Network, Alchemy } from 'alchemy-sdk';
import type { Nft, NftAttributesResponse } from 'alchemy-sdk';

const settings = {
	apiKey: env.NEXT_PUBLIC_ALCHEMY_API_KEY,
	network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

interface Props {
	contractAddress: string;
}

export interface NftWithRarity extends Nft {
	rarityScore: number;
}
import { calculateRarityScore } from '~/helpers';
interface NftResponseWithRarity {
	nfts: NftWithRarity[];
	pageKey?: string;
}

const useGetNFTsForContract = ({ contractAddress }: Props) => {
	const [data, setData] = React.useState<NftResponseWithRarity | null>(null);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [error, setError] = React.useState<Error | null>(null);

	const [summarizedAttributes, setSummarizedAttributes] =
		React.useState<NftAttributesResponse>();

	const fetch = async () => {
		setData(null);
		setSummarizedAttributes(undefined);
		setError(null);
		setIsLoading(true);
		try {
			const summary = await alchemy.nft.summarizeNftAttributes(contractAddress);
			console.log(summary);
			setSummarizedAttributes(summary);
			const res = await alchemy.nft.getNftsForContract(contractAddress);
			const nfts = res.nfts.map((nft) => {
				const rarityScore = calculateRarityScore({
					metadata: nft.rawMetadata!,
					attributeResponse: summary,
				});
				return { ...nft, rarityScore };
			});
			const newData: NftResponseWithRarity = {
				nfts,
				pageKey: res.pageKey,
			};
			setData(newData);
		} catch (error) {
			setError(new Error('Error fetching data'));
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const fetchPage = async (pageKey?: string) => {
		setIsLoading(true);
		try {
			const res = await alchemy.nft.getNftsForContract(contractAddress, {
				pageKey,
			});
			const nfts = res.nfts.map((nft) => {
				const rarityScore = calculateRarityScore({
					metadata: nft.rawMetadata!,
					attributeResponse: summarizedAttributes!,
				});
				return { ...nft, rarityScore };
			});
			const newData: NftResponseWithRarity = {
				nfts,
				pageKey: res.pageKey,
			};
			return newData;
		} catch (error) {
			setError(new Error('Error fetching data'));
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const next = async () => {
		setIsLoading(true);
		if (!data) return;
		const { pageKey } = data;
		if (!pageKey) {
			setError(new Error('No more data to fetch'));
			return;
		}
		try {
			const res = await fetchPage(pageKey);
			if (!res) return;
			const newData: NftResponseWithRarity = {
				nfts: [...data.nfts, ...res.nfts],
				pageKey: res.pageKey,
			};
			setData(newData);
		} catch (error) {
			setError(new Error('Error fetching data'));
		} finally {
			setIsLoading(false);
		}
	};

	return { fetch, next, data, isLoading, error };
};

export default useGetNFTsForContract;
