import logo from '../logo.svg';
import './App.css';

import Header from './Header';

import Pagerouter from '../router/pagerouter';

function App() {
  return (
    /*  <div className="App"> */
      <Pagerouter future={{ v7_startTransition: true }}>
      </Pagerouter>
     
   /*  </div> */
      
  );
}

export default App;
