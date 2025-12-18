import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Table, Button, Form, Row, Col } from "react-bootstrap";
import "../../../css/admin/adminBookings.css";

const AdminBookings = () => {
   const [bookings,setbookings]= useState([])
    const navigate = useNavigate()
 


  useEffect(()=>{
    const getAdminBookings = async()=> {
      try {
          const res = await fetch(`http://localhost:3000/admin/bookings`,
            {credentials: "include"}
          );
          const data = await res.json();
          const bookings = data.bookings
          setbookings(bookings)
          console.log(bookings)
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
    getAdminBookings()
  },[])

  
  const handleStatusClick = async (bookingId, index) => {
    const confirmCancel = window.confirm("Cancel this booking?");
    if (!confirmCancel) return;

    try {
      const res = await fetch(
        `http://localhost:3000/admin/cancel-booking/${bookingId}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data.success) {
        const updatedBookings = [...bookings];
        updatedBookings[index].status = false;
        setbookings(updatedBookings); 
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="booking-page w-100">
      <Container fluid>

        <Row className="search-row align-items-center">
          <Col md={8}>
            <Form.Control
              className="search-input"
              placeholder="Search for id, name product"
            />
          </Col>

          <Col md={4} className="search-actions">
            <Button className="search-btn">Search</Button>

            <Form.Select className="filter-dropdown">
              <option>Filter</option>
              <option value="car">Car Name</option>
              <option value="pickup">PickUp Date</option>
              <option value="return">Return Date</option>
              <option value="booked">Booked</option>
              <option value="cancelled">Cancelled</option>
            </Form.Select>
          </Col>
        </Row>

        <div className="table-wrapper">
          <Table bordered responsive className="booking-table">
            <thead>
              <tr>
                {/* <th>Booking ID</th> */}
                <th>Customer</th>
                <th>Car</th>
                <th>Price</th>
                <th>PickUp Date</th>
                <th>Return Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody id="table-background">
              {bookings?.map((item, index) => (
                <tr key={item.id}>
                  {/* <td>{item.id}</td> */}
                  <td>{item.name}</td>
                  <td>{item.carName}</td>
                  <td>{item.totalPrice}</td>
                  <td>{item.pickupDate}</td>
                  <td>{item.returnDate}</td>

                  <td>
                    <Button
                      className={item.status ? "status-booked" : "status-cancelled"}
                      onClick={() => handleStatusClick(item._id, index)}
                      disabled={!item.status}
                      // defaultValue={}
                    >
                      {item.status ? "Booked" : "Cancelled"}
                    </Button>

                  </td>

                  <td>
                    <Button className="view-btn"  as={Link} to={`/admin/viewbooking/${item.id}`}>View</Button>
                    {/* <Link to="/admin/viewbooking"> <Button className="view-btn">View</Button></Link> */}

                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

      </Container>
    </div>
  );
};

export default AdminBookings;
