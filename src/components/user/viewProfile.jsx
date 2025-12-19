import { Container, Card, Button, Modal } from "react-bootstrap";
import { Link } from "react-router";
import "../../../css/user/viewProfie.css";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

const UserProfile = () => {

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  
  const openModal = (url) => {
    setImageUrl(url);
    setShowModal(true);
  };

  async function UserLogout(e) {
    e.preventDefault();

    try {
      const res = await fetch("https://rentgo-backend.onrender.com/logout/user", {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        alert("do you want to logout?");
        navigate("/");
      } else {
        alert("logout failed!!");
      }
    } catch (error) {
      console.log(error);
    }
  }

//   async function deleteUserAccount(e) {
//     e.preventDefault();
    
//     if (!window.confirm("Do you really want to delete your account?")) return;

//     try {
//         const res = await fetch(`https://rentgo-backend.onrender.com/user/delete/${userId}`, {
//             method: "DELETE",       // better to use DELETE method
//             credentials: "include"
//         });

//         const data = await res.json();

//         if (data.success) {
//             alert("Account deleted successfully!");
//             navigate("/"); // redirect to home or login page
//         } else {
//             alert("Deletion failed!");
//         }
//     } catch (error) {
//         console.log(error);
//         alert("Something went wrong!");
//     }
// }


  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      const res = await fetch("https://rentgo-backend.onrender.com/user/profile", {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
      }
    }
    fetchProfile();
  }, []);











  

  return (
    <div className="profile-page">
      <Container className="profile-container">

        <div className="profile-header text-center">
          {user?.profilePhoto && (
            <img
              src={`https://res.cloudinary.com/dyokhs4yf/image/upload/${user.profilePhoto}`}
              alt="Profile"
              className="profile-image"
            />
          )}

          {user && <h4 className="profile-name">{user.name}</h4>}
        </div>

        <Card className="profile-card">
          <Card.Body>
            <h6 className="section-title">Personal Details</h6>

            <div className="details-grid">
              <p>Email</p><p>: {user?.email}</p>
              <p>Phone number</p><p>: {user?.phoneNumber}</p>
              <p>Date of birth</p><p>: {user?.dateOfBirth}</p>
              <p>Gender</p><p>: {user?.gender}</p>
              <p>Address</p><p>: {user?.address}</p>
            </div>
          </Card.Body>
        </Card>

        <Card className="profile-card">
          <Card.Body>
            <h6 className="section-title">Verification Details</h6>

            <div className="details-grid">
              <p>Driving Licence Number</p>
              <p>: {user?.drivingLiscenceNumber}</p>

              <p>Aadhaar Number</p>
              <p>: {user?.AadharNumber}</p>

              <p>Driving Licence</p>
              <Button
                size="sm"
                className="view-btn"
                onClick={() =>
                  openModal(
                    `https://res.cloudinary.com/dyokhs4yf/image/upload/${user?.drivingLiscenceImg}`
                  )
                }
              >
                View
              </Button>

              <p>Aadhaar</p>
              <Button
                size="sm"
                className="view-btn"
                onClick={() =>
                  openModal(
                    `https://res.cloudinary.com/dyokhs4yf/image/upload/${user?.AadharImage}`
                  )
                }
              >
                View
              </Button>
            </div>
          </Card.Body>
        </Card>

        <div className="profile-actions">
          {/* <Button onClick={deleteUserAccount} className="delete-btn">
            Delete Account
          </Button> */}
          <Button as={Link} to="/user/profile/editprofile" className="edit-btn">
            Edit your profile
          </Button>
          <Button className="edit-btn" onClick={UserLogout}>
            LOGOUT
          </Button>
        </div>
      </Container>

      
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="sm"
      >
        <Modal.Body className="text-center">
          <img
            src={imageUrl}
            alt="Document"
            style={{ width: "100%", borderRadius: "8px" }}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UserProfile;
