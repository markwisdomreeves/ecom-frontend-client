import React from 'react';
import { Container, Row, Col, Button } from "react-bootstrap";
import { GiSatelliteCommunication } from "react-icons/gi";
import { Link } from "react-router-dom";


const Footer = () => {
    return (
        <footer className="footer-color" id="footer-bottom">
            <Container>
                <Row>
                    <Col className="text-center py-3 footer-custom-style" variant="danger" sm={12} md={6}>
                      <Link to="/" className="footer-icon">
                        <GiSatelliteCommunication />
                      </Link>
                        <p>Copyright &copy; Ecom Shopping</p>
                    </Col>

                    <Col className="text-center py-3 footer-custom-new-letter" sm={12} md={6}>
                      <Button href="/newletter-signup" className="new-letter-btn" variant="info">
                          News Letter
                      </Button>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}


export default Footer
