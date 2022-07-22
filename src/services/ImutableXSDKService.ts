//https://docs.x.immutable.com/docs/immutable-x-sdk
import {AddMetadataSchemaToCollectionParams, CreateCollectionParams, CreateProjectParams, EthAddress, ImmutableMethodParams, ImmutableXClient} from '@imtbl/imx-sdk'
import { Wallet } from '@ethersproject/wallet';
import { AlchemyProvider } from '@ethersproject/providers';
import { Project } from 'model/project';
import env from '../config/imutablex';
import { Collection } from 'model/collecton';
import { MetadataSchema, parseMetadata } from 'model/metadataSchema';
export default class ImutableXSDKService{

  readonly provider:AlchemyProvider;

  constructor(alchemyProvider:AlchemyProvider){
      this.provider = alchemyProvider;
  }

  async getCollection(collectionContractAddress: string) {
    const client = await this.GetImutXClient();
    const params: ImmutableMethodParams.ImmutableGetCollectionParamsTS = {
      address: collectionContractAddress,
    };
    return await client.getCollection(params)
  }

  async getAssets(walletPublicKey: string) {
    const client = await  this.GetImutXClient();
    const params: ImmutableMethodParams.ImmutableGetAssetsParamsTS = {
      user:walletPublicKey
    };
    return await client.getAssets(params);
  }


  async getOrders(walletPublicKey: string) {
    const client = await  this.GetImutXClient();
    const params: ImmutableMethodParams.ImmutableGetOrdersParams = {
      user:walletPublicKey as EthAddress
    };

    return await client.getOrders(params);
  }

  async createCollection(collection: Collection) {

    const wallet = this.GetWallet(collection.walletKey);
    const client = await this.GetImutXClient(wallet);

    const params: CreateCollectionParams = {
      name: collection.name,
      description: collection.description,
      contract_address: collection.smartContractAddress,
      owner_public_key: wallet.publicKey,
      // icon_url: '',
       metadata_api_url: collection.metadataApiUrl,
       collection_image_url: collection.collectionImageUrl,
      project_id: parseInt(collection.projectId, 10),
    };

    let newcollection = await client.createCollection(params);
    return newcollection;
  }


  async createMetadataScehma(schema: MetadataSchema) {
    let metadata = parseMetadata(schema.metadata);
    const wallet = this.GetWallet(schema.key);
        const client = await this.GetImutXClient(wallet);
    const params: AddMetadataSchemaToCollectionParams = {
      metadata: metadata,
    };
  
    const collection = await client.addMetadataSchemaToCollection(
      schema.collectionAddress,
      params,
    );

    return collection;
  }
    

    async createProject(project: Project) {

      const wallet = this.GetWallet(project.walletKey);
        const client = await this.GetImutXClient(wallet);

      /**
       * Edit your values here
       */
      const params: CreateProjectParams = {
        name: project.name,
        company_name: project.companyName,
        contact_email: project.email,
      };

      try {
        await client.createProject(params);
      } catch (error) {
        throw new Error(JSON.stringify(error, null, 2));
      }

      return await client.getProjects();
  }

    async register(walletKey:string){
       
      let existingUser;
      const wallet = this.GetWallet(walletKey);
      const client = await this.GetImutXClient(wallet);

        // Fetching existing user
        existingUser = await client.getUser({
          user: client.address,
        });

        if (existingUser){
          throw new Error('User already exists' + client.address);
        }

        // If user doesnt exist, create user
        await client.registerImx({
          etherKey: client.address,
          starkPublicKey: client.starkPublicKey,  
        });
        console.log("User registered" + client.address)
          
        

        return await client.getProjects();
    }

    async login(key:string){
      const wallet = this.GetWallet(key);
      const client = await this.GetImutXClient(wallet);

      // Fetching existing user
      await client.getUser({
        user: client.address,
      }); // do stuff 

        return await client.getProjects();
            
  }
  private GetWallet(key: string){
    return new Wallet(key).connect(this.provider);
  }

  private async GetImutXClient(signer?:Wallet) {
    return await ImmutableXClient.build({
      ...env.client,
      signer: signer,
    });
  }

}