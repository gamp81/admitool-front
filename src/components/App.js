import logo from '../logo.svg';
import './App.css';

import Header from './Header';
import AppContent from './AppContent';
import Pagerouter from '../router/pagerouter';

function App() {
  return (
 
      <div className="App">
           
      {/* <Header pageTitle="Frontend authenticated with JWT" logoSrc={logo} /> */}
      <Pagerouter>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <AppContent />
          </div>
        </div>
      </div>
      </Pagerouter>
     
    </div>
      
  );
}

export default App;
