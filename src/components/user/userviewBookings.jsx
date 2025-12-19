import React, { useState } from "react";
import { Container, Table, Button, Form, Row, Col, Badge } from "react-bootstrap";
import "../../../css/user/userbookings.css";
import { useParams } from "react-router";
import { useEffect } from "react";


export default function UserViewBookings()  {
  const [search, setSearch] = useState("");

    const [userbooking,setbooking]=useState([])


  useEffect(() => {
  const getUserBookings = async () => {
    try {
      const res = await fetch("https://rentgo-backend.onrender.com/user/bookings", {
        credentials: "include",
      });

      const data = await res.json();
      const booking = data.bookings
      setuserbooking(booking)
      if(!data.success){
        alert("something went wrong!!!")
      }
      // if (data.success) {
      //   if (Array.isArray(data.bookings)) {
      //     setbooking(data.bookings);
      //   } else if (data.bookings) {
      //     setbooking([data.bookings]);
      //   } else {
      //     setbooking([]);
      //   }
      // } else {
      //   setbooking([]);
      //   alert("Something went wrong!");
      // }
    } catch (error) {
      console.log(error);
      setbooking([]);
    }
  };

  getUserBookings();
}, []);



  // const filteredData = booking.filter(
  //   (b) =>
  //     b.car.toLowerCase().includes(search.toLowerCase()) ||
  //     b.id.toString().includes(search)
  // );

  return (
    <Container fluid className="booking-wrapper py-4">
    
      <Row className="align-items-center mb-3 g-2">
        <Col xs={12} md={9}>
          <Form.Control
            placeholder="Search for id, name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col xs={12} md={3}>
          <Button className="w-100 search-btn">Search</Button>
        </Col>
      </Row>
      <div className="table-responsive">
        <Table bordered hover className="booking-table text-center align-middle">
          <thead>
            <tr>
              <th>Car</th>
              <th>Price</th>
              <th>Pick Up </th>
              <th>Return </th>
              <th>Status</th>
              {/* <th>Action</th> */}
            </tr>
          </thead>
          <tbody>
            {userbooking?.map((item) => (
              <tr key={item.id}>
                <td>{item.carName}</td>
                <td>₹{item.totalPrice}.00</td>
                <td>{item.pickupDate},{item.pickupTime}</td>
                <td>{item.returnDate},{item.returnTime}</td>
                <td>
                  <Badge bg="success" className="status-badge" defaultValue="Booked">
                    {(item.status?"booked":"cancelled")}
                  </Badge>
                </td>
                {/* <td>
                  <Button size="sm" className="cancel-btn">
                    Cancel
                  </Button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};