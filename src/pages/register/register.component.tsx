import * as React from "react";
import makeStyles from "@material-ui/styles/makeStyles";
import createStyles from "@material-ui/styles/createStyles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Register, createEmptyRegister } from '../../model/register';
import { Link } from "react-router-dom";

interface PropsForm {
  onRegister: (register: Register) => void;
}

// https://material-ui.com/styles/api/#makestyles-styles-options-hook
const useFormStyles = makeStyles((theme) =>
  createStyles({
    formContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
  })
);

export const RegisterComponent: React.FC<PropsForm> = (props) => {
  const {  onRegister } = props;
  const [registerInfo, setRegisterInfo] = React.useState<Register>(
    createEmptyRegister()
  );
  const classes = useFormStyles();
  const onTexFieldChange = (fieldId:any) => (e:any) => {
    setRegisterInfo({
      ...registerInfo,
      [fieldId]: e.target.value,
    });
  };

  return (
    <div className={classes.formContainer}>
      <TextField
        label="Private Key"
        margin="normal"
        type="password"
        value={registerInfo.privateKey}
        onChange={onTexFieldChange("privateKey")}
      />
      <div>Note : these two below are being used at each call as well as gas price, gas limit </div>
       <TextField
        label="Stark Contract Address"
        margin="normal"
        value={registerInfo.starkContractAddress}
        onChange={onTexFieldChange("starkContractAddress")}
        disabled
      />
      <TextField
        label="Registration Contract Address"
        margin="normal"
        value={registerInfo.registrationContractAddress}
        onChange={onTexFieldChange("registrationContractAddress")}
        disabled
      />
      
      <Button
        color="primary"
        onClick={() => onRegister(registerInfo)}
      >
        Register
      </Button>

      <Link to="/">Go to Login</Link>
    </div>
  );
};
