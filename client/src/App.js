import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

// import Detail from "./pages/Detail";
import Routes from "./pages/Routes";
// import NoMatch from "./pages/NoMatch";
import Faq from "./pages/Faq";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Profile from "./pages/Profile";
import Tickets from "./pages/Store";
import { Provider } from "react-redux";
import store from "./utils/store";

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem('id_token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
  uri: '/graphql',
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Provider store={store}>
            <Nav />
            <Switch>
              <Route exact path="/faq" component={Faq} />
              <Route exact path="/store" component={Tickets} />
              <Route exact path="/routes" component={Routes} />
              <Route exact path="/profile" component={Profile} />
              <Route component={Home} />
            </Switch>
          </Provider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
