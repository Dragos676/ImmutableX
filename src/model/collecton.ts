
import env from '../config/imutablex';

export interface Collection {
  walletKey: string;
  projectId: string;
  smartContractAddress:string;
  name: string;
  description:string;
  collectionImageUrl:string;
  metadataApiUrl:string;
}

export const createEmptyCollection = (): Collection => ({
  walletKey: env.defaultPrivateKey,
  name: "",
  projectId:"",
  metadataApiUrl: '',
  collectionImageUrl: '',
  description:"",
  smartContractAddress:""
});
