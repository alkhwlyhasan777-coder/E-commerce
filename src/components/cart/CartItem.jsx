// import "./cartItem.css";
// import { useContext, useState } from "react";
// import { CartContext } from "../context/CartContext";
// import { FaTrash, FaLock } from "react-icons/fa";
// import {
//     IoIosAddCircleOutline,
//     IoMdRemoveCircleOutline,
// } from "react-icons/io";

// function CartItem() {
//     const {
//         cartItem,
//         removeProduct,
//         increaseQuantity,
//         decreaseQuantity,
//     } = useContext(CartContext);

//     const [hoveredItem, setHoveredItem] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");

//     const totalPrice = cartItem.reduce(
//         (acc, item) => acc + item.price * item.quantity,
//         0
//     );

//     const handleCheckout = async () => {
//         if (cartItem.length === 0) {
//             return;
//         }

//         setLoading(true);
//         setError("");

//         try {
//             // نرسل فقط productId و quantity
//             // لا نرسل السعر من React
//             const items = cartItem.map((item) => ({
//                 productId: String(item.id),
//                 quantity: item.quantity,
//             }));

//             const response = await fetch(
//                 "http://localhost:5000/api/payments/create-checkout-session",
//                 {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({
//                         items,
//                         customerEmail: "customer@example.com",
//                     }),
//                 }
//             );

//             const data = await response.json();

//             if (!response.ok) {
//                 throw new Error(
//                     data.message || "Failed to create checkout session"
//                 );
//             }

//             console.log("✅ Checkout Session created:", data);

//             // Stripe يعيد لنا URL لصفحة الدفع
//             if (data.url) {
//                 window.location.href = data.url;
//             } else {
//                 throw new Error("Stripe checkout URL was not returned");
//             }

//         } catch (error) {
//             console.error("❌ Checkout Error:", error);

//             setError(
//                 error instanceof Error
//                     ? error.message
//                     : "Something went wrong"
//             );
//         } finally {
//             setLoading(false);
//         }
//     };
//     return (
//         <div className="cart_page">
//             <div style={{ height: "150px" }}></div>

//             {cartItem.length > 0 ? (
//                 <>
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>Product</th>
//                                 <th>Price</th>
//                                 <th>Quantity</th>
//                                 <th>Total</th>
//                                 <th>Remove</th>
//                             </tr>
//                         </thead>

//                         <tbody>
//                             {cartItem.map((item) => (
//                                 <tr
//                                     key={item.id}
//                                     onMouseEnter={() =>
//                                         setHoveredItem(item.id)
//                                     }
//                                     onMouseLeave={() =>
//                                         setHoveredItem(null)
//                                     }
//                                 >
//                                     <td>
//                                         <div className="product_info">
//                                             <img
//                                                 src={item.thumbnail}
//                                                 alt={item.title}
//                                             />

//                                             <div className="product_text">
//                                                 <h3>{item.title}</h3>

//                                                 {hoveredItem === item.id && (
//                                                     <div className="hover_box">
//                                                         <p>
//                                                             <b>Brand : </b>
//                                                             {item.brand}
//                                                         </p>

//                                                         <p>
//                                                             <b>Category : </b>
//                                                             {item.category}
//                                                         </p>

//                                                         <p>
//                                                             <b>Stock : </b>
//                                                             {item.stock}
//                                                         </p>

//                                                         <p>
//                                                             <b>Rating : </b>
//                                                             {item.rating}
//                                                         </p>
//                                                     </div>
//                                                 )}
//                                             </div>
//                                         </div>
//                                     </td>

//                                     <td>${item.price}</td>

//                                     <td>
//                                         <div className="quantity_box">
//                                             <button
//                                                 onClick={() =>
//                                                     decreaseQuantity(item.id)
//                                                 }
//                                             >
//                                                 <IoMdRemoveCircleOutline />
//                                             </button>

//                                             <span>{item.quantity}</span>

//                                             <button
//                                                 onClick={() =>
//                                                     increaseQuantity(item.id)
//                                                 }
//                                             >
//                                                 <IoIosAddCircleOutline />
//                                             </button>
//                                         </div>
//                                     </td>

//                                     <td>
//                                         $
//                                         {(
//                                             item.price *
//                                             item.quantity
//                                         ).toFixed(2)}
//                                     </td>

//                                     <td>
//                                         <button
//                                             className="remove_btn"
//                                             onClick={() =>
//                                                 removeProduct(item.id)
//                                             }
//                                         >
//                                             <FaTrash />
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>

