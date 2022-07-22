import { Card, CardContent, CardHeader, makeStyles, TextareaAutosize, TextField } from "@material-ui/core";
import * as React from "react";
import {  Link } from "react-router-dom";
import createStyles from '@material-ui/styles/createStyles';


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

const UserComponent : React.FC<any> = (props) => {
  const classes = useFormStyles();
  

    return (
    <div className={classes.formContainer}>
      <TextField
        label="Project Id"
        margin="normal"
        value={props.userInfo?.id}
        disabled
      />
      <TextField
        label="Name"
        margin="normal"
        value={props.userInfo?.name}
        disabled
      />
      <TextField
        label="Company Name"
        margin="normal"
        value={props.userInfo?.company_name}
        disabled
      />
      <br/>
      <TextareaAutosize
  maxRows={4}
  aria-label="maximum height"
  placeholder="Maximum 4 rows"
  defaultValue={JSON.stringify(props.userInfo)}
/>
    </div>

    );
}


export const UserContainer: React.FC<any> = (props) => {
  const classes = useFormStyles();
  
  return (
    <Card className={classes.card}>
        <CardHeader title="User Info" />
        {props.location.state?.map((item:any,index:number)=>{
         return <CardContent key={index}>
                   <UserComponent  userInfo={item} />
              </CardContent>
       })}

      <Link to="/">Go to Main</Link>
        
      </Card>
    
  );

};
