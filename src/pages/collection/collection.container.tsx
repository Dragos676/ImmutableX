import { Button, Card, CardContent, CardHeader, makeStyles, TextField, Typography } from "@material-ui/core";
import * as React from "react";
import { Link, useHistory } from "react-router-dom";
import createStyles from '@material-ui/styles/createStyles';
import { createImutxService } from "libs/serviceProvider";
import { NotificationComponent } from "common";
import { Collection, createEmptyCollection } from '../../model/collecton';


const useFormStyles = makeStyles((theme) =>
createStyles({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  card: {
    maxWidth: 700,
    margin: "0 auto",
  }
})
);

const CollectionComponent : React.FC<any> = (props) => {
  const classes = useFormStyles();
  const [collection, setCollection] = React.useState<Collection>(() => createEmptyCollection());
  const onTexFieldChange = (fieldId:any) => (e:any) => {
    setCollection({
      ...collection,
      [fieldId]: e.target.value,
    });
  };

    return (
    <div className={classes.formContainer}>
      <TextField
        label="Collection Name"
        margin="normal"
        value={collection?.name}
        onChange={onTexFieldChange("name")}
      />
      <TextField
        label="Description"
        margin="normal"
        value={collection?.description}
        onChange={onTexFieldChange("description")}
      />
      <TextField
        label="Project Id"
        margin="normal"
        value={collection?.projectId}
        onChange={onTexFieldChange("projectId")}
      />
      <TextField
        label="Smart Contract Address"
        margin="normal"
        value={collection?.smartContractAddress}
        onChange={onTexFieldChange("smartContractAddress")}
      />
      <TextField
        label="Collection Image URL"
        margin="normal"
        value={collection?.collectionImageUrl}
        onChange={onTexFieldChange("collectionImageUrl")}
      />
      <TextField
        label="Metadata Api URL (link to folder where metadata lies)"
        margin="normal"
        value={collection?.metadataApiUrl}
        onChange={onTexFieldChange("metadataApiUrl")}
      />
      
      <TextField
        label="Key"
        margin="normal"
        type="password"
        value={collection?.walletKey}
        onChange={onTexFieldChange("key")}
      />
        <Button
        color="primary"
        onClick={() => props.onCreate(collection)}
      >
        Create new Collection
      </Button>
    </div>

    );
}


export const CollectionContainer: React.FC<any> = () => {
  const classes = useFormStyles();
  const [alert, setAlert] = React.useState('');
  const [service] = React.useState(() => createImutxService());
  const history = useHistory();
  
  const createCollectionSucceded = (msg: any) => {
    history.push({
      pathname: '/pageLoggedIn',
        state: msg.result
    });
  };

  const handleCreate = (collection: Collection) => {
    service.createCollection(collection)
    .then((msg:any) =>createCollectionSucceded(msg))
    .catch((e) => {console.error(e); setAlert(JSON.stringify(e))});
  };

  return (
    <Card className={classes.card}>
        <CardHeader title="Create Collection" />
        <CardContent> 
          <Typography>To create smart contract, get this Repo and follow ReadMe . </Typography>
          <Typography>Make sure to change "hardhat": "^2.0.1","typescript": "^4.7.4"</Typography>
          <a href="https://github.com/immutable/imx-contracts">Link to Repo</a>
        </CardContent>
        <CardContent>
          <CollectionComponent onCreate={handleCreate}/>
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
