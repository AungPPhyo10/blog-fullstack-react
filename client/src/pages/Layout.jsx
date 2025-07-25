import 'bootstrap/dist/css/bootstrap.min.css';

import {useState, useEffect} from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Post from '../components/Post';

const Layout = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/posts')
    .then(response => {
      response.json()
        .then(posts => {
          setPosts(posts)
        })
    })
  }, [])
  

  return (
    <>
      <Row xs={1} className="g-4 pb-5">
        {
          posts.length == 0 ? <div className="d-block p-2 text-center text-danger">No Posts here yet...</div> :
          posts.map(post => 
            <Col><Post {...post}/></Col>
          )
        }
      </Row> 
    </>
  )
}

export default Layout;