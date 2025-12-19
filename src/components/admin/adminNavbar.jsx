import { Link } from 'react-router'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import '../../../css/root.css'
import '../../../css/publicHome/navbar.css'
import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router'




const AdminNavBar = () => {

  const navigate = useNavigate()

  async function AdminLogout(e) {
        
        e.preventDefault();

        try {
            const res =await fetch("https://rentgo-backend.onrender.com/logout/admin",{
                method:"POST",
                credentials:"include"
            })

            const data =await res.json()
            
            if (data.success) {
                alert("do you want to logout?")
                navigate("/")
            } else {
                alert("logout failed!!")
            }
        } catch (error) {
           console.log(error) 
        }
    }


  return (
    <Navbar collapseOnSelect expand="lg" id="navBar">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} id="logoId" alt="Logo" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-lg-end text-end w-100"
        >
          <Nav
            id="navText"
            className="ms-lg-auto d-flex flex-column flex-lg-row align-items-lg-center"
          >
            <Nav.Link as={Link} to="/admin">Home</Nav.Link>
            <Nav.Link as={Link} to="/admin/addcars">Add Cars</Nav.Link>
            <Nav.Link as={Link} to="/admin/cars">Cars</Nav.Link>
            <Nav.Link as={Link} to="/admin/bookings">Bookings</Nav.Link>
            <Nav.Link as={Link} to="/admin/reviews">Review</Nav.Link>
              <button className="logout" onClick={AdminLogout}>LOGOUT</button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
export default AdminNavBar
