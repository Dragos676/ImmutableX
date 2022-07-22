
import { MetadataTypes } from '@imtbl/imx-sdk';
import env from '../config/imutablex';

export interface MetadataSchema  {
  key: string;
  collectionAddress: string;
  metadata:string;
}

export const parseMetadata = (metadata:string) : ({ name: string; } & { type?: MetadataTypes | undefined; filterable?: boolean | undefined; })[] => {
  return JSON.parse(metadata) as ({ name: string; } & { type?: MetadataTypes | undefined; filterable?: boolean | undefined; })[];
}

export const createEmptySchema = (): MetadataSchema => ({
  key: env.defaultPrivateKey,
  collectionAddress:'',
  metadata:`
  [
    {
      "name": "name",
      "type": "text"
    },
    {
      "name": "Rare",
      "type": "boolean"
    },
    {
      "name": "description",
      "type": "text"
    }
  ]`
});
