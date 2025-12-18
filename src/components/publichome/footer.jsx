import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router";
import { FaFacebookF, FaInstagram, FaTwitter, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";
import '../../../css/root.css'
import "../../../css/publicHome/footer.css"
import logo from '../../assets/logo.png'


const Footer = () => {
  return (
    <footer className="footer-section">
      <Container>
        <Row className="gy-4 ">

       
          <Col md={4}>
            <div className="footer-logo">
              <img
                src={logo} 
                alt="RentGo Logo"
                className="footer-logo-img"
              />
           
            </div>

            <p className="footer-desc">
              Reliable rentals, transparent pricing, and trusted service for every journey.
              Drive with confidence — anywhere, anytime.
            </p>

            <div className="footer-socials">
              <FaFacebookF />
              <FaInstagram />
              <FaWhatsapp />
              <FaTwitter />
            </div>
          </Col>

          <Col md={4}>
            <h5 className="footer-heading">Useful links</h5>
            <div className="footer-links">
                <Link as={Link} to="/">Home</Link>
                <Link as={Link} to="/aboutus">About Us</Link>
                <Link as={Link} to="/cars">Cars</Link>            
            </div>
          </Col>

          <Col md={4}>
            <h5 className="footer-heading">Contact</h5>

            <a href="tel:+1234567890" className="footer-contact"><FaPhoneAlt />+1234567890</a>
            <a href="mailto:laputa@gmail.com" className="footer-contact"><FaEnvelope />rentgo@gmail.com</a>
            <p className="footer-contact"><FaMapMarkerAlt /> Oxford Ave. Cary, NC 27511</p>
          </Col>
        </Row>

        <hr className="footer-divider" />

        <p className="footer-copy">
          © 2025 RentGo. All rights reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
