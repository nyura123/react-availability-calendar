import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.scss';
import { Cal } from './components/Cal';

const App: React.FC<{ calId: string }> = ({ calId }) => {
  return (
    <div>
      <Cal calId={calId} />
    </div>
  );
};

export default App;
