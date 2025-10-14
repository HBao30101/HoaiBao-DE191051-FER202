import React, { useState } from "react";
import { ProgressBar, Nav, Button } from "react-bootstrap";
import Step1About from "../components/Account/Step1About";
import Step2Account from "../components/Account/Step2Account";
import Step3Address from "../components/Account/Step3Address";

function ProfilePage() {
  const [step, setStep] = useState(1);

  const progress = Math.round((step / 3) * 100);

  // helper để set lỗi / clear lỗi trên DOM
  const setInvalid = (id, message) => {
    const el = document.getElementById(id);
    const err = document.getElementById(`err-${id}`);
    if (el) el.classList.add("is-invalid");
    if (err) err.innerText = message || "";
  };
  const clearInvalid = (id) => {
    const el = document.getElementById(id);
    const err = document.getElementById(`err-${id}`);
    if (el) el.classList.remove("is-invalid");
    if (err) err.innerText = "";
  };

  // validate Step 1
  const validateStep1 = () => {
    let ok = true;

    const firstName = (document.getElementById("firstName")?.value || "").trim();
    const lastName = (document.getElementById("lastName")?.value || "").trim();
    const email = (document.getElementById("email")?.value || "").trim();
    const phone = (document.getElementById("phone")?.value || "").trim();
    const ageVal = (document.getElementById("age")?.value || "").trim();

    // firstName
    if (!firstName) {
      setInvalid("firstName", "First name is required");
      ok = false;
    } else {
      clearInvalid("firstName");
    }

    // lastName
    if (!lastName) {
      setInvalid("lastName", "Last name is required");
      ok = false;
    } else {
      clearInvalid("lastName");
    }

    // email basic pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setInvalid("email", "Email is required");
      ok = false;
    } else if (!emailPattern.test(email)) {
      setInvalid("email", "Invalid email");
      ok = false;
    } else {
      clearInvalid("email");
    }

    // phone 10-11 digits
    const phonePattern = /^[0-9]{10,11}$/;
    if (!phone) {
      setInvalid("phone", "Phone is required");
      ok = false;
    } else if (!phonePattern.test(phone)) {
      setInvalid("phone", "Invalid phone number (10-11 digits)");
      ok = false;
    } else {
      clearInvalid("phone");
    }

    // age positive integer
    const age = Number(ageVal);
    if (!ageVal) {
      setInvalid("age", "Age is required");
      ok = false;
    } else if (!Number.isInteger(age) || age <= 0) {
      setInvalid("age", "Enter a valid age");
      ok = false;
    } else {
      clearInvalid("age");
    }

    return ok;
  };

  // validate Step 2
  const validateStep2 = () => {
    let ok = true;
    const username = (document.getElementById("username")?.value || "").trim();
    const password = (document.getElementById("password")?.value || "");
    const confirmPassword = (document.getElementById("confirmPassword")?.value || "");
    const secretQuestion = (document.getElementById("secretQuestion")?.value || "");
    const answer = (document.getElementById("answer")?.value || "").trim();

    if (!username) {
      setInvalid("username", "Username is required");
      ok = false;
    } else {
      clearInvalid("username");
    }

    if (!password) {
      setInvalid("password", "Password is required");
      ok = false;
    } else if (password.length < 6) {
      setInvalid("password", "Password must be at least 6 characters");
      ok = false;
    } else {
      clearInvalid("password");
    }

    if (!confirmPassword) {
      setInvalid("confirmPassword", "Confirm password is required");
      ok = false;
    } else if (confirmPassword !== password) {
      setInvalid("confirmPassword", "Passwords do not match");
      ok = false;
    } else {
      clearInvalid("confirmPassword");
    }

    if (!secretQuestion) {
      setInvalid("secretQuestion", "Select a secret question");
      ok = false;
    } else {
      clearInvalid("secretQuestion");
    }

    if (!answer) {
      setInvalid("answer", "Answer is required");
      ok = false;
    } else {
      clearInvalid("answer");
    }

    return ok;
  };

  // validate Step 3
  const validateStep3 = () => {
    let ok = true;
    const street = (document.getElementById("street")?.value || "").trim();
    const city = (document.getElementById("city")?.value || "").trim();
    const state = (document.getElementById("state")?.value || "").trim();
    const zip = (document.getElementById("zip")?.value || "").trim();
    const country = (document.getElementById("country")?.value || "").trim();

    if (!street) {
      setInvalid("street", "Street is required");
      ok = false;
    } else {
      clearInvalid("street");
    }

    if (!city) {
      setInvalid("city", "City is required");
      ok = false;
    } else {
      clearInvalid("city");
    }

    if (!state) {
      setInvalid("state", "State is required");
      ok = false;
    } else {
      clearInvalid("state");
    }

    const zipPattern = /^[0-9]{4,6}$/;
    if (!zip) {
      setInvalid("zip", "Zip code is required");
      ok = false;
    } else if (!zipPattern.test(zip)) {
      setInvalid("zip", "Invalid zip code");
      ok = false;
    } else {
      clearInvalid("zip");
    }

    if (!country) {
      setInvalid("country", "Country is required");
      ok = false;
    } else {
      clearInvalid("country");
    }

    return ok;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
      else window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (step === 2) {
      if (validateStep2()) setStep(3);
      else window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    // clear errors of current step when go back
    if (step === 2) {
      ["username", "password", "confirmPassword", "secretQuestion", "answer"].forEach(clearInvalid);
    } else if (step === 3) {
      ["street", "city", "state", "zip", "country"].forEach(clearInvalid);
    }
    setStep((s) => Math.max(1, s - 1));
  };

  const handleFinish = () => {
    if (validateStep3()) {
      // gather all values (example)
      const data = {
        firstName: document.getElementById("firstName")?.value,
        lastName: document.getElementById("lastName")?.value,
        email: document.getElementById("email")?.value,
        phone: document.getElementById("phone")?.value,
        age: document.getElementById("age")?.value,
        username: document.getElementById("username")?.value,
        // do NOT log password in real app
        street: document.getElementById("street")?.value,
        city: document.getElementById("city")?.value,
        state: document.getElementById("state")?.value,
        zip: document.getElementById("zip")?.value,
        country: document.getElementById("country")?.value,
      };
      console.log("Form data:", data);
      alert("✅ Profile created!");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Tab click handler: only allow switching to <= current step
  const handleTabSelect = (target) => {
    const t = Number(target);
    if (t <= step) setStep(t);
  };

  return (
    <div className="container mt-4 p-4 border rounded bg-white" style={{ maxWidth: 860 }}>
      <div className="d-flex align-items-center mb-3">
        <i className="bi bi-person-circle fs-3 text-primary me-2"></i>
        <h4 className="m-0">Build Your Profile</h4>
      </div>

      <ProgressBar now={progress} label={`${progress}%`} className="mb-3" />

      <Nav variant="tabs" activeKey={String(step)} onSelect={handleTabSelect} className="mb-3">
        <Nav.Item>
          <Nav.Link eventKey="1">About</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="2" disabled={step < 2}>
            Account
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="3" disabled={step < 3}>
            Address
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <div>
        {step === 1 && <Step1About />}
        {step === 2 && <Step2Account />}
        {step === 3 && <Step3Address />}
      </div>

      <div className="d-flex justify-content-between mt-3">
        <Button variant="secondary" disabled={step === 1} onClick={handlePrev}>
          Previous
        </Button>

        {step < 3 ? (
          <Button variant="primary" onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button variant="success" onClick={handleFinish}>
            Finish
          </Button>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
