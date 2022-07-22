import { Button, Card, CardContent, CardHeader, makeStyles, TextField } from "@material-ui/core";
import * as React from "react";
import { Link, useHistory } from "react-router-dom";
import createStyles from '@material-ui/styles/createStyles';
import { createEmptyProject, Project } from '../../model/project';
import { createImutxService } from "libs/serviceProvider";
import { NotificationComponent } from "common";


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

const ProjectComponent : React.FC<any> = (props) => {
  const classes = useFormStyles();
  const [project, setUserInfo] = React.useState<Project>(() => createEmptyProject());
  const onTexFieldChange = (fieldId:any) => (e:any) => {
    setUserInfo({
      ...project,
      [fieldId]: e.target.value,
    });
  };

    return (
    <div className={classes.formContainer}>
      <TextField
        label="Project Name"
        margin="normal"
        value={project?.name}
        onChange={onTexFieldChange("name")}
      />
      <TextField
        label="Company Name"
        margin="normal"
        value={project?.companyName}
        onChange={onTexFieldChange("companyName")}
      />
      <TextField
        label="Email"
        margin="normal"
        value={project?.email}
        onChange={onTexFieldChange("email")}
      />
      <TextField
        label="Key"
        margin="normal"
        type="password"
        value={project?.walletKey}
        onChange={onTexFieldChange("privateKey")}
      />
        <Button
        color="primary"
        onClick={() => props.onCreateProject(project)}
      >
        Create new Project
      </Button>
    </div>

    );
}


export const ProjectContainer: React.FC<any> = () => {
  const classes = useFormStyles();
  const [alert, setAlert] = React.useState('');
  const [service] = React.useState(() => createImutxService());
  const history = useHistory();
  
  const createProjectSucceded = (msg: any) => {
    history.push({
      pathname: '/pageLoggedIn',
        state: msg.result
    });
  };

  const handleCreateProject = (project: Project) => {
    service.createProject(project)
    .then((msg:any) =>createProjectSucceded(msg))
    .catch((e) => {console.error(e); setAlert(JSON.stringify(e))});
  };

  return (
    <Card className={classes.card}>
        <CardHeader title="Create Project" />
        <CardContent>
          <ProjectComponent onCreateProject={handleCreateProject}/>
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
