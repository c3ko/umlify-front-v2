import React from 'react';
import './styles/main.scss';
import CodeContainer from './views/containers/CodeContainer';
import UMLContainer from './views/containers/UMLContainer';
import OptionsBar from './views/containers/OptionsBar';

function App() {
  return (
    <div className="App">
        <OptionsBar />
        <div className="main-content">
          <CodeContainer />
          <UMLContainer />
        </div>
    </div>


    
  );
}

export default App;
