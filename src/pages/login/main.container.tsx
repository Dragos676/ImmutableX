import * as React from "react";
import { useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import createStyles from "@material-ui/styles/createStyles";
import makeStyles from "@material-ui/styles/makeStyles";
import { NotificationComponent } from "../../common";
import { ActionType, MainComponent } from "./main.component";
import { createImutxLnkService, createImutxService } from "libs/serviceProvider";
import { TextareaAutosize } from "@material-ui/core";

// https://material-ui.com/styles/api/#makestyles-styles-options-hook
const useFormStyles = makeStyles((theme) =>
  createStyles({
    card: {
      maxWidth: 600,
      margin: "0 auto",
    },
  })
);
interface Props {}

export const MainContainer: React.FC<Props> = (props) => {
  const history = useHistory();
  const [alert, setAlert] = React.useState('');
  const [data, setData] = React.useState('');
  const classes = useFormStyles();
  const [service] = React.useState(() => createImutxService());
  const [lnkservice] = React.useState(() => createImutxLnkService());

  const loginSucceeded = (msg: any) => {
    history.push({
      pathname: '/pageLoggedIn',
        state: msg.result
    });
  };

  const handleAction = (componentData:string, type: ActionType) => {
    switch(type){
      case ActionType.Login:{
        service.login(componentData)
          .then((msg:any) =>loginSucceeded(msg))
          .catch((e) => {console.error(e); setAlert(JSON.stringify(e))});
        break;
      }
      case ActionType.Register:{
        history.push('/pageRegister');
        break;
      }
      case ActionType.SellAsset:{
        history.push('/pageSellAsset');
        break;
      }
      case ActionType.GetCollection:{
        service.getCollection(componentData)
        .then((msg:any) => 
          setData(JSON.stringify(msg)))
        .catch((e) => {console.error(e); setAlert(JSON.stringify(e))});
        break;
      }
      case ActionType.GetToken:{
        service.getAssets(componentData)
        .then((msg:any) => 
          setData(JSON.stringify(msg)))
        .catch((e) => {console.error(e); setAlert(JSON.stringify(e))});
        break;
      }
      case ActionType.GetOrders:{
        service.getOrders(componentData)
        .then((msg:any) => 
          setData(JSON.stringify(msg)))
        .catch((e) => {console.error(e); setAlert(JSON.stringify(e))});
        break;
      }
      case ActionType.History:{
        lnkservice.getHistory()
        .then((msg:any) => 
          setData(JSON.stringify(msg)))
        .catch((e) => {console.error(e); setAlert(JSON.stringify(e))});
        break;
      }
      default:
        {
          setAlert("Baga un case nou in main.container handleAction ca nu iti cade mana")
        }
    }
    
  };

  return (
    <>
    
      <Card className={classes.card}>
        <CardHeader title="Welcome to ImutableX POC" />
        <CardContent>
          <MainComponent onAction={handleAction}/>
          <NotificationComponent
            show={alert !== ''}
            message={"Error encountered " + alert }
            onClose={() => setAlert('')}
          />
        </CardContent>
        <CardContent>
          <TextareaAutosize
            maxRows={5}
            value={data}
            style={{ width: 550 }}
            aria-label="maximum height"
            placeholder="Serialized response will be shown here"
          />
        </CardContent>
        
      </Card>
    </>
  );
};

