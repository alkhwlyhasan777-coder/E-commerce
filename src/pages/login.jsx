
import "./login.css"
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  IoMailOutline,
  IoLockClosedOutline,
  IoEyeOutline,
  IoEyeOffOutline,
  IoArrowForwardOutline,
} from "react-icons/io5";
function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Login Data:", formData);
  };

  return (
    <main className="auth_page">

      {/* LEFT SIDE */}
      <section className="auth_visual">

        <div className="auth_visual_content">

          <div className="auth_logo">
            <span>H</span>
          </div>

          <h1>
            Welcome
            <br />
            <span>Back!</span>
          </h1>

          <p>
            Login to your account and continue
            your journey with us.
          </p>

          <div className="auth_shape auth_shape_one"></div>
          <div className="auth_shape auth_shape_two"></div>

        </div>

      </section>


      {/* RIGHT SIDE */}
      <section className="auth_form_section">

        <div className="auth_form_container">

          <div className="auth_mobile_logo">
            <span>H</span>
          </div>

          <div className="auth_heading">

            <h2>Welcome back 👋</h2>

            <p>
              Enter your details to access your account
            </p>

          </div>


          <form onSubmit={handleSubmit}>

            {/* EMAIL */}

            <div className="form_group">

              <label htmlFor="email">
                Email Address
              </label>

              <div className="input_wrapper">

                <IoMailOutline className="input_icon" />

                <input
                  id="email"
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

              <div className="password_label">

                <label htmlFor="password">
                  Password
                </label>

                <Link to="/forgot-password">
                  Forgot password?
                </Link>

              </div>


              <div className="input_wrapper">

                <IoLockClosedOutline className="input_icon" />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
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


            {/* REMEMBER */}

            <div className="remember_row">

              <label className="remember">

                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                />

                <span>
                  Remember me
                </span>

              </label>

            </div>


            {/* BUTTON */}

            <button
              type="submit"
              className="auth_submit"
            >

              <span>Login to account</span>

              <IoArrowForwardOutline />

            </button>


            {/* REGISTER */}

            <p className="auth_switch">

              Don't have an account?

              <Link to="/pages/register">
                Create account
              </Link>

            </p>

          </form>

        </div>

      </section>

    </main>
  );
}

export default Login;