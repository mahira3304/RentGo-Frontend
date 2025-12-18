import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router";
import PublicHome from './PublicHome'
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './components/publichome/signup';
import PublicHomepage from './components/publichome/publichomePage';
import ViewAllCars from './components/common/viewallcars';
import ViewCarDetailsPage from './components/common/ViewCarDetailsPage';
import UserLogin from './components/publichome/userLogin';
import AdminLogin from './components/publichome/adminLogin';
import Admin from './admin';
import AboutUs from './components/common/aboutUs';
import AdminHome from './components/admin/adminhome';
import UserHome from './userhome';
import UserHomePage from './components/user/userHomePage';
import Authentication from './Authentication';
import AdminBookings from './components/admin/adminBookings';
import AdminViewBooking from './components/admin/adminViewBooking';
import AdminViewReview from './components/admin/adminViewReview';
import AdminReview from './components/admin/adminReview';
import UserProfile from './components/user/viewProfile';
import EditProfile from './components/user/editProfile';
import EditCar from './components/admin/adminEditCars';
import CarBooking from './components/user/carBooking';
import AddCarPage from './components/admin/adminAddcar';
import UserViewBooking from './components/user/userviewBookings';


const appRoutes = createBrowserRouter([
  {
    path: '/',
    element: <PublicHome />,
    children: [
      {
        path: 'login/user',
        element: <UserLogin />,
      },
      {
        path: 'login/admin',
        element: <AdminLogin />
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        index: true,
        element: <PublicHomepage />
      },
      {
        path: 'cars',
        element: <ViewAllCars role="public"/>
      },
      {
        path: 'cars/viewdetails/:id',
        element: <ViewCarDetailsPage role="public"/>
      },
      {
        path: 'aboutus',
        element: <AboutUs />
      }
    ]
  },
  {                     
    path:('/user'),
    element:<Authentication backendURL="http://localhost:3000/user/check" pageURL="/login/user" />,
    children:[
      {
        element:<UserHome/>,
        children:[
          {
            index:true,
            element:<UserHomePage role="user"/>
          },
          {
            path:'cars',
            element:<ViewAllCars role="user"/>
          },
          {
            path: 'cars/viewdetails/:id',
            element: <ViewCarDetailsPage role="user"/>
          },
          {
            path:'profile',
            element:<UserProfile/>
          },
          {
            path:'profile/editprofile',
            element:<EditProfile/>
          },
          {
            path:'car/viewdetails/booking/:id',
            element:<CarBooking role="user"/>
          },
          {
            path:'aboutus',
            element:<AboutUs/>
          },
          {
            path:'carbooking',
            element:<UserViewBooking/>
          }
        ]
      } 
    ]
  },
  {
    path:('/admin'),
    element:<Authentication backendURL="http://localhost:3000/admin/check" pageURL="/login/admin"/>,
    children:[
      {
        element:<Admin/>,
        children:[
          {
            index:true,
            element:<AdminHome/>
          },
          {
            path:('addcars'),
            element:<AddCarPage/>
          },  
          {
            path: ('cars'),
            element: <ViewAllCars role="admin"/>
          },
          {
            path: 'cars/viewdetails/:id',
            element: <ViewCarDetailsPage role="admin"/>
          },
          {
            path:('editcars/:id'),
            element:<EditCar/>
          },  
          {
            path: ('bookings'),
            element: <AdminBookings />
          },
          {
            path:('viewbooking/:id'),
            element:< AdminViewBooking />
          },
          {
            path:('reviews'),
            element:< AdminReview />
          },
          {
            path:('viewreviews/:id'),
            element:< AdminViewReview />
          }
        ]
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={appRoutes}></RouterProvider>
)
