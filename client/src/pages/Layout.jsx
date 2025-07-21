import 'bootstrap/dist/css/bootstrap.min.css';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Post from '../components/Post';

const Layout = () => {
  return (
    <>
      <Row xs={1} className="g-4 pb-5">
        <Col><Post/></Col>
        <Col><Post/></Col>
        <Col><Post/></Col>
      </Row> 
    </>
  )
}

export default Layout;
{/* */}