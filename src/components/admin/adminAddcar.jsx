import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../../../css/admin/addcar.css";
import { useNavigate } from "react-router";

export default function AddCarPage()  {
  const [mileage, setMileage] = useState(0);
   const categories = ["Hatchback", "Sedan", "SUV", "Crossover", "MPV/Minivan", "Coupe", "Convertible", "Wagon"];
    const fuelTypes = ["CNG", "Petrol", "Diesel", "Electrical", "Hybrid"];

const navigate=useNavigate()
  async function addCarPost(e) {

    e.preventDefault();

    const formData = new FormData(e.target);
   
    try {
      const res = await fetch("http://localhost:3000/admin/addCar", {
        method: "POST",
        credentials: "include",
        body: formData
      })

      const data = await res.json()

      if (data.success) {
        alert('Car Added')
        navigate("/admin/viewCars")
      } else {
        alert('something went wrong..please try again')
        navigate("/admin/addcar")
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="addcar-page">
      <Container>
        <h2 className="title text-center mb-4">Add New Car</h2>

        <Form method="post" onSubmit={addCarPost} encType="multipart/form-data">
          <Row className="g-4">

            <Col md={4}>
              <h5>Car Images</h5>
              <Form.Control type="file" name="images" multiple accept="image/*" required className="image-box mb-3" />

              <h5 className="section-title">Capacity</h5>
              <Form.Select name="seats" className="input-box mb-2" required>
                <option value="">Seats</option>
                {[...Array(10)].map((_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
              </Form.Select>

              <Form.Select name="doors" className="input-box mb-2" required>
                <option value="">Doors</option>
                {[...Array(5)].map((_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
              </Form.Select>

              <Form.Control type="number" name="luggage" placeholder="Luggage Capacity (kg)" className="input-box mb-3" min={0} required/>

              <h5 className="section-title">Transmission</h5>
              <div className="radio-group mb-3">
                <Form.Check type="radio" label="Manual" name="transmission" value="Manual" />
                <Form.Check type="radio" label="Automatic" name="transmission" value="Automatic" defaultChecked />
              </div>
            </Col>

            <Col md={4}>
              <h5>Car Details</h5>
              <Form.Control name="name" placeholder="Car Name" className="input-box mb-2" required />
              <Form.Control name="brand" placeholder="Brand" className="input-box mb-2" required />
              <Form.Control name="color" placeholder="Color" className="input-box mb-2" required/>
              <Form.Control name="modelName" placeholder="Model Name" className="input-box mb-2" required/>
              <Form.Control type="number" name="modelYear" placeholder="Model Year" className="input-box mb-2" min={1900} max={2025} required/>
              <Form.Control type="number" name="manufactureYear" placeholder="Year of Manufacture" className="input-box mb-2" min={1900} max={2100} required/>
              <Form.Control name="registrationNumber" placeholder="Registration Number" className="input-box mb-2" required/>
              <Form.Control type="number" name="pricePerDay" placeholder="Price" className="input-box mb-2" min={0} required/>
              <Form.Control type="text" name="engine" placeholder="Engine (CC)" className="input-box mb-2" min={0} required/>

              <Form.Label>Category</Form.Label>
              <Form.Select name="type" className="input-box mb-3" required>
                <option value="">Select category</option>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </Form.Select>

              <Form.Label>Mileage: {mileage} KM</Form.Label>
              <Form.Range
                name="mileage"
                min={0}
                max={50}
                step={1}
                value={mileage}
                required
                onChange={(e) => setMileage(e.target.value)}
              />
              <div className="d-flex justify-content-between small-text mb-3">
                <span>0 KM</span>
                <span>50 KM</span>
              </div>
            </Col>

            <Col md={4}>
              <h5>Fuel Type</h5>
              <div className="radio-group mb-3">
                {fuelTypes.map(fuel => (
                  <Form.Check key={fuel} type="radio" name="fuelType" value={fuel} label={fuel} required />
                ))}
              </div>

              <h5>Equipments</h5>
              <div className="checkbox-group mb-3">
                {["ABS", "Air Bag", "Air Conditioner", "Reverse Camera", "Hybrid"].map(eq => (
                  <Form.Check key={eq} type="checkbox" name="equipments" value={eq} label={eq} />
                ))}
              </div>
              <div className="toggle-group mb-3">
                <Form.Check type="switch" name="available" value="true" label="Available" className="toggle-btn long-toggle" />
              </div>

              <h5>Notes</h5>
              <Form.Control as="textarea" name="description" placeholder="Description" className="textarea-box mb-2" required/>
              <Form.Control as="textarea" name="damageNotes" placeholder="Damage Notes" className="textarea-box mb-2" required/>

              <Button type="submit" className="add-btn w-100 mt-3">Add Car</Button>
            </Col>

          </Row>
        </Form>
      </Container>
    </div>
  );
}
