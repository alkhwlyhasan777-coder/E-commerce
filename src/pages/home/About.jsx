import "./about.css";
import { FaShippingFast, FaLock, FaHeadset } from "react-icons/fa";

function About() {
    return (
        <>
            <div style={{ height: "140px" }} />
            <div className="about_page">
                <div className="about_hero">
                    <h1>About Our Store</h1>

                    <p>
                        Welcome to our modern e-commerce platform where
                        quality products meet amazing shopping experience.
                    </p>
                </div>

                <div className="about_content">

                    <div className="about_text">
                        <h2>Who We Are</h2>

                        <p>
                            We are an online shopping platform specialized in
                            electronics, fashion, accessories and modern products.
                            Our goal is to provide high quality products with
                            affordable prices and fast delivery.
                        </p>

                        <p>
                            We focus on user experience, modern design and
                            secure payment solutions to make online shopping
                            simple and enjoyable.
                        </p>
                    </div>

                    <div className="about_image">
                        <img
                            src="https://i.imgur.com/ZANVnHE.jpeg"
                            alt="about"
                        />
                    </div>

                </div>

                <div className="about_features">

                    <div className="feature_card">
                        <FaShippingFast />

                        <h3>Fast Delivery</h3>

                        <p>
                            Quick and reliable shipping for all orders.
                        </p>
                    </div>

                    <div className="feature_card">
                        <FaLock />

                        <h3>Secure Payment</h3>

                        <p>
                            Your payment information is always protected.
                        </p>
                    </div>

                    <div className="feature_card">
                        <FaHeadset />

                        <h3>24/7 Support</h3>

                        <p>
                            Our support team is always ready to help you.
                        </p>
                    </div>

                </div>

                </div>
        </>
    );
}

export default About;