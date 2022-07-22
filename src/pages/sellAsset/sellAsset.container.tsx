import { Button, Card, CardContent, CardHeader, makeStyles, TextField } from "@material-ui/core";
import * as React from "react";
import { Link } from "react-router-dom";
import createStyles from '@material-ui/styles/createStyles';
import { NotificationComponent } from "common";
import { createImutxLnkService } from '../../libs/serviceProvider';
import { AssetSell, createEmptyAsset } from "model/assetSell";


const useFormStyles = makeStyles((theme) =>
createStyles({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  card: {
    maxWidth: 400,
    margin: "0 auto",
  }
})
);

const SellAssetComponent : React.FC<any> = (props) => {
  const classes = useFormStyles();
  const [asset, setAsset] = React.useState<AssetSell>(() => createEmptyAsset());
  const onTexFieldChange = (fieldId:any) => (e:any) => {
    setAsset({
      ...asset,
      [fieldId]: e.target.value,
    });
  };

    return (
    <div className={classes.formContainer}>
      <TextField
        label="Token Id"
        margin="normal"
        value={asset?.tokenId}
        onChange={onTexFieldChange("tokenId")}
      />
      <TextField
        label="Token Collection Address"
        margin="normal"
        value={asset?.tokenAddress}
        onChange={onTexFieldChange("tokenAddress")}
      />
      <TextField
        label="Amount (optional)"
        margin="normal"
        value={asset?.amount}
        onChange={onTexFieldChange("amount")}
      />
      
        <Button
        color="primary"
        onClick={() => props.onSellAsset(asset)}
      >
        Sell
      </Button>
    </div>

    );
}


export const SelAssetContainer: React.FC<any> = () => {
  const classes = useFormStyles();
  const [alert, setAlert] = React.useState('');
  const [service] = React.useState(() => createImutxLnkService());
 
  
  const sellAssetSucceded = (msg: any) => {
    setAlert("SUCCESS" + msg)
  };

  const handleSellAsset = (asset: AssetSell) => {
    service.sellAsset(asset)
    .then((msg:any) =>sellAssetSucceded(msg))
    .catch((e) => {console.error(e); setAlert(e)});
  };

  return (
    <Card className={classes.card}>
        <CardHeader title="Sell Asset" />
        <CardContent>
          <SellAssetComponent onSellAsset={handleSellAsset}/>
          <NotificationComponent
            show={alert !== ''}
            message={"Error received: " + alert }
            onClose={() => setAlert('')}
          />
          
          <Link to="/">Go to Login</Link>
        </CardContent>
      </Card>
    
  );
};
