import 'bootstrap/dist/css/bootstrap.min.css';

import {formatISO9075} from 'date-fns';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

const Post = ({title, summary, createdAt, cover, content}) => {
  return (
    <Card border="secondary" className="mb-3 p-2">
      <Row className="g-0">
        <Col md={4}>
          <Card.Img
            src="/vite.svg"
            alt="Card image"
            style={{ height: '100%', objectFit: 'cover' }}
          />
        </Col>
        <Col md={8}>
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              <a href="#" className="author">Josh</a>
              <br/>
              <time>
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