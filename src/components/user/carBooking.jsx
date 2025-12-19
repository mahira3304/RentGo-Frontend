import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../../../css/user/carBooking.css";
import { useNavigate, useParams } from "react-router";



export default function CarBooking() {

  const {id} = useParams()
  const [carData,setcarData] = useState([])
  const navigate = useNavigate()

  useEffect(()=>{
    async function getcardetails() {
      try {
        const res = await fetch(`https://rentgo-backend.onrender.com/user/booking/${id}`,{credentials: "include"})
        const data =await res.json()
        const car = data.car
        console.log(car)
        setcarData(car)
      } catch (error) {
        console.log(error)
      }
      
    }
    getcardetails()
  },[id])


  async function submitBooking(e) {
  e.preventDefault();

  const bookingData = {
    id, // custom car id
    carName: carData?.name,
    Model: carData?.type,
    Year: carData?.year,
    pickupDate,
    pickupTime: `${pickupTime.hour}:${pickupTime.minute} ${pickupTime.period}`,
    returnDate: dropDate,
    returnTime: `${dropTime.hour}:${dropTime.minute} ${dropTime.period}`,
    payment: paymentMethod,
    price: totalPrice,
  };

  try {
    const res = await fetch(`https://rentgo-backend.onrender.com/user/booking/${id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    const data = await res.json();

    if (data.success) {
      alert("Booking submitted successfully");
      // navigate("/user/profile");
    } else {
      alert(data.message || "Booking failed");
    }
  } catch (error) {
    console.error(error);
  }
}



  const [pickupDate, setPickupDate] = useState("");
  const [dropDate, setDropDate] = useState("");

  const [pickupTime, setPickupTime] = useState({
    hour: "",
    minute: "",
    period: "AM",
  });

  const [dropTime, setDropTime] = useState({
    hour: "",
    minute: "",
    period: "AM",
  });

  const [paymentMethod, setPaymentMethod] = useState("");

  const pricePerDay = carData?.pricePerDay;

  // 🔹 Helper function
  function convertTo24Hour(hour, minute, period) {
    let h = parseInt(hour || 0);
    let m = parseInt(minute || 0);

    if (period === "PM" && h !== 12) h += 12;
    if (period === "AM" && h === 12) h = 0;

    return { h, m };
  }

  // 🔹 Automatic calculations
  let totalHours = 0;
  let totalDays = 0;
  let totalPrice = 0;

  if (
    pickupDate &&
    dropDate &&
    pickupTime.hour &&
    dropTime.hour
  ) {
    const pick = convertTo24Hour(
      pickupTime.hour,
      pickupTime.minute,
      pickupTime.period
    );

    const drop = convertTo24Hour(
      dropTime.hour,
      dropTime.minute,
      dropTime.period
    );

    const pickupDateTime = new Date(pickupDate);
    pickupDateTime.setHours(pick.h, pick.m);

    const dropDateTime = new Date(dropDate);
    dropDateTime.setHours(drop.h, drop.m);

    const diffMs = dropDateTime - pickupDateTime;

    if (diffMs > 0) {
      totalHours = diffMs / (1000 * 60 * 60);
      totalDays = Math.ceil(totalHours / 24);
      totalPrice = totalDays * pricePerDay;
    }
  }

  return (
    <div className="booking-page container py-4">

      {/* CAR CARD */}
      <div className="card car-card p-3 shadow-sm mb-4">
        <div className="row g-3 align-items-center">
          <div className="col-md-7">
            <img
              src={`https://res.cloudinary.com/dyokhs4yf/image/upload/${carData?.images?.[0]}`}
              alt="Car"
              className="img-fluid rounded car-image"
            />
          </div>

          <div className="col-md-5">
            <h5 className="mb-1">{carData?.name}</h5>
            <p className="text-muted mb-1">{carData?.type}</p>
            <p className="car-price">
              ₹{carData?.pricePerDay}  <span className="text-muted">per day</span>
            </p>
          </div>
        </div>
      </div>

      <form action="POST" onSubmit={submitBooking}>
      {/* DATES */}
      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <label className="form-label fw-semibold">Pick Up Date</label>
          <input
            type="date"
            className="form-control"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label fw-semibold">Drop Date</label>
          <input
            type="date"
            className="form-control"
            value={dropDate}
            onChange={(e) => setDropDate(e.target.value)}
          />
        </div>
      </div>

      {/* TIMES */}
      <div className="row mb-4">

        {/* PICKUP TIME */}
        <div className="col-md-6">
          <p className="fw-semibold">Pick Up Time</p>

          <div className="time-box p-3 rounded">
            <div className="d-flex align-items-center justify-content-between">
              <input
                type="number"
                placeholder="HH"
                className="form-control time-input"
                value={pickupTime.hour}
                onChange={(e) =>
                  setPickupTime({ ...pickupTime, hour: e.target.value })
                }
              />

              <span className="time-colon">:</span>

              <input
                type="number"
                placeholder="MM"
                className="form-control time-input"
                value={pickupTime.minute}
                onChange={(e) =>
                  setPickupTime({ ...pickupTime, minute: e.target.value })
                }
              />

              <select
                className="form-select period-select"
                value={pickupTime.period}
                onChange={(e) =>
                  setPickupTime({ ...pickupTime, period: e.target.value })
                }
              >
                <option>AM</option>
                <option>PM</option>
              </select>
            </div>

           
          </div>
        </div>

        {/* DROP TIME */}
        <div className="col-md-6">
          <p className="fw-semibold">Drop Time</p>

          <div className="time-box p-3 rounded">
            <div className="d-flex align-items-center justify-content-between">
              <input
                type="number"
                placeholder="HH"
                className="form-control time-input"
                value={dropTime.hour}
                onChange={(e) =>
                  setDropTime({ ...dropTime, hour: e.target.value })
                }
              />

              <span className="time-colon">:</span>

              <input
                type="number"
                placeholder="MM"
                className="form-control time-input"
                value={dropTime.minute}
                onChange={(e) =>
                  setDropTime({ ...dropTime, minute: e.target.value })
                }
              />

              <select
                className="form-select period-select"
                value={dropTime.period}
                onChange={(e) =>
                  setDropTime({ ...dropTime, period: e.target.value })
                }
              >
                <option>AM</option>
                <option>PM</option>
              </select>
            </div>

          
          </div>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="card shadow-sm p-4 summary-card">
        <h5 className="mb-3">Order Summary</h5>

        <p>Total Time: <strong>{totalHours.toFixed(1)} hrs</strong></p>
        <p>Total Days: <strong>{totalDays}</strong></p>
        <p>Price: <strong>₹{totalPrice}</strong></p>

        <div className="d-flex justify-content-between align-items-center mt-4">
          <div className="dropdown">
            <div
              className="btn btn-success dropdown-toggle px-4"
              data-bs-toggle="dropdown"
            >
              Pay
            </div>

            <ul className="dropdown-menu">
              <li>
                <div className="dropdown-item" onClick={() => setPaymentMethod("Cash")}>
                  Cash
                </div>
              </li>
              <li>
                <div className="dropdown-item" onClick={() => setPaymentMethod("UPI")}>
                  UPI
                </div>
              </li>
              <li>
                <div className="dropdown-item" onClick={() => setPaymentMethod("Card")}>
                  Card
                </div>
              </li>
            </ul>
          </div>

          <button type="submit" className="btn confirm-btn px-4">Confirm</button>
        </div>

        {paymentMethod && (
          <p className="mt-3 text-success">
            Payment Method: <strong>{paymentMethod}</strong>
          </p>
        )}
      </div>
      </form>

    </div>
    
  );
}
