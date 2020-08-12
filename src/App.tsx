import React from 'react';
import logo from './logo.svg';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import SignIn from "./components/SignIn/SignIn";
import AskQuestion from "./components/AskQuestion/AskQuestion";
import Question from "./components/Question/Question";

import {store} from "./Store";
import {Provider} from "react-redux";
import SignOut from "./components/SignOut/SignOut";
import {AuthProvider} from "./Auth";
import WithAuth from "./components/WithAuth/WithAuth";

function App() {
  return (
      <Provider store={store}>
          <AuthProvider>
              <BrowserRouter>
                  <div className="App">
                      <Header/>
                      <Switch>
                          <Redirect from="/home" to="/" />
                          <Redirect from="/signin-callback" to="/" />
                          <Redirect from="/signout-callback" to="/" />
                          <Route exact path="/" component={Home}/>
                          <Route path="/signin" component={() => <SignIn action="signin"/>}/>
                          <Route path="/signin-callback" component={() => <SignIn action="signin-callback"/>}/>
                          <Route path="/signout" component={() => <SignOut action='signout'/>}/>
                          <Route path="/signout-callback" component={() => <SignOut action='signout-callback'/>}/>
                          <Route path="/ask" component={AskQuestion}/>
                          <Route path="/questions/:questionId" component={Question}></Route>
                          <Route component = { () => { return <div>Not found</div> }}/>
                      </Switch>
                  </div>
              </BrowserRouter>
          </AuthProvider>
      </Provider>
  );
}

export default App;
