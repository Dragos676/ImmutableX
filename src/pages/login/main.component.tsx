import * as React from "react";
import makeStyles from "@material-ui/styles/makeStyles";
import createStyles from "@material-ui/styles/createStyles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { createEmptyLogin } from "../../model/login";
import { useHistory } from "react-router-dom";




export enum ActionType {
  Login,
  Register,
  GetCollection,
  GetToken,
  GetOrders,
  History,
  SellAsset
}

interface PropsForm {
  onAction: (data: string, actionType:ActionType) => void;
}

// https://material-ui.com/styles/api/#makestyles-styles-options-hook
const useFormStyles = makeStyles((theme: any) =>
  createStyles({
    formContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
  })
);

export const MainComponent: React.FC<PropsForm> = (props) => {
  const { onAction } = props;
  const [data, setData] = React.useState<string>(
    createEmptyLogin().key //just to make my life easier, set private key here 
  );
  const history = useHistory();
  const classes = useFormStyles();
  const onTexFieldChange = (e:any) => {
    setData(e.target.value);
  };

  return (
    <div className={classes.formContainer}>
      <TextField
        label="Data"
        margin="normal"
        value={data}
        onChange={onTexFieldChange}
      />
      <Button
        color="primary"
        onClick={() => onAction(data, ActionType.Login)}
      >
        Get User Projects (set wallet private key)
      </Button>
      <Button
        color="primary"
        onClick={() => onAction(data, ActionType.GetCollection)}
      >
        Get User Collection (set collection address)
      </Button>
      <Button
        color="primary"
        onClick={() => onAction(data, ActionType.GetToken)}
      >
        Get User NFTs (set wallet public key)
      </Button>
      <Button
        color="primary"
        onClick={() => onAction(data, ActionType.GetOrders)}
      >
        Get User Orders (set wallet public key)
      </Button>
      <Button
        color="secondary"
        onClick={() => onAction(data, ActionType.History)}
      >
        Get User History LNK
      </Button>
      <Button
        color="primary"
        onClick={() => onAction(data, ActionType.Register)}
      >
        Register new user
      </Button>
      <Button
        color="secondary"
        onClick={() => onAction(data, ActionType.SellAsset)}
      >
        Sell asset
      </Button>
      <Button
        color="primary"
        onClick={() => history.push('/pageProject')}
      >
        Create Project
      </Button>
      <Button
        color="primary"
        onClick={() => history.push('/pageCollection')}
      >
        Create Collection
      </Button>
      <Button
        color="primary"
        onClick={() => history.push('/metadataSchema')}
      >
        Add Metadata Schema
      </Button>
    </div>
  );
};
