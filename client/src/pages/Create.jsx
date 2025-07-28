import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState, useEffect, useContext} from 'react'; 
import {Navigate} from 'react-router-dom';

import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean']
  ],
}

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'indent',
  'link', 'image'
]

const Create = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState("");

  async function createNewPost(e) {    
    e.preventDefault();

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);

    const response = await fetch('http://localhost:3000/api/posts', {
      method: 'POST',
      body: data, 
      credentials: 'include'
    })
    if (response.ok) {
      setRedirect(true)
      
    } else alert('Something went wrong')
  }

  if (redirect) {
    alert('Post created successfully')
    return <Navigate to={'/'}/>
  }
  return (
    <Form onSubmit={createNewPost} className="p-4 mx-4 mb-4 border border-1 rounded border-secondary">

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

      <ReactQuill className="mb-4" 
        value={content} 
        modules={modules} 
        formats={formats}
        onChange={newValue => setContent(newValue)}
      />

      <div className="d-flex justify-content-center">
          <Button type="reset" className="me-3 btn btn-danger">Reset</Button>
          <Button type="submit" className="btn btn-success">Create</Button>
      </div>
      
    </Form>
  )
}

export default Create