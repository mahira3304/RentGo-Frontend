import UserForm from "@/components/user/UserForm";
import { useNavigate } from "react-router";

export default function SignUp() {
  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const res = await fetch("https://rentgo-backend.onrender.com/register/user", {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      navigate("/login/user");
    }
  }

  return (
    <UserForm
      title="Create Your Account"
      buttonText="Create"
      onSubmit={handleSignup}
    />
  );
}
