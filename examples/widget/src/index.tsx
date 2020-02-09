import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { EnterInfoProvider } from './enter-info-provider';

const el = document.getElementById('react-availability-calendar-widget');
const calId =
  el?.getAttribute('data-react-availability-calendar-id') ||
  'unknown_react-availability-calendar_id';

ReactDOM.render(
  <EnterInfoProvider>
    <App calId={calId} />
  </EnterInfoProvider>,
  el
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
