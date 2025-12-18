import { BsFillFuelPumpDieselFill } from "react-icons/bs";
import { IoSettingsSharp } from "react-icons/io5";
import { MdEventSeat, MdWindPower } from "react-icons/md";



export default function CarCard({ carImg, carname, carType, price, available, transmission, fuelType,equipment,seats, actionButton }) {

  return (
    <div className="rental-card">
      <img src={carImg} alt="Car" style={{
        width: "100%",
        height: "200px",
        objectFit: "cover",
        borderRadius: "12px 12px 0 0"
      }} className="rental-img" />

      <div className="card-body">
        <div className="car-name-price">
          <div>
            <h4 className="car-name">{carname}</h4>
            <p className="car-type">{carType}</p>
          </div>
          <div className="price-block">
            <span className="price">₹{price}</span>
            <p className="per-day">per day</p>
          </div>
        </div>

        <p className="available">{available}</p>

        <div className="features">
          <span><IoSettingsSharp /> {transmission}</span>
          <span><BsFillFuelPumpDieselFill /> {fuelType}</span>
        </div>

        <div className="features mt-1">
          <span><MdWindPower />{equipment}</span>
          <span><MdEventSeat /> {seats}</span>
        </div>

        {actionButton}

      </div>
    </div>
  )
}