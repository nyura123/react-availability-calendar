import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.scss';
import { Cal } from './components/Cal';

const App: React.FC<{ calId: string }> = ({ calId }) => {
  console.log('initialized with calId=', calId);

  return (
    <div style={{ width: 350 }}>
      <Cal calId={calId} />
    </div>
  );
};

export default App;
