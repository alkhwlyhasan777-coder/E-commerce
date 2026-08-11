import './login.css'
import { useState } from "react";
import { Link } from "react-router-dom";

import {
  IoPersonOutline,
  IoMailOutline,
  IoLockClosedOutline,
  IoEyeOutline,
  IoEyeOffOutline,
  IoArrowForwardOutline,
} from "react-icons/io5";


function Register() {

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


  const handleSubmit = (e) => {

    e.preventDefault();

    console.log("Register Data:", formData);

  };


  return (
    <main className="auth_page register_page">

      {/* LEFT */}

      <section className="auth_visual">

        <div className="auth_visual_content">

          <div className="auth_logo">
            <span>H</span>
          </div>

          <h1>
            Create
            <br />
            <span>Account.</span>
          </h1>

          <p>
            Create your account and start
            exploring everything we have to offer.
          </p>

          <div className="auth_shape auth_shape_one"></div>
          <div className="auth_shape auth_shape_two"></div>

        </div>

      </section>


      {/* RIGHT */}

      <section className="auth_form_section">

        <div className="auth_form_container">

          <div className="auth_mobile_logo">
            <span>H</span>
          </div>


          <div className="auth_heading">

            <h2>Create your account </h2>

            <p>
              Enter your information to get started
            </p>

          </div>


          <form onSubmit={handleSubmit}>

            {/* NAME */}

            <div className="form_group">

              <label htmlFor="name">
                Full Name
              </label>

              <div className="input_wrapper">

                <IoPersonOutline className="input_icon" />

                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            {/* EMAIL */}

            <div className="form_group">

              <label htmlFor="register-email">
                Email Address
              </label>

              <div className="input_wrapper">

                <IoMailOutline className="input_icon" />

                <input
                  id="register-email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div className="form_group">

              <label htmlFor="register-password">
                Password
              </label>

              <div className="input_wrapper">

                <IoLockClosedOutline className="input_icon" />

                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="password_toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <IoEyeOffOutline />
                  ) : (
                    <IoEyeOutline />
                  )}
                </button>

              </div>

            </div>


            {/* CONFIRM PASSWORD */}

            <div className="form_group">

              <label htmlFor="confirmPassword">
                Confirm Password
              </label>

              <div className="input_wrapper">

                <IoLockClosedOutline className="input_icon" />

                <input
                  id="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="password_toggle"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                >
                  {showConfirmPassword ? (
                    <IoEyeOffOutline />
                  ) : (
                    <IoEyeOutline />
                  )}
                </button>

              </div>

            </div>


            {/* BUTTON */}

            <button
              type="submit"
              className="auth_submit"
            >

              <span>Create account</span>

              <IoArrowForwardOutline />

            </button>


            {/* LOGIN */}

            <p className="auth_switch">

              Already have an account?

              <Link to="/pages/login">
                Login
              </Link>

            </p>

          </form>

        </div>

      </section>

    </main>
  );
}

export default Register;

