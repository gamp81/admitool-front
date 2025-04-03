
import '../style/App.css';
import Footer from '../layouts/footer';
import { AuthProvider } from '../context/AuthContext';
import Pagerouter from '../router/pagerouter';

function App() {
  return (
    <AuthProvider future={{ v7_startTransition: true }}>
      <Pagerouter ></Pagerouter>
      <Footer/>
    </AuthProvider>
      
  );
}

export default App;
