import UserForm from "@/components/user/UserForm";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

export default function EditProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("https://rentgo-backend.onrender.com/user/profile", {
          credentials: "include",
        });
        const data = await res.json();

        if (res.ok && data.success) {
          setUser(data.user);
        }
      } catch (err) {
        console.error("Fetch profile error:", err);
      }
    }

    fetchProfile();
  }, []);

  async function handleUpdate(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
      const res = await fetch("https://rentgo-backend.onrender.com/user/profile", {
        method: "POST", 
        credentials: "include",
        body: formData,
      });

      const data = await res.json();
      console.log("Update response:", data);

      if (res.ok && data.success) {
        navigate("/user/profile");
      } else {
        alert(data.message || "Update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Server error");
    }
  }

  if (!user) return null;

  return (
    <UserForm
      title="Edit Profile"
      buttonText="Save Changes"
      defaultData={user}
      onSubmit={handleUpdate}
    />
  );
}