//                         <tfoot>
//                             <tr>
//                                 <td colSpan="5">
//                                     Total Price: $
//                                     {totalPrice.toFixed(2)}
//                                 </td>
//                             </tr>
//                         </tfoot>
//                     </table>

//                     {/* CHECKOUT SECTION */}
//                     <div className="checkout_section">
//                         <div className="checkout_total">
//                             <span>Order Total</span>
//                             <strong>
//                                 ${totalPrice.toFixed(2)}
//                             </strong>
//                         </div>

//                         {error && (
//                             <p className="checkout_error">
//                                 {error}
//                             </p>
//                         )}

//                         {/*  */}
//                         <button 
//                             className="checkout_btn"
//                             onClick={handleCheckout}
//                             disabled={loading || cartItem.length === 0}
//                         >
//                             {loading ? "Redirecting to Stripe..." : "Checkout"}<FaLock />
//                         </button>
//                     </div>
//                 </>
//             ) : (
//                 <h2 className="empty_cart">
//                     Your cart is empty
//                 </h2>
//             )}
//         </div>
//     );
// }

// export default CartItem;
import "./cartItem.css";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { FaTrash, FaLock } from "react-icons/fa";
import {
    IoIosAddCircleOutline,
    IoMdRemoveCircleOutline,
} from "react-icons/io";

function CartItem() {
    const {
        cartItem,
        removeProduct,
        increaseQuantity,
        decreaseQuantity,
    } = useContext(CartContext);

    const [hoveredItem, setHoveredItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const totalPrice = cartItem.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const handleCheckout = async () => {
        if (cartItem.length === 0) return;

        setLoading(true);
        setError("");

        try {
            // نرسل فقط ID والكمية
            // السعر لا نثق به من Frontend
            const items = cartItem.map((item) => ({
                productId: String(item.id),
                quantity: item.quantity,
            }));

            const response = await fetch(
                "http://localhost:5000/api/payments/create-checkout-session",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        items,
                        customerEmail: "customer@example.com",
                    }),
                }
            );

            const data = await response.json();
            console.log(data)
            console.log(data.checkoutUrl)
            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to create checkout session"
                );
            }

            if (!data.checkoutUrl) {
                throw new Error("Stripe checkout URL was not returned");
            }
            window.location.href = data.checkoutUrl;
        } catch (error) {
            console.error("Checkout Error:", error);
            setError(
                error instanceof Error
                    ? error.message
                    : "Something went wrong"
            );
            setLoading(false);
        }
    };
    return (
        <div className="cart_page">
            <div style={{ height: "150px" }} />
            {cartItem.length > 0 ? (
                <>
                    <table>
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
                                                            <b>Brand : </b>
                                                            {item.brand}
                                                        </p>

                                                        <p>
                                                            <b>Category : </b>
                                                            {item.category}
                                                        </p>

                                                        <p>
                                                            <b>Stock : </b>
                                                            {item.stock}
                                                        </p>

                                                        <p>
                                                            <b>Rating : </b>
                                                            {item.rating}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </td>

                                    <td>
                                        ${item.price}
                                    </td>

                                    <td>
                                        <div className="quantity_box">

                                            <button
                                                onClick={() =>
                                                    decreaseQuantity(item.id)
                                                }
                                            >
                                                <IoMdRemoveCircleOutline />
                                            </button>

                                            <span>
                                                {item.quantity}
                                            </span>

                                            <button
                                                onClick={() =>
                                                    increaseQuantity(item.id)
                                                }
                                            >
                                                <IoIosAddCircleOutline />
                                            </button>

                                        </div>
                                    </td>

                                    <td>
                                        $
                                        {(
                                            item.price *
                                            item.quantity
                                        ).toFixed(2)}
                                    </td>

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

                    {/* Checkout */}

                    <div className="checkout_section">

                        <div className="checkout_total">
                            <span>
                                Order Total
                            </span>

                            <strong>
                                ${totalPrice.toFixed(2)}
                            </strong>
                        </div>

                        {error && (
                            <p className="checkout_error">
                                {error}
                            </p>
                        )}

                        <button
                            type="button"
                            className="checkout_btn"
                            onClick={handleCheckout}
                            disabled={loading}
                        >
                            {loading
                                ? "Redirecting to Stripe..."
                                : "Checkout"}

                            {!loading && <FaLock />}
                        </button>

                    </div>
                </>
            ) : (
                <h2 className="empty_cart">
                    Your cart is empty
                </h2>
            )}
        </div>
    );
}

export default CartItem;