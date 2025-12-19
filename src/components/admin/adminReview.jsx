import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Table, Form, Button, InputGroup, Dropdown } from "react-bootstrap";
import "../../../css/admin/adminreview.css";
import { useNavigate } from "react-router-dom";

export default function AdminReview() {
  const [userreview,setuserreview]= useState([])
  const navigate = useNavigate()
 


  useEffect(()=>{
    const getReviews = async()=> {
      try {
          const res = await fetch(`https://rentgo-backend.onrender.com/admin/reviews`,
            {credentials: "include"}
          );
          const data = await res.json();
          const reviews = data.reviews
          setuserreview(reviews)
          console.log(reviews)
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
    getReviews()
  },[])


  return (
    <div className="review-page">
      <Container fluid className="px-4">
         <Row className="search-row align-items-center gx-3">
  <Col xs={12} md={7}>
    <Form.Control
      className="search-input"
      placeholder="Search for id, name product"
    />
  </Col>

  <Col xs={12} md={5}>
    <div className="search-actions">
      <Button className="search-btn">Search</Button>

      <Form.Select className="filter-dropdown">
        <option>Filter</option>
        <option value="email">Email</option>
        <option value="latest">Latest</option>
        <option value="oldest">Oldest</option>
      </Form.Select>
    </div>
  </Col>
</Row>

        
        
        <div className="table-wrapper">
          <Table responsive borderless className="review-table align-middle">
            <thead>
              <tr>
                {/* <th>ID</th> */}
                <th>Customer</th>
                <th>Email</th>
                <th>date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {userreview?.map((item) => (
                <tr key={item.id}>
                  {/* <td>{item.id}</td> */}
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.date}</td>
                  <td>
                    <Link className="view-btn" as={Link} to={`/admin/viewreviews/${item.id}`}>View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
}