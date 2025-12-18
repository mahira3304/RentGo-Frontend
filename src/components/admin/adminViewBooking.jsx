import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../../../css/admin/adminViewBooking.css";
import { Modal } from "react-bootstrap";
  
const AdminViewBooking=()=> {

   const [userbooking,setuserbooking]=useState([])
    const {id} = useParams()
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  
  const openModal = (url) => {
    setImageUrl(url);
    setShowModal(true);
  };
  
  
    useEffect(()=>{
        const getBooking = async()=> {
          try {
              const res = await fetch(`http://localhost:3000/admin/viewbooking/${id}`,
                {credentials: "include"}
              );
              const data = await res.json();
              const booking = data.booking
              setuserbooking(booking)
              if(!data.success){
                alert("something went wrong!!!")
              }
              // else{
              //   alert("something went wrong!!!")
              // }
          } catch (error) {
              console.log(error)
          } 
        }
        getBooking()
      },[])
  
  return (
    <Container fluid className="booking-page d-flex align-items-center justify-content-center">
      <Form method="post" className="booking-card w-100">
        <h4 className="booking-title text-center mb-4">BOOKING DETAILS</h4>

        <Row className="booking-content">
          <Col xs={12} md={6}>
            <p><span>Customer Name</span>{userbooking?.name}</p>
            <p><span>Phone Number</span>{userbooking?.phoneNumber}</p>
            <p><span>Email</span>{userbooking?.email}</p>
            <p><span>Car</span> {userbooking?.carName}</p>
            <p><span>Model Name</span> {userbooking?.Model}</p>
            <p><span>Model Year</span> {userbooking?.Year}</p>
            <p><span>Registration Number</span> {userbooking?.registrationNumber}</p>
          </Col>

          <Col xs={12} md={6}>
            <p><span>Pickup Date</span> {userbooking?.pickupDate}</p>
             <p><span>Pickup Time</span> {userbooking?.pickupTime}</p>
            <p><span>Return Date </span> {userbooking?.returnDate}</p>
             <p><span>Return Time</span> {userbooking?.returnTime}</p>
            <p><span>License</span> {userbooking?.license}</p>
            <p><span>ID Proof</span> {userbooking?.adhaar}</p>
            <p><span>Payment Status</span> {userbooking?.payment}</p>
            <p><span>Price</span> {userbooking?.totalPrice}</p>
            <p>Driving Licence</p>
              <Button
                size="sm"
                className="view-btn"
                onClick={() =>
                  openModal(
                    `https://res.cloudinary.com/dyokhs4yf/image/upload/${userbooking?.licenseImg}`
                  )
                }
              >
                View
              </Button>

              <p>Aadhaar</p>
              <Button
                size="sm"
                className="view-btn"
                onClick={() =>
                  openModal(
                    `https://res.cloudinary.com/dyokhs4yf/image/upload/${userbooking?.adhaarImage}`
                  )
                }
              >
                View
              </Button>
          </Col>
        </Row>

        <div className="text-center mt-4">
          <Link type="submit" className="confirm-btn"   as={Link} to="/admin/bookings">
            Confirm
          </Link>
        </div>
      </Form>

        <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="sm"
      >
        <Modal.Body className="text-center">
          <img
            src={imageUrl}
            alt="Document"
            style={{ width: "100%", borderRadius: "8px" }}
          />
        </Modal.Body>
      </Modal>
    </Container>

    
  );
}


export default AdminViewBooking;
