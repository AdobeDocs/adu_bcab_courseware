import React from 'react';
import { Provider, defaultTheme, Grid, View } from '@adobe/react-spectrum';
import ErrorBoundary from 'react-error-boundary';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import SideBar from './SideBar';
import { WelcomeView } from './WelcomeView';
import { CreateView } from './CreateView';
import { ListView } from './ListView';

function App(props) {
  console.log('runtime object:', props.runtime);
  console.log('ims object:', props.ims);

  // use exc runtime event handlers
  // respond to configuration change events (e.g. user switches org)
  props.runtime.on('configuration', ({ imsOrg, imsToken, locale }) => {
    console.log('configuration change', { imsOrg, imsToken, locale });
  });
  // respond to history change events
  props.runtime.on('history', ({ type, path }) => {
    console.log('history change', { type, path });
  });

  return (
    <ErrorBoundary onError={onError} FallbackComponent={fallbackComponent}>
      <Router>
        <Provider theme={defaultTheme} colorScheme={`light`}>
          <Grid areas={['sidebar content']} columns={['256px', '3fr']} rows={['auto']} height="100vh">
            <View gridArea="sidebar" backgroundColor="gray-200" padding="size-200">
              <View position="fixed" width="226px" height="100vh">
                <SideBar />
              </View>
            </View>
            <View gridArea="content">
              <Switch>
                <Route exact path="/">
                  <WelcomeView ims={props.ims} />
                </Route>
                <Route path="/create">
                  <CreateView ims={props.ims} />
                </Route>
                <Route path="/list">
                  <ListView ims={props.ims} />
                </Route>
              </Switch>
            </View>
          </Grid>
        </Provider>
      </Router>
    </ErrorBoundary>
  );

  // Methods

  // error handler on UI rendering failure
  function onError(e, componentStack) {}

  // component to show if UI fails rendering
  function fallbackComponent({ componentStack, error }) {
    return (
      <React.Fragment>
        <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Something went wrong :(</h1>
        <pre>{componentStack + '\n' + error.message}</pre>
      </React.Fragment>
    );
  }
}

export default App;
