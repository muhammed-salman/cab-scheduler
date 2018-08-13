import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.scss';

import reducers from './reducers';
import AppContainer from './components/AppContainer';
import Welcome from './components/Welcome';
import Signup from './components/auth/Signup';
import Signout from './components/auth/Signout';
import Signin from './components/auth/Signin';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';


const store = createStore(
  reducers,
  {
    auth: { authenticated: {
      token: localStorage.getItem('token'),
      email: localStorage.getItem('email')
    } }
  },
  applyMiddleware(reduxThunk)
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <AppContainer>
        <Route path="/" exact component={Welcome} />
        <Route path="/signup" component={Signup} />
        <Route path="/scheduler" component={App} />
        <Route path="/signout" component={Signout} />
        <Route path="/signin" component={Signin} />
      </AppContainer>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root')
);

registerServiceWorker();
