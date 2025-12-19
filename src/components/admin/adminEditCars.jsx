// import React from "react";
// import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import "../../../css/admin/addCar.css";
// import { useParams } from "react-router";
// import { useEffect } from "react";
// import { useState } from "react";

// export default function EditCar () {
//   const [mileage, setMileage] = useState(0);
//   const [carData, setCarData] = useState()
//   const {id} = useParams()

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const formData = new FormData(e.target);

//     // console.log(Object.fromEntries(formData.entries()));
//   };

//   useEffect(() => {
//       async function getCarData() {
//         try {
//           const res = await fetch(`https://rentgo-backend.onrender.com/admin/carDetails/${id}`);
//           const data = await res.json();
//           const car = data.car[0]
//           setCarData(car);
//           console.log(carData)
       
//         } catch (error) {
//           console.error(error);
//         }
//       }
  
//       getCarData();
//     }, [id]);

//   return (
//     <div className="addcar-page">
//       <Container>
//         <h2 id="h2"className="title text-center mb-4">Edit Car</h2>

//         <Form method="post" onSubmit={handleSubmit} encType="multipart/form-data">
//           <Row className="g-4">

//             <Col md={4}>
//               <h5>Image</h5>
//               <input type="file" name="image" className="image-box" required multiple/>

//               <h5 className="section-title">Capacity</h5>
//               <Form.Control name="seats" className="input-box" placeholder="Number of seats" required />
//               <Form.Control name="doors" className="input-box" placeholder="Number of doors" />
//               <Form.Control name="luggage" className="input-box" placeholder="Luggage capacity" />

//               <h5 className="section-title">Transmission</h5>
//               <div className="radio-group">
//                 <Form.Check type="radio" label="Manual" name="transmission" value="manual" />
//                 <Form.Check
//                   type="radio"
//                   label="Automatic"
//                   name="transmission"
//                   value="automatic"
//                   defaultChecked
//                 />
//               </div>
//             </Col>

          
//             <Col md={4}>
//               <h5>Details</h5>

//               <Form.Control name="name" className="input-box"  defaultValue={carData?.name} required/>
//               <Form.Control name="brand" className="input-box" placeholder="Brand" />
//               <Form.Control name="color" className="input-box" placeholder="Color" />
//               <Form.Control name="modelName" className="input-box" placeholder="Model Name" />
//               <Form.Control name="modelYear" className="input-box" placeholder="Model Year" />
//               <Form.Control name="manufactureYear" className="input-box" placeholder="Year of manufacture" />
//               <Form.Control name="registration" className="input-box" placeholder="Registration number" />
//               <Form.Control name="price" className="input-box" placeholder="Price" />
//               <Form.Control name="engine" className="input-box" placeholder="Engine" />

//               <label className="section-title mt-2">Car Category</label>
//               <Form.Select name="category" className="input-box">
//                 <option value="">Select category</option>
//                 <option value="SUV">SUV</option>
//                 <option value="Sedan">Sedan</option>
//                 <option value="Hatchback">Hatchback</option>
//                 <option value="Luxury">Luxury</option>
//                 <option value="Sport">Sport</option>
//               </Form.Select>

             

//               <label className="section-title mt-3">
//                 Mileage: {mileage} KM
//               </label>

//               <Form.Range
//                 name="mileage"
//                 min={0}
//                 max={50}
//                 step={1}
//                 value={mileage}
//                 onChange={(e) => setMileage(e.target.value)}
//               />

//               <div className="mileage-values">
//                 <span>0 KM</span>
//                 <span>50 KM</span>
//               </div>
//             </Col>

//             <Col md={4}>

//               <h5>Fuel Type</h5>
//               <div className="checkbox-group">
//                 {["CNG", "Petrol", "Diesel", "Electrical", "Hybrid"].map((x) => (
//                   <Form.Check
//                     key={x}
//                     type="checkbox"
//                     name="fuelType"
//                     value={x}
//                     label={x}
//                   />
//                 ))}
//               </div>

//               <h5 className="section-title">Equipments</h5>
//               <div className="checkbox-group">
//                 {["ABS", "Air Bag", "Air Conditioner", "Reverse Camera", "Hybrid"].map(
//                   (x) => (
//                     <Form.Check
//                       key={x}
//                       type="checkbox"
//                       name="equipments"
//                       value={x}
//                       label={x}
//                     />
//                   )
//                 )}
//               </div>

