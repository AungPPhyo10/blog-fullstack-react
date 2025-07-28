import 'bootstrap/dist/css/bootstrap.min.css';

import { Link } from 'react-router-dom';
import {formatISO9075} from 'date-fns';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

const Post = ({title, summary, cover, author, createdAt, _id}) => {
  return (
    <Card border="secondary" className="mb-3 p-2">
      <Row className="g-0">
        <Col md={4}>
          <Link to={`/post/${_id}`}>
            <Card.Img
            src={'http://localhost:3000/'+cover}
            alt="Blog Image"
            style={{ height: '100%', objectFit: 'cover' }}
          />
          </Link> 
        </Col>
        <Col md={8}>
          <Card.Body>
            <Card.Title className="fw-bold">{title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              <p href="#" className="author text-primary">
                {author.username}
              </p>
              <time className="text-danger">
                { formatISO9075(new Date(createdAt)) }  
              </time>
            </Card.Subtitle>
            <Card.Text>
              {summary}
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>

  )
}

export default Post