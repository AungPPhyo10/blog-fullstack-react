import 'bootstrap/dist/css/bootstrap.min.css';

import {useParams, Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState} from 'react'; 
import {Navigate} from 'react-router-dom';
import Editor from '../components/Editor';

const Create = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState("");
  const {id} = useParams();

  async function createNewPost(e) {    
    e.preventDefault();

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);

    const response = await fetch('http://localhost:3000/api/posts/'+id, {
      method: 'PUT',
      body: data, 
      credentials: 'include'
    })
    if (response.ok) {
      setRedirect(true)
      
    } else {
        response.json().then(msg => 
            console.log(msg)
        )
        alert('Something went wrong')
    }
  }

  if (redirect) {
    alert('Post updated successfully')
    return <Navigate to={'/'}/>
  }
  return (
    <Form onSubmit={createNewPost} className="p-4 mx-4 mb-4 border border-1 rounded border-secondary">
      <h3 className="d-block my-2 text-primary text-center">Edit Post</h3>
      
      <Form.Group className="mb-3">
        <Form.Label>Blog Title</Form.Label>
        <Form.Control type="text" value={title} required onChange={e => setTitle(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Summary</Form.Label>
        <Form.Control type="text" value={summary} required onChange={e => setSummary(e.target.value)}/>
      </Form.Group>

      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Choose Image</Form.Label>
        <Form.Control type="file" required onChange={e => setFiles(e.target.files)} />
      </Form.Group>

      <Editor content={content} setContent={setContent} required />

      <div className="d-flex justify-content-center">
          <Button type="reset" className="me-3 btn btn-danger">Reset</Button>
          <Button type="submit" className="btn btn-success">Create</Button>
      </div>
      
    </Form>
  )
}

export default Create