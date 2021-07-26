import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { StartPage } from './pages/start/StartPage';
import Layout, { Content } from 'antd/lib/layout/layout';
import 'antd/dist/antd.css'
import { Provider } from 'react-redux';
import store from './redux/store';
import { ColumnBuilderPage } from './pages/column-builder/ColumnBuilderPage';
import { FinishPage } from './pages/finish/FinishPage';

const App = () => {
  return (
    <Provider store={store}>
      <Layout style={{ minHeight: '100vh' }}>
        <Content style={{ minHeight: '100vh' }}>
          <Router>
            <Route exact path="/columnBuilder" component={ColumnBuilderPage} />
            <Route exact path="/finish" component={FinishPage} />
            <Route exact path="/" component={StartPage} />
          </Router>
        </Content>
      </Layout>
    </Provider>
  );
}

export default App;