

export interface AssetSell {
  tokenId: string;
  tokenAddress: string;
  amount?: string;
}


export const createEmptyAsset = (): AssetSell => ({
  tokenId: '',
  tokenAddress:''
});