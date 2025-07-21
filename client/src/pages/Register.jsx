import 'bootstrap/dist/css/bootstrap.min.css';

import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handle_register(e) {
    e.preventDefault();

    const response = await fetch('http://localhost:3000/api/register' , {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type':'application/json'}
    })
    console.log(response);
    if (response.status == 200) {
      alert('Registration success! Proceed to login');
    } else alert('Registration failed!')

  }

  return (
    <Form onSubmit={handle_register} className="p-4 mx-4 mb-4 border border-1 rounded border-secondary">
      <h2 className="d-block text-center fw-bold mb-4">Register New Account</h2>
      
      <Form.Group className="mb-3">
        <FloatingLabel label="Enter New Username">
          <Form.Control type="text" placeholder="Enter New Username" value={username} onChange={e => setUsername(e.target.value)}/>
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="mb-3">
        <FloatingLabel label="Enter Password">
          <Form.Control type="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)} />
        </FloatingLabel>
      </Form.Group>

      <div className="d-flex justify-content-center">
        <Button variant="dark" type="submit">Register</Button>
      </div>
    </Form>
  )
}

export default Register