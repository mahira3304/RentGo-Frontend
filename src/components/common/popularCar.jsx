import { Container, Row, Col } from "react-bootstrap";
import { useEffect,useState} from "react";
import "../../../css/root.css";
import "../../../css/popularCars.css";
import { Link } from "react-router";
import CarCard from "./carCard";


export default function PopularCars({role}) {

  // console.log("PopularCars role:", role);

 const [cars, setCars] = useState([]);

 useEffect(() => {
    async function getPopulardata() {
      try {
        const res = await fetch("https://rentgo-backend.onrender.com/public/cars");
        const data = await res.json();

        setCars(data.cars.slice(0, 3));
      } catch (err) {
        console.error(err);
      }
    }
    getPopulardata();
  }, []);




const getActionButtons = (id) => {
    switch (role) {
      case "admin":
        return (
          <>
            <Link
              to={`/admin/cars/viewdetails/${id}`}
              className="details-btn"
            >
              View Details
            </Link>

            {/* <Link
              to={`/admin/editcars`}
              className="details-btn"
            >
              Edit Details
            </Link> */}
          </>
        );

      case "user":
        return (
          <Link
            to={`/user/cars/viewdetails/${id}`}
            className="details-btn"
          >
            View Details
          </Link>
        );

      default:
        return (
          <Link
            to={`/cars/viewdetails/${id}`}
            className="details-btn"
          >
            View Details
          </Link>
        );
    }
  };
  return (
    <section className="popular-section">
      <Container>
        <div className="popular-header d-flex justify-content-between align-items-center">
          <h2 className="popular-title">Popular Rentals</h2>
          <Link to="/cars" as={Link} className="view-all">View All →</Link>
        </div>

       <Row className="mt-4">
          {cars.map((car) => (
            <Col md={4} className="mb-4" key={car._id}>
              <CarCard
             
                carImg={`https://res.cloudinary.com/dyokhs4yf/image/upload/${car.images?.[0]}`}
                carname={car.name}
                carType={car.category}
                price={car.pricePerDay}
                available={car.available ? "Available" : "Not Available"}
                transmission={car.transmission}
                fuelType={car.fuelType}
                equipment={car.equipments?.[0]}
                seats={car.seats}
                 actionButton={getActionButtons(car.id)}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
