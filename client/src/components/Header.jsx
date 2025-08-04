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
          alert('Access denied!')
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
      alert('Logged out successfully');
      setUserInfo({});
      navigate('/login');
    })
    .catch(error => console.log(error)) 
  }

  return (
    <Navbar className="px-4 pb-4 border-1 header" >
        <Navbar.Brand as={Link} className="fw-bold linker" to="/">
          {/* use as property to make the react-bootstrap components behaviours */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
          </svg>
          Blogzz
        </Navbar.Brand>

        <Nav className="ms-auto">
          {!userInfo.username && (
            <>
              <Nav.Link as={Link} to="/login" className="linker me-1">Login</Nav.Link>
              <Nav.Link as={Link} to="/register" className="linker">Register</Nav.Link>
            </>
          )}
          
          {userInfo.username && (
            <>
              <Nav.Link as={Link} to="create" className="linker me-1">Create Post</Nav.Link>
              <Nav.Link onClick={logout} className="linker me-1 text-danger fw-bold">Log Out</Nav.Link>
            </>
          )}

        </Nav>
    </Navbar>
  )
}

export default Header;