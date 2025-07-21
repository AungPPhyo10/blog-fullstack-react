import 'bootstrap/dist/css/bootstrap.min.css';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

const Post = () => {
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
            <Card.Title>Card Title</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              <a href="#" className="author">Josh</a>
              <br/>
              <time>2023-01-06 16:50</time>
            </Card.Subtitle>
            <Card.Text>
              This is a longer card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>

  )
}

export default Post