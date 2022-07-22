import { Button, Card, CardContent, CardHeader, makeStyles, TextareaAutosize, TextField } from "@material-ui/core";
import * as React from "react";
import { Link, useHistory } from "react-router-dom";
import createStyles from '@material-ui/styles/createStyles';
import { createImutxService } from "libs/serviceProvider";
import { NotificationComponent } from "common";
import { MetadataSchema } from "model/metadataSchema";
import { createEmptySchema } from '../../model/metadataSchema';


const useFormStyles = makeStyles((theme) =>
createStyles({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  card: {
    maxWidth: 550,
    margin: "0 auto",
  }
})
);

const MetadataSchemaComponent : React.FC<any> = (props) => {
  const classes = useFormStyles();
  const [schema, setSchema] = React.useState<MetadataSchema>(() => createEmptySchema());
  const onTexFieldChange = (fieldId:any) => (e:any) => {
    setSchema({
      ...schema,
      [fieldId]: e.target.value,
    });
  };

    return (
    <div className={classes.formContainer}>

      
      <TextField
        label="Collection Address"
        margin="normal"
        value={schema?.collectionAddress}
        onChange={onTexFieldChange("collectionAddress")}
      />
      <TextField
        label="Key"
        margin="normal"
        type="password"
        value={schema?.key}
        onChange={onTexFieldChange("key")}
      />

      <TextareaAutosize
            maxRows={8}
            value={schema?.metadata}
            onChange={onTexFieldChange("metadata")}
            style={{ width: 500 }}
            aria-label="maximum height"
            placeholder="Json array of type {name, type}"
          />
      
        <Button
        color="primary"
        onClick={() => props.onCreateMetadataSchema(schema)}
      >
        Create new Metadata Schema
      </Button>
    </div>

    );
}


export const MetadataSchemaContainer: React.FC<any> = () => {
  const classes = useFormStyles();
  const [alert, setAlert] = React.useState('');
  const [service] = React.useState(() => createImutxService());
  const history = useHistory();
  
  const createSucceded = (msg: any) => {
    history.push({
      pathname: '/pageLoggedIn',
        state: msg.result
    });
  };

  const handleCreateMetadataSchema = (schema: MetadataSchema) => {
    service.createMetadataScehma(schema)
    .then((msg:any) =>createSucceded(msg))
    .catch((e) => {console.error(e); setAlert(JSON.stringify(e))});
  };

  return (
    <Card className={classes.card}>
        <CardHeader title="Create Metadata Schema" />
        <CardContent>
          <MetadataSchemaComponent onCreateMetadataSchema={handleCreateMetadataSchema}/>
          <NotificationComponent
            show={alert !== ''}
            message={"Error received: " + alert }
            onClose={() => setAlert('')}
          />
          
          <Link to="/">Go to Main</Link>
        </CardContent>
      </Card>
    
  );
};
