/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';
import HomePage2 from './containers/HomePage2';
import Notes from './containers/Note';
import Editor from './containers/Editor';

// Lazily load routes and code split with webpack
const LazyCounterPage = React.lazy(() =>
  import(/* webpackChunkName: "CounterPage" */ './containers/CounterPage')
);

const CounterPage = (props: Record<string, any>) => (
  <React.Suspense fallback={<h1>Loading...</h1>}>
    <LazyCounterPage {...props} />
  </React.Suspense>
);

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path={routes.COUNTER} component={CounterPage} />
        <Route path={routes.EDITOR} component={Editor} />
        <Route path={routes.NOTES} component={Notes} />
        {/*
        <Route path={routes.HOME} component={HomePage} />
        */}
        <Route path={routes.HOME2} component={HomePage2} />
      </Switch>
    </App>
  );
}
