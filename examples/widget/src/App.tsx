import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.scss';
import { Cal } from './components/Cal';

const App: React.FC<{ widgetId?: string }> = ({ widgetId }) => {
  console.log('initialized with widgetId=', widgetId);

  return (
    <div style={{ width: 350 }}>
      <Cal />
    </div>
  );
};

export default App;
