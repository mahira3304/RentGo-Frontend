import CarDetails from "./carDetails"
import PopularCars from "./popularCar"

function ViewCarDetailsPage({role}){
    return(
        <>
            <CarDetails role={role}/>
            <PopularCars role={role}/>
        </>
    )

};

export default ViewCarDetailsPage