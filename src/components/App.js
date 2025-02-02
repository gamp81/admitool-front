
import './App.css';
import Footer from '../layouts/footer';
import { AuthPovider } from '../context/AuthContext';
import Pagerouter from '../router/pagerouter';

function App() {
  return (
    <AuthPovider future={{ v7_startTransition: true }}>
      <Pagerouter ></Pagerouter>
      <Footer/>
    </AuthPovider>
      
  );
}

export default App;
