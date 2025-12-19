import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "../../../css/publicHome/login.css";
import { Link } from "react-router";
import { useNavigate } from "react-router";


export default function UserLogin() {

   const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [backenddata, setbackenddata] = useState({})
    const [formData, setFormData] = useState({
        email: "",
        password: "" 
    });

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    async function postData(e) {
        
        e.preventDefault();

        try {
            const res =await fetch("https://rentgo-backend.onrender.com/login/user",{
                method:"POST",
                credentials:"include",
                headers: { "Content-Type": "application/json" },
                body:JSON.stringify(formData)
            })

            const data =await res.json()
            
            if (data.success) {
                navigate("/user")
            } else {
                setbackenddata(data)
            }
        } catch (error) {
            console.log(error) 
        }
    }


 
  return (
    <div className="login-page d-flex justify-content-center align-items-center">
      <div className="login-card p-4 shadow">
        <h2 className="text-center mb-4">Login</h2>
        <form method="post" onSubmit={postData}>

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <div className="position-relative mb-2">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />

            <span
              className="password-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          <p className="text-end forgot">Forgot password?</p>

          <button className="btn login-btn w-100 mb-3" >Login</button>
        </form>

        <p className="text-center register-text">
          Don’t have an account yet?{" "}
          <Link className="register-link" as={Link} to="/signup">Register</Link>
        </p>

        <p id="message">{backenddata.msg}</p>
      </div>
    </div>

  );
}
