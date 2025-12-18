import {Link, useNavigate, useParams} from "react-router"
import { Container, Form, Button } from "react-bootstrap";
import "../../../css/admin/adminViewReview.css";
import { useEffect, useState } from "react";

export default function AdminViewReview() {
  const [userReview,setuserReview]=useState([])
  const {id} = useParams()
  const navigate = useNavigate()


  useEffect(()=>{
      const getReviews = async()=> {
        try {
            const res = await fetch(`http://localhost:3000/admin/viewreviews/${id}`,
              {credentials: "include"}
            );
            const data = await res.json();
            const review = data.review
            setuserReview(review)
            if(!data.success){
              alert("something went wrong!!!")
            }
            // else{
            //   alert("something went wrong!!!")
            // }
        } catch (error) {
            console.log(error)
        } 
      }
      getReviews()
    },[])


    async function deleteReview(e){
        e.preventDefault();
        alert("do you want to delete?")

        try {
            const res =await fetch(`http://localhost:3000/admin/deletereview/${id}`,{
                method:"POST",
                credentials:"include"

            })

            const data =await res.json()
            
            if (data.success) {
                navigate("/admin/reviews")
            } else {
                alert("deletion failed!!")
            }
        } catch (error) {
           console.log(error) 
        }

    }


  return (
    <Container fluid className="review-page d-flex align-items-center justify-content-center">
      <Form method="post" className="review-card">

        
        <div className="review-header">
          <div className="avatar-circle">
            <span className="avatar-icon">👤</span>
          </div>

          <div className="user-info">
            <h2>{userReview?.name}</h2>
            <p>Email : {userReview?.email}</p>
          </div>
        </div>

        
        <div className="stars">Ratings : {userReview?.ratings}</div>
       
        <div className="review-box">
          {userReview?.review}
        </div>

        <div className="action-buttons">
          <Button  name="action" value="delete" className="delete-btn" onClick={deleteReview}>
            delete
          </Button>

          <Button  name="action" value="close" className="close-btn"   as={Link} to= "/admin/reviews">
            close
          </Button>
        </div>

      </Form>
    </Container>
  );
}
