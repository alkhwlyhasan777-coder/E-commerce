
// export default CartItem;
import "./cartItem.css";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { FaTrash } from "react-icons/fa";
import { IoIosAddCircleOutline, IoMdRemoveCircleOutline } from "react-icons/io";

function CartItem() {
    const {
        cartItem,
        removeProduct,
        increaseQuantity,
        decreaseQuantity,
    } = useContext(CartContext);
    const [hoveredItem, setHoveredItem] = useState(null);
    const totalPrice = cartItem.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );
    return (
        <div className="cart_page">
            <div style={{ height: "150px" }}></div>
            {cartItem.length > 0 ? (
                <table >
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Remove</th>
                        </tr>
                    </thead>

                    <tbody>
                        {cartItem.map((item) => (
                            <tr
                                key={item.id}
                                onMouseEnter={() =>
                                    setHoveredItem(item.id)
                                }
                                onMouseLeave={() =>
                                    setHoveredItem(null)
                                }
                            >
                                <td>
                                    <div className="product_info">
                                        <img
                                            src={item.thumbnail}
                                            alt={item.title}
                                        />
                                        <div className="product_text">
                                            <h3>{item.title}</h3>
                                            {hoveredItem === item.id && (
                                                <div className="hover_box">
                                                    <p>
                                                        <b>Brand : </b> {item.brand}
                                                    </p>

                                                    <p>
                                                        <b> Category : </b>{" "}
                                                        {item.category}
                                                    </p>

                                                    <p>
                                                        <b>Stock : </b> {item.stock}
                                                    </p>

                                                    <p>
                                                        <b>Rating : </b> {item.rating}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </td>
                                <td>${item.price}</td>
                                {/* QUANTITY */}
                                <td>
                                    <div className="quantity_box">
                                        <button
                                            onClick={() =>
                                                decreaseQuantity(
                                                    item.id
                                                )
                                            }
                                        >
                                            <IoMdRemoveCircleOutline/>
                                        </button>

                                        <span>
                                            {item.quantity} 
                                        </span>

                                        <button
                                            onClick={() =>
                                                increaseQuantity(
                                                    item.id
                                                )
                                            }
                                        >
                                            <IoIosAddCircleOutline/>
                                        </button>
                                    </div>
                                </td>

                                {/* TOTAL */}
                                <td>
                                    $
                                    {(
                                        item.price *
                                        item.quantity
                                    ).toFixed(2)}
                                </td>

                                {/* REMOVE */}
                                <td>
                                    <button
                                        className="remove_btn"
                                        onClick={() =>
                                            removeProduct(item.id)
                                        }
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                    <tfoot>
                        <tr>
                            <td colSpan="5">
                                Total Price: $
                                {totalPrice.toFixed(2)}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            ) : (
                <h2 className="empty_cart">
                    Your cart is empty
                </h2>
            )}
        </div>
    );
}

export default CartItem;