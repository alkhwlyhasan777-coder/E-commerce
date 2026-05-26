// import { useContext } from "react"

// import { CartContext } from "../context/CartContext"
// import './heart.css'

// function HearttCart() {
//     console.log("Heart Page")
//     const { heartItem } = useContext(CartContext)
//         console.log(heartItem);
        
//     return (

//         <div className="cart_page">

//             <div style={{ height: "150px" }}></div>

//             {heartItem.length > 0 ? (

//                 heartItem.map((item) => (

//                     <div key={item.id} className="cart_item">

//                         <img
//                             src={item.thumbnail}
//                             alt={item.title}
//                             width="100"
//                         />

//                         <div>
//                             <h3>{item.title}</h3>
//                             <p>${item.price}</p>
//                         </div>

//                     </div>
//                 ))

//             ) : (

//                 <h2>Your favorite is empty</h2>

//             )}

//         </div>
//     )
// }

// export default HearttCart

import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./heart.css";

function HearttCart() {

    const { heartItem, toggleHeart } =
        useContext(CartContext);

    return (

        <div className="cart_page">

            <div style={{ height: "150px" }} />

            {
                heartItem.length > 0 ? (

                    heartItem.map((item) => (

                        <div
                            key={item.id}
                            className="cart_item"
                        >

                            <img
                                src={item.thumbnail}
                                alt={item.title}
                                width="100"
                            />

                            <div>

                                <h3>{item.title}</h3>

                                <p>${item.price}</p>

                                <button
                                    onClick={() =>
                                        toggleHeart(item)
                                    }
                                >
                                    Remove
                                </button>

                            </div>

                        </div>
                    ))

                ) : (

                    <h2>
                        Your favorite is empty
                    </h2>

                )
            }

        </div>
    );
}

export default HearttCart;