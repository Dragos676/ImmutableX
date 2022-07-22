import * as React from "react";
import { useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import createStyles from "@material-ui/styles/createStyles";
import makeStyles from "@material-ui/styles/makeStyles";
import { NotificationComponent } from "../../common";
import { AlchemyProvider } from "@ethersproject/providers";
import env from '../../config/imutablex';
import ImutableXSDKService from "../../services/ImutableXSDKService";
import { RegisterComponent } from "./register.component";
import { Register } from "model/register";

// https://material-ui.com/styles/api/#makestyles-styles-options-hook
const useFormStyles = makeStyles((theme) =>
  createStyles({
    card: {
      maxWidth: 400,
      margin: "0 auto",
    },
  })
);
interface Props {}

export const RegisterContainer: React.FC<Props> = (props) => {
  const history = useHistory();
  const [alert, setAlert] = React.useState('');
  const classes = useFormStyles();
  const [service] = React.useState(() => createImutxService());

  const registerSucceeded = (msg: any) => {
    debugger;
    history.push({
      pathname: '/pageLoggedIn',
        state: msg.result
    });
  };

  const handleRegister = (register: Register) => {

    service.register(register.privateKey)
            .then((msg:any) =>registerSucceeded(msg))
            .catch((e) => {console.error(e); setAlert(JSON.stringify(e))});
  };

  return (
    <>
      <Card className={classes.card}>
        <CardHeader title="Register" />
        <CardContent>
          <RegisterComponent onRegister={handleRegister} />
          <NotificationComponent
            show={alert !== ''}
            message={"Unable to register " + alert }
            onClose={() => setAlert('')}
          />
        </CardContent>
      </Card>
    </>
  );
};


function createImutxService() {
  const alchemyProvider = new AlchemyProvider(env.ethNetwork, env.alchemyApiKey);
  return new ImutableXSDKService(alchemyProvider);
}

