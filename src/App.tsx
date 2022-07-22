import { UserContainer } from './pages/user/user.container';
import * as React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { MainContainer } from './pages/login/main.container';
import { RegisterContainer } from './pages/register/register.container';
import { ProjectContainer } from 'pages/project/project.container';
import { CollectionContainer } from './pages/collection/collection.container';
import { SelAssetContainer } from 'pages/sellAsset/sellAsset.container';
import { MetadataSchemaContainer } from 'pages/metadataSchema/metadataSchema.continer';
const App = () => {
  return (
    <>
      <HashRouter>
        <Switch>
          <Route exact={true} path="/" component={MainContainer} />
           <Route path="/pageRegister" component={RegisterContainer} /> 
           <Route path="/pageLoggedIn" component={UserContainer} /> 
           <Route path="/pageProject" component={ProjectContainer} /> 
           <Route path="/pageCollection" component={CollectionContainer} /> 
           <Route path="/pageSellAsset" component={SelAssetContainer} /> 
           <Route path="/metadataSchema" component={MetadataSchemaContainer} /> 
        </Switch>
      </HashRouter>
    </>
  );
};

export default App;