import "./contact.css";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

function Contact() {

    return (
        <>
            <div style={{ height: "140px" }} />
            <div className="contact_page">

                <div className="contact_header">
                    <h1>Contact Us</h1>

                    <p>
                        We'd love to hear from you. Send us a message
                        and our team will respond as soon as possible.
                    </p>
                </div>

                <div className="contact_container">

                    <div className="contact_info">

                        <div className="info_card">
                            <FaPhoneAlt />

                            <div>
                                <h3>Phone</h3>
                                <p>01127846533</p>
                            </div>
                        </div>

                        <div className="info_card">
                            <FaEnvelope />

                            <div>
                                <h3>Email</h3>
                                <p>alkhwlyhasan777@agmail.com</p>
                            </div>
                        </div>

                        <div className="info_card">
                            <FaMapMarkerAlt />

                            <div>
                                <h3>Location</h3>
                                <p>Cairo, Egypt</p>
                            </div>
                        </div>

                    </div>

                    <form className="contact_form">

                        <input
                            type="text"
                            placeholder="Your Name"
                        />

                        <input
                            type="email"
                            placeholder="Your Email"
                        />

                        <textarea
                            rows="6"
                            placeholder="Your Message"
                        ></textarea>

                        <button type="submit">
                            Send Message
                        </button>

                    </form>

                </div>

            </div>
        </>
    );
}

export default Contact;