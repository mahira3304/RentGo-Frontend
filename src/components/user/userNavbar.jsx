import { Link } from "react-router";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../../../css/root.css";
import "../../../css/user/navbar.css"
import { useEffect, useState } from "react";
import logoImg from "../../assets/logo.png"

const UserNavBar = () => {


  const [user, setUser] = useState(null);

useEffect(() => {
  async function fetchProfile() {
    try {
      const res = await fetch("https://rentgo-backend.onrender.com/user/profile", {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
      }
    } catch (err) {
      console.log(err);
    }
  }
  fetchProfile();
}, []);


  return (
    <Navbar collapseOnSelect expand="lg" id="navBar">
      <Container>

        <Navbar.Brand as={Link} to="/user">
          <img src={logoImg} id="logoId" alt="RentGo Logo" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end w-100"
        >
          <Nav className="align-items-lg-center gap-lg-2">

            <Nav.Link as={Link} to="/user">Home</Nav.Link>
            <Nav.Link as={Link} to="/user/cars">Cars</Nav.Link>
            <Nav.Link as={Link} to="/user/carbooking">Bookings</Nav.Link>
            <Nav.Link as={Link} to="/user/aboutus">About Us</Nav.Link>

            <Nav.Link as={Link} to="/user/profile" className="profile-wrapper">
  {/* {user?.profilePhoto && ( */}
    <img
      src={`https://res.cloudinary.com/dyokhs4yf/image/upload/${user.profilePhoto}`}
      alt="Profile"
      className="profile-avatar"
    />
  {/* )} */}
</Nav.Link>


          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default UserNavBar;
