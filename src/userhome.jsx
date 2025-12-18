import { Outlet } from 'react-router'
import UserNavBar from './components/user/userNavbar'
import UserFooter from './components/user/userFooter'
function UserHome() {
  
  return (
    <>
      <UserNavBar />
      <Outlet/>
      <UserFooter/>
    </>
  )
}
export default UserHome
