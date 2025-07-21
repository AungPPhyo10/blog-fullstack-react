import './css/App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';

import {Route, Routes} from 'react-router-dom';
import {UserContextProvider} from './context/UserContext.jsx';
import Layout from './pages/Layout';
import Login from './pages/Login';
import Create from './pages/Create';
import Register from './pages/Register'
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
      <main>
        <UserContextProvider>
          <Header/>
          <Routes>
            <Route path="/" element={<Layout/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/create" element={<Create/>} />
            <Route path="/register" element={<Register/>} />
          </Routes>
          <Footer/>
        </UserContextProvider>
        
      </main>
  )
}

export default App;
