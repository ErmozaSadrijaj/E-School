import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

function Footer(){
    return(
        <>
            <footer className="bg-dark text-light py-3">
      <Container>
        <Row>
          <Col xs={12} md={4} className="text-center text-md-left">
            <p className="m-0">All rights reserved</p>
          </Col>
          <Col xs={12} md={4} className="text-center">
            <p className="m-0">Gjimnazi Bedri Pejani</p>
          </Col>
          <Col xs={12} md={4} className="text-center text-md-right">
            <a href="https://www.facebook.com/"><FaFacebook className="text-light mx-3" size={24} /></a>
            <a href="https://www.instagram.com/"><FaInstagram className="text-light mx-3" size={24} /></a>
          </Col>
        </Row>
      </Container>
    </footer>
        </>
    )
}

export default Footer;