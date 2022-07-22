//https://docs.x.immutable.com/docs/sdk-api
//https://tools.immutable.com/link-reference/
import { Link } from '@imtbl/imx-sdk'
import { AssetSell } from 'model/assetSell';
export default class ImutableXLNKService{
    private readonly _link : Link;
    /**
     *
     */
    constructor(link : Link) {
        this._link = link  ;
    }

    async getHistory(){
        let result = await this._link.history({})
 
        console.log(result)
        return result;
    }

    async sellAsset(asset:AssetSell){
        let result = await this._link.sell({
            "tokenId": asset.tokenId,
            "tokenAddress": asset.tokenAddress,
            "amount": asset.amount
          })
 
        console.log(result)
        return result;
    }
}