import 'bootstrap/dist/css/bootstrap.min.css';

import {useState, useContext} from 'react';
import {Navigate} from 'react-router-dom';
import {UserContext} from '../context/UserContext.jsx';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const {userInfo, setUserInfo} = useContext(UserContext);

  async function handle_login(e) {
    e.preventDefault();

    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type':'application/json'},
      credentials: 'include'
    })
    
    const result = await response.json();

    if (!response.ok) {
      alert(result.message || 'Unknown error occurred');
    } else {
      alert('Login successful');
      setUserInfo(result);
      setRedirect(true);
    }

  }

  if (redirect) {
    return <Navigate to={'/'} />
  }
  return (
    <Form onSubmit={handle_login} className="p-4 mx-4 mb-4 border border-1 rounded border-secondary bg-light">
      <h2 className="d-block text-center fw-bold mb-4">Login</h2>

      <Form.Group className="mb-3">
        <FloatingLabel label="Username">
          <Form.Control type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}/>
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="mb-3">
        <FloatingLabel label="Password">
          <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
        </FloatingLabel>
      </Form.Group>

      <div className="d-flex justify-content-center">
        <Button type="submit" className="btn btn-primary">Login</Button>
      </div>
    </Form>
  )
}

export default Login