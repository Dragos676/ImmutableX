import { AlchemyProvider } from "@ethersproject/providers";
import ImutableXLNKService from "services/ImmutableXLnkService";
import ImutableXSDKService from "services/ImutableXSDKService";
import env from '../config/imutablex';
import { Link } from '@imtbl/imx-sdk';
export function createImutxService() : ImutableXSDKService{
    const alchemyProvider = new AlchemyProvider(env.ethNetwork, env.alchemyApiKey);
    return new ImutableXSDKService(alchemyProvider);
  }

  export function createImutxLnkService() : ImutableXLNKService{
    const link:Link = new Link(env.client.publicLinkApiUrl);
    return new ImutableXLNKService(link);
  }