//               <div className="toggle-group">
//                 <Form.Check
//                   type="switch"
//                   name="available"
//                   value="true"
//                   label="Available"
//                   className="toggle-btn long-toggle"
//                 />

//                 <Form.Check
//                   type="switch"
//                   name="maintenance"
//                   value="true"
//                   label="Under Maintenance"
//                   className="toggle-btn long-toggle"
//                 />
//               </div>

//               <h5 className="section-title">Notes</h5>
//               <Form.Control
//                 as="textarea"
//                 name="description"
//                 className="textarea-box"
//                 placeholder="Description"
//               />
//               <Form.Control
//                 as="textarea"
//                 name="damageNotes"
//                 className="textarea-box"
//                 placeholder="Damage Notes"
//               />

//               <Button type="submit" className="add-btn w-100 mt-3">
//                 Edit Car
//               </Button>
//             </Col>
//           </Row>
//         </Form>
//       </Container>
//     </div>
//   );
// };











import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../../../css/admin/addcar.css";
import { useParams } from "react-router";

export default function EditCar() {
  const [mileage, setMileage] = useState(0);
  const [carData, setCarData] = useState({
    fuelType: [],
    equipments: [],
    category: "",
  });
  const { id } = useParams();

  useEffect(() => {
    // Fetch existing car data for editing
    async function getCarData() {
      try {
        const res = await fetch(`https://rentgo-backend.onrender.com/public/carDetails/${id}`);
        const data = await res.json();
        const car = data.car[0];
        setCarData(car); // Set the fetched data to state
        setMileage(car?.mileage || 0); // Initialize mileage
      } catch (error) {
        console.error(error);
      }
    }

    getCarData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Gather form data
    const formData = new FormData(e.target);
    const editedData = Object.fromEntries(formData.entries());

    // Update backend with the modified car data
    try {
      const response = await fetch(
        `https://rentgo-backend.onrender.com/admin/editdetails/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...editedData, mileage }),
        }
      );

      if (response.ok) {
        alert("Car details updated successfully");
      } else {
        alert("Error updating car details");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckboxChange = (e, field) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    const updatedField = isChecked
      ? [...carData[field], value]
      : carData[field].filter((item) => item !== value);

    setCarData((prevState) => ({ ...prevState, [field]: updatedField }));
  };

  return (
    <div className="addcar-page">
      <Container>
        <h2 id="h2" className="title text-center mb-4">
          Edit Car
        </h2>

        <Form method="post" onSubmit={handleSubmit} encType="multipart/form-data">
          <Row className="g-4">
            <Col md={4}>
              <h5>Image</h5>
              <input
                type="file"
                name="image"
                className="image-box"
                required
                multiple
              />

              <h5 className="section-title">Capacity</h5>
              <Form.Control
                name="seats"
                className="input-box"
                placeholder="Number of seats"
                defaultValue={carData?.seats}
                required
              />
              <Form.Control
                name="doors"
                className="input-box"
                placeholder="Number of doors"
                defaultValue={carData?.doors}
              />
              <Form.Control
                name="luggage"
                className="input-box"
                placeholder="Luggage capacity"
                defaultValue={carData?.luggage}
              />

              <h5 className="section-title">Transmission</h5>
              <div className="radio-group">
                <Form.Check
                  type="radio"
                  label="Manual"
                  name="transmission"
                  value="manual"
                  defaultChecked={carData?.transmission === "manual"}
                />
                <Form.Check
                  type="radio"
                  label="Automatic"
                  name="transmission"
                  value="automatic"
                  defaultChecked={carData?.transmission === "automatic"}
                />
              </div>
            </Col>

            <Col md={4}>
              <h5>Details</h5>
              <Form.Control
                name="name"
                className="input-box"
                value={carData?.name || ""}
                onChange={(e) =>
                  setCarData({ ...carData, name: e.target.value })
                }
                required
              />
              <Form.Control
                name="brand"
                className="input-box"
                placeholder="Brand"
                value={carData?.brand || ""}
                onChange={(e) =>
                  setCarData({ ...carData, brand: e.target.value })
                }
              />
              <Form.Control
                name="color"
                className="input-box"
                placeholder="Color"
                value={carData?.color || ""}
                onChange={(e) =>
                  setCarData({ ...carData, color: e.target.value })
                }
              />
              <Form.Control
                name="modelName"
                className="input-box"
                placeholder="Model Name"
                value={carData?.modelName || ""}
                onChange={(e) =>
                  setCarData({ ...carData, modelName: e.target.value })
                }
              />
              <Form.Control
                name="modelYear"
                className="input-box"
                placeholder="Model Year"
                value={carData?.modelYear || ""}
                onChange={(e) =>
                  setCarData({ ...carData, modelYear: e.target.value })
                }
              />
              <Form.Control
                name="manufactureYear"
                className="input-box"
                placeholder="Year of manufacture"
                value={carData?.manufactureYear || ""}
                onChange={(e) =>
                  setCarData({ ...carData, manufactureYear: e.target.value })
                }
              />
              <Form.Control
                name="registration"
                className="input-box"
                placeholder="Registration number"
                value={carData?.registration || ""}
                onChange={(e) =>
                  setCarData({ ...carData, registration: e.target.value })
                }
              />
              <Form.Control
                name="price"
                className="input-box"
                placeholder="Price"
                value={carData?.price || ""}
                onChange={(e) =>
                  setCarData({ ...carData, price: e.target.value })
                }
              />
              <Form.Control
                name="engine"
                className="input-box"
                placeholder="Engine"
                value={carData?.engine || ""}
                onChange={(e) =>
                  setCarData({ ...carData, engine: e.target.value })
                }
              />

              <label className="section-title mt-2">Car Category</label>
              <Form.Select
                name="category"
                className="input-box"
                value={carData?.category || ""}
                onChange={(e) =>
                  setCarData({ ...carData, category: e.target.value })
                }
              >
                <option value="">Select category</option>
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Luxury">Luxury</option>
                <option value="Sport">Sport</option>
              </Form.Select>

              <label className="section-title mt-3">Mileage: {mileage} KM</label>
              <Form.Range
                name="mileage"
                min={0}
                max={50}
                step={1}
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
              />

              <div className="mileage-values">
                <span>0 KM</span>
                <span>50 KM</span>
              </div>
            </Col>

            <Col md={4}>
              <h5>Fuel Type</h5>
              <div className="checkbox-group">
                {["CNG", "Petrol", "Diesel", "Electrical", "Hybrid"].map((x) => (
                  <Form.Check
                    key={x}
                    type="checkbox"
                    name="fuelType"
                    value={x}
                    label={x}
                    checked={carData?.fuelType?.includes(x)}
                    onChange={(e) => handleCheckboxChange(e, "fuelType")}
                  />
                ))}
              </div>

              <h5 className="section-title">Equipments</h5>
              <div className="checkbox-group">
                {["ABS", "Air Bag", "Air Conditioner", "Reverse Camera"].map(
                  (x) => (
                    <Form.Check
                      key={x}
                      type="checkbox"
                      name="equipments"
                      value={x}
                      label={x}
                      checked={carData?.equipments?.includes(x)}
                      onChange={(e) => handleCheckboxChange(e, "equipments")}
                    />
                  )
                )}
              </div>

              <div className="toggle-group">
                <Form.Check
                  type="switch"
                  name="available"
                  value="true"
                  label="Available"
                  checked={carData?.available || false}
                  onChange={(e) =>
                    setCarData({
                      ...carData,
                      available: e.target.checked,
                    })
                  }
                  className="toggle-btn long-toggle"
                />

                <Form.Check
                  type="switch"
                  name="maintenance"
                  value="true"
                  label="Under Maintenance"
                  checked={carData?.maintenance || false}
                  onChange={(e) =>
                    setCarData({
                      ...carData,
                      maintenance: e.target.checked,
                    })
                  }
                  className="toggle-btn long-toggle"
                />
              </div>

              <h5 className="section-title">Notes</h5>
              <Form.Control
                as="textarea"
                name="description"
                className="textarea-box"
                placeholder="Description"
                value={carData?.description || ""}
                onChange={(e) =>
                  setCarData({ ...carData, description: e.target.value })
                }
              />
              <Form.Control
                as="textarea"
                name="damageNotes"
                className="textarea-box"
                placeholder="Damage Notes"
                value={carData?.damageNotes || ""}
                onChange={(e) =>
                  setCarData({ ...carData, damageNotes: e.target.value })
                }
              />

              <Button type="submit" className="add-btn w-100 mt-3">
                Edit Car
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}