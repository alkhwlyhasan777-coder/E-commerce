import {
    FaStar,
    FaShare,
    // FaCartShopping,
} from "react-icons/fa6";
import { AiOutlineShoppingCart } from "react-icons/ai";

import {
    FaStarHalfAlt,
    FaCheck,
} from "react-icons/fa";

import { CiHeart } from "react-icons/ci";
import './product.css'
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useContext, useState } from "react";
function Product({ item = {} }) {
    const {
        cartItem,
        heartItem,
        toggleCart,
        toggleHeart,
    } = useContext(CartContext);

    const inCart = cartItem.some(
        (i) => i.id === item.id
    );
    const inHeart = heartItem.some(
        (i) => i.id === item.id
    );
        const [shared, setShared] = useState(false);
        const toggleShare = async () => {
            const shareUrl =
                `${window.location.origin}/products/${item.id}`;
            try {
                if (navigator.share) {
                    await navigator.share({
                        title: item.title,
                        text: item.description,
                        url: shareUrl,
                    });
                    setShared(true);
                } else {
                    await navigator.clipboard.writeText(
                        shareUrl
                    );
                    alert("Product link copied");
                    setShared(true);
                }
            } catch (error) {
                console.log("Share Error:", error);
            }
    };
    return (
        <div className={`product ${inCart ? "in-cart" : ""}`}>
            <Link to={`/products/${item.id}`}>
                {inCart && (
                    <div className="status">
                        <FaCheck /> in cart
                    </div>
                )}
                <div className="img_product">
                    <img
                        src={item?.images?.[0] || "/placeholder.png"}
                        alt={item.title}
                    />
                </div>

                <p className="name_product">
                    {item.title}
                </p>

                <div className="stars">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStarHalfAlt />
                </div>

                <div className="price">
                    ${item.price}
                </div>

            </Link>
            <div className="icons">
                {/* CART */}
                <span
                    className={`btn ${ inCart ? "active" : ""}`}
                    onClick={() =>
                        toggleCart(item)
                    }
                    >
                    <AiOutlineShoppingCart id="item_card" />
                </span>
                <span
                    className={`btn_hear ${inHeart ? "active" : ""}`}
                    onClick={() => toggleHeart(item)}
                >
                    <CiHeart />
                </span>
                <span
                    className={`box ${shared ? "active" : ""}`}
                    onClick={(e) => {
                        e.preventDefault();
                        toggleShare();
                    }}
                >
                    <FaShare />
                </span>
            </div>
        </div>
    );
}
export default Product;