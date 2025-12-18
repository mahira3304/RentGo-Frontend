import { Outlet } from 'react-router'
import NavBar from './components/publichome/navbar'
import Footer from './components/publichome/footer'
function PublicHome() {
  // async function aa() {
  //   const a = await fetch('http://192.168.29.119:3000/api/data')
  //   const data = await a.json(a)
  //   console.log(data);

  // }
  return (
    <>
      <NavBar />
      {/* <button onClick={aa}>button</button> */}
      <Outlet/>
      <Footer/>
    </>
  )
}
export default PublicHome
