import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../../css/root.css";
import "../../../css/carDetails.css";
import { useEffect } from "react";
import { data, Link, useNavigate, useParams } from "react-router";

export default function CarDetails({role}) {
  const [carData, setCarData] = useState([]);
  const [mainImage, setMainImage] = useState();
  const {id} = useParams() 
  const navigate = useNavigate()
  
    useEffect(() => {
      async function getCarData() {
        try {
          const res = await fetch(`https://rentgo-backend.onrender.com/public/carDetails/${id}`);
          const data = await res.json();
          const car = data.car[0]
          setCarData(car);
          setMainImage(car?.images?.[0]);
        } catch (error) {
          console.error(error);
        }
      }
  
      getCarData();
    }, [id]);



    async function deleteCar(e) {
        
        e.preventDefault();
        alert("do you want to delete?")

        try {
            const res =await fetch(`https://rentgo-backend.onrender.com/admin/deletecar/${id}`,{
                method:"POST",
                credentials:"include"

            })

            const data =await res.json()
            
            if (data.success) {
                navigate("/admin/cars")
            } else {
                alert("deletion failed!!")
                navigate("/admin/cars")
            }
        } catch (error) {
           console.log(error) 
        }
    }


    const getActionButtons = () => {
        switch (role) {
          case "admin":
            return (
              <>
                {/* <Link to={`/admin/editcars/${id}}`} className="book-btn" cardetails={carData}>Edit Details</Link> */}
                <button onClick={deleteCar} className="book-btn">Delete Car</button>
              </>
            );
    
          case "user":
            return (
              <Link
                to={`/user/car/viewdetails/booking/${id}`}
                className="book-btn"
              >
                Book Now
              </Link>
            );
    
          default:
            return (
              <Link
                to={`/login/user`}
                className="book-btn"
              >
                Book Now
              </Link>
            );
        }
      };


  return (
    <Container fluid className="car-details-container">
      <Row>

        <Col xs={12} lg={6} className="left-section">
          <h2 className="car-title">{carData?.name}</h2>

          <div className="brand-details">
            <p><strong>Brand:</strong> {carData?.brand}</p>
            <p><strong>Model:</strong> {carData?.modelName}</p>
            <p><strong>Model Year:</strong> {carData?.modelYear}</p>
          </div>

          <div className="price-row">
            <h3 className="price">₹{carData?.pricePerDay} <span>/ day</span></h3>
            <span className={`status ${carData?.maintenance ? "maintenance" :carData?.available ? "available" : "not-available"}`}>{carData?.maintenance?"MAINTENANCE":carData?.available?"AVAILABLE": "NOT AVAILABLE"}</span>
          </div>

          <img className="main-image" src={`https://res.cloudinary.com/dyokhs4yf/image/upload/${mainImage}`} alt="Car" />

          <Row className="image-gallery">
            {carData?.images?.filter((img)=>{return img!=mainImage}).map((url, index) => (
              <Col xs={6} sm={3} key={index}>
                <img
                  src={`https://res.cloudinary.com/dyokhs4yf/image/upload/${url}`}
                  alt="Gallery"
                  onClick={() => setMainImage(url)}
                  className="gallery-item"
                />
              </Col>
            ))}
          </Row>
        </Col>

        <Col xs={12} lg={6} className="right-section">
          <h4 className="spec-title">Technical Specification</h4>

          <div className="spec-grid">
            <div className="spec-card"><p className="spec-label">Transmission</p><h5>{carData?.transmission}</h5></div>
            <div className="spec-card"><p className="spec-label">Fuel</p><h5>{carData?.fuelType}</h5></div>
            <div className="spec-card"><p className="spec-label">Seats</p><h5>{carData?.seats}</h5></div>
            <div className="spec-card"><p className="spec-label">Color</p><h5>{carData?.color}</h5></div>
            <div className="spec-card"><p className="spec-label">Luggage Capacity</p><h5>{`${carData?.luggage} kg`}</h5></div>
            <div className="spec-card"><p className="spec-label">Doors</p><h5>{carData?.doors}</h5></div>
          </div>

          
          {getActionButtons()}
          

          <div className="equipment">
            <h4>Car Equipment</h4>
            <div className="equipment-grid">
              {carData?.equipments?.map((i)=>(
                  <span key={i}>✔{i}</span>
              ))}
            
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={12} className="description">
          <h4>Description:</h4>
          <p>
            {carData?.description}
          </p>
        </Col>
      </Row>

      <Row>
        <Col xs={12} className="details">
          <h4>Details :</h4>
          <ul>
            <li><strong>Year of Manufacture:</strong> {carData?.manufactureYear}</li>
            <li><strong>Engine:</strong> {carData?.engine}</li>
            <li><strong>Mileage:</strong> {carData?.mileage}</li>
            <li><strong>Type:</strong> {carData?.type}</li>
          </ul>
        </Col>
      </Row>

      <Row>
        <Col xs={12} className="damage-notes">
          <h4>Damage Notes :</h4>
          <p>{carData?.damageNotes}</p>
        </Col>
      </Row>
    </Container>
  )
}
