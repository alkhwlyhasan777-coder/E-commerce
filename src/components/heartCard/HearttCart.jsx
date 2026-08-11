import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { FiShoppingBag } from "react-icons/fi";
import { CiHeart } from "react-icons/ci";
import "./heart.css";
// import { div } from "framer-motion/client";
function HearttCart() {
    const { heartItem, toggleHeart } = useContext(CartContext);
    return (
        <div className="cart_page">
            <div style={{ height: "120px" }} />
            <div>
                <h2>My Favorites</h2>
                <p>Products you've added to your favorites</p>
            </div>
            {heartItem.length > 0 ? (
                <div className="headrCard-container">
                    {heartItem.map((item) => (
                        <div key={item.id} className="cart_item">
                            <div className="heart_icon">
                            <CiHeart className="heart_icon_img"/>

                            </div>
                            <img
                                src={item.thumbnail}
                                alt={item.title}
                                className="cart-item-image"
                            />

                            <div className="cart-item-content">
                                <h3>{item.title}</h3>
                                <p>${item.price}</p>

                                <button onClick={() => toggleHeart(item)}>
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="heart_icone">
                    <FiShoppingBag className="shopping" />
                    <h2>Your favorite is empty</h2>
                </div>
            )}
        </div>
    );
}

export default HearttCart;
