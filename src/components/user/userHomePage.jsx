import Hero from '../common/hero'
import PopularCars from '../common/popularCar'
import AddReview from './addreview'

const UserHomePage=({role})=>{
  return (
    <>
      <Hero/>
      <PopularCars role={role}/>
      <AddReview/>
    </>
  );
}
export default UserHomePage
