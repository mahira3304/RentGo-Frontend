import React, { useState } from "react";
import "../../../css/root.css";
import "../../../css/publicHome/signup.css";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Camera } from "lucide-react";


export default function UserForm({
  title,
  buttonText,
  onSubmit,
  defaultData = {},
}) {
  const [profileImage, setProfileImage] = useState(
    defaultData.profilePhoto
      ? `https://res.cloudinary.com/dyokhs4yf/image/upload/${defaultData.profilePhoto}`
      : null
  );

  const [dob, setDob] = useState(
    defaultData.dateOfBirth ? new Date(defaultData.dateOfBirth) : null
  );

  const [dobOpen, setDobOpen] = useState(false);

  const formatDate = (date) => {
    if (!date) return "";
    const fixedDate = new Date(date);
    fixedDate.setDate(fixedDate.getDate() + 1);
    const y = fixedDate.getFullYear();
    const m = String(fixedDate.getMonth() + 1).padStart(2, "0");
    const d = String(fixedDate.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setProfileImage(URL.createObjectURL(file));
  };

  return (
    <form
      method="post"
      encType="multipart/form-data"
      className="signup-form"
      onSubmit={onSubmit}
    >
      <div className="signup-wrapper">
        <div className="signup-container">
          <h2>{title}</h2>

          <div className="profile-section">
            <label htmlFor="profileUpload" className="profile-circle">
              {profileImage ? ( <img src={profileImage} alt="Profile" /> ) : ( <Camera size={32} color="#fff" /> )}
            </label>
            <input
              id="profileUpload"
              type="file"
              name="profilePhoto"
              accept="image/*"
              onChange={handleProfileChange}
              className="hidden-input"
            />
          </div>

          <div className="d-flex gap-5 flex-wrap">
            {/* LEFT */}
            <div className="left">
              <input
                type="text"
                placeholder="Full Name"
                name="name"
                defaultValue={defaultData.name || ""}
                required
              />
              <input
                type="email"
                name="email" placeholder="Email"
                defaultValue={defaultData.email || ""}
                readOnly={!!defaultData._id}
            />

              <input
                type="tel"
                placeholder="Phone Number"
                name="phoneNumber"
                maxLength="10"
                pattern="[0-9]{10}"
                inputMode="numeric"
                defaultValue={defaultData.phoneNumber || ""}
                required
              />

              {!defaultData._id && (
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    required
                    pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{4,}$"
                    title="Password must be at least 4 characters, include 1 uppercase, 1 lowercase, and 1 number"
                />
                )}


              {/* DOB */}
              <div className="flex gap-3">
                <Label>Date of Birth</Label>
                <input
                  type="hidden"
                  name="dateOfBirth"
                  value={dob ? dob.toISOString().split("T")[0] : ""}
                  required
                />
                <Popover open={dobOpen} onOpenChange={setDobOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-48 justify-between">
                      {dob ? formatDate(dob) : "Select date"}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Calendar
                      mode="single"
                      selected={dob}
                      onSelect={(date) => {
                        setDob(date);
                        setDobOpen(false);
                      }}
                      max={new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* GENDER */}
              <RadioGroup
                defaultValue={defaultData.gender || "Female"}
                name="gender"
                required
              >
                {["Female", "Male", "Other"].map((g) => (
                  <div key={g} className="flex items-center gap-3">
                    <RadioGroupItem value={g} id={g} />
                    <Label htmlFor={g}>{g}</Label>
                  </div>
                ))}
              </RadioGroup>

              <input
                type="text"
                placeholder="Address"
                name="address"
                defaultValue={defaultData.address || ""}
                required
              />
            </div>

            {/* RIGHT */}
            <div className="right">
              <input
                type="text"
                placeholder="Driving Licence Number"
                name="drivingLiscenceNumber"
                defaultValue={defaultData.drivingLiscenceNumber || ""}
                required
              />

              <input
                type="text"
                placeholder="Aadhaar Number"
                name="AadharNumber"
                defaultValue={defaultData.AadharNumber || ""}
                required
              />

              <label>Upload Driving Licence</label>
              <input type="file" name="drivingLiscenceImg" accept="image/*"/>

              <label>Upload Aadhaar</label>
              <input type="file" name="AadharImage" accept="image/*"/>

              <button type="submit" className="create-btn">
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
