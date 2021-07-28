/* eslint-disable react/jsx-filename-extension */
import { Layout } from 'antd';
import { ApolloProvider } from '@apollo/client';
import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import 'antd/dist/antd.css';
import { client } from './ApolloClient/client';
import Member from './Member/Member';
import Members from './Members/Members';

const { Content } = Layout;

function App() {
  return (
    <Layout>
      <Content style={{ minHeight: '100vh' }}>
        <ApolloProvider client={client}>
          <Router>
            <Switch>
              <Route exact path="/members"><Members /></Route>
              <Route path="/member/:id"><Member /></Route>
              <Route path="/"><Members /></Route>
            </Switch>
          </Router>
        </ApolloProvider>
      </Content>
    </Layout>
  );
}

export default App;
