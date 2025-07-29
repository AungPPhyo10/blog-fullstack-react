import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import {UserContext} from '../context/UserContext.jsx';
import {useNavigate} from 'react-router-dom';

const Header = () => {
  const {userInfo, setUserInfo} = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/api/profile', {
      method: 'GET',
      credentials: 'include',
    })
    .then(response => {
      response.json().then(userInfo => {
        if (userInfo.message == "Token invalid") {
          alert('Invalid token detected! Log in again')
          navigate('/login');
        } else if (userInfo.message == "No token found") {
          navigate('/login');
        } else
          setUserInfo(userInfo)
      })
    })

  }, [])

  // log out functionality
  function logout() {
    fetch('http://localhost:3000/api/logout', {
      method: 'GET',
      credentials: 'include'
    })
    .then(() => {
      alert('Logout successful');
      setUserInfo(null);
      navigate('/login');
    })
    .catch(error => console.log(error)) 
  }

  return (
    <Navbar className="px-4 pb-4 border-1 header" >
        <Navbar.Brand as={Link} className="fw-bold linker" to="/">
          Blogzz
        </Navbar.Brand>
        <Nav className="ms-auto">
          {/* use as property to make the react-bootstrap components behaviours */}
          
          {userInfo.username && (
            <>
              <Nav.Link as={Link} to="create" className="linker me-1">Create Post</Nav.Link>
              <Nav.Link onClick={logout} className="linker me-1 text-danger fw-bold">Log Out</Nav.Link>
            </>
          )}

          {!userInfo.username && (
            <>
              <Nav.Link as={Link} to="/login" className="linker me-1">Login</Nav.Link>
              <Nav.Link as={Link} to="/register" className="linker">Register</Nav.Link>
            </>
          )}

        </Nav>
    </Navbar>
  )
}

export default Header;