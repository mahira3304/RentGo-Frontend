import { Outlet } from 'react-router';
import AdminNavBar from './components/admin/adminNavbar';

function Admin() {
  return (
    <>
      <AdminNavBar/>
      <Outlet/>
    </>
  );
}
export default Admin
