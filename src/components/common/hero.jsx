import "../../../css/root.css";
import "../../../css/hero.css";
import carImg from "../../assets/hero-img.png";
import { FaCar, FaCarSide, FaLocationArrow, FaSearchLocation, FaWallet } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router";
import { Container, Row, Col } from "react-bootstrap";
import howImg from "../../assets/how-image.jpg"; 


export default function Hero() {
  return (
    <div>

    
      <section className="hero-container">
        <div className="hero-text">
          <h1 className="hero-title">
            Rent a Car the Fast and Easy
            <br />
            Way with <span className="highlight">RentGo</span>
          </h1>

          <p className="hero-desc">
            Reliable rentals, transparent pricing, and trusted service for every journey.
            <br /> Drive with confidence — anywhere, anytime.
          </p>

          <Link className="rent-btn btn-inline-block d-flex gap-1" as={Link} to="/cars"><FaCar/>Rent Car</Link>
        </div>

        <img src={carImg} alt="Car" className="hero-img" />
      </section>



      <section className="how-section">
        <Container>
          <h2 className="how-title text-center">How It Works</h2>

          <Row className="align-items-center mt-4">
            <Col md={5} className="text-center mb-4 mb-md-0">
              <img src={howImg} alt="Car Interior" className="how-img img-fluid" />
            </Col>

            <Col md={7}>
              <div className="step">
                <div className="step-number">1</div>
                <div>
                  <h4 className="step-title">Browse Cars</h4>
                  <p className="step-desc">Choose from a variety of vehicles that fit your needs.</p>
                </div>
              </div>

              <div className="step">
                <div className="step-number">2</div>
                <div>
                  <h4 className="step-title">Select Dates</h4>
                  <p className="step-desc">Pick your pickup & return dates to continue booking.</p>
                </div>
              </div>

              <div className="step">
                <div className="step-number">3</div>
                <div>
                  <h4 className="step-title">Confirm Booking</h4>
                  <p className="step-desc">Secure your reservation with quick online payment.</p>
                </div>
              </div>

              <div className="step">
                <div className="step-number">4</div>
                <div>
                  <h4 className="step-title">Pick Up & Drive</h4>
                  <p className="step-desc">Collect your car and enjoy your journey.</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>



    <section className="why-section">
      <Container>
        <h2 className="why-title text-center">why choose Us</h2>

        <Row className="text-center mt-4">
          <Col md={4} className="mb-4 d-flex flex-column justify-content-center align-items-center">
            
            <div className="icon-block red-icon"><FaLocationDot/></div>
            <h4 className="why-heading">Availability</h4>
            <p className="why-desc">
              Always Ready When You Are. Large, diverse fleet availability whenever you need it.
            </p>
          </Col>

          <Col md={4} className="mb-4 d-flex flex-column justify-content-center align-items-center">
            <div className="icon-block black-icon"><FaCarSide/></div>
            <h4 className="why-heading">Comfort</h4>
            <p className="why-desc">
              Premium Comfort, Every Time. Clean, modern vehicles for a smooth, stress-free driving experience.
            </p>
          </Col>

          <Col md={4} className="mb-4 d-flex flex-column justify-content-center align-items-center">
            <div className="icon-block blue-icon"><FaWallet/></div>
            <h4 className="why-heading">Savings</h4>
            <p className="why-desc">
              Transparent Pricing, No Surprises. Competitive rates with no hidden fees or unexpected costs.
            </p>
          </Col>
        </Row>
      </Container>
    </section>
 

     </div>
  );
}
