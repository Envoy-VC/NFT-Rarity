import type { NftMetadata, NftAttributesResponse } from 'alchemy-sdk';

interface RarityScoreProps {
	metadata: NftMetadata;
	attributeResponse: NftAttributesResponse;
}

export const calculateRarityScore = ({
	metadata,
	attributeResponse,
}: RarityScoreProps) => {
	const { totalSupply, summary } = attributeResponse;
	const { attributes } = metadata;
	let rarityScore = 0;
	if (!attributes) return rarityScore;
	attributes.forEach((attribute) => {
		const { trait_type, value } = attribute;
		if (typeof value !== 'string' || typeof trait_type !== 'string') return;
		const nftsForTrait = summary[trait_type]?.[value] ?? 0;
		if (nftsForTrait === 0) return;
		const score = 1 / (nftsForTrait / totalSupply);
		rarityScore += score;
	});

	return rarityScore;
};
