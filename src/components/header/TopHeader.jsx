// // import React from "react";
// import { Link } from "react-router-dom";
// import "../../components/header/header.css" // Style topheader
// import Logo from "../../image/logo.webp";
//     // React Icon
// import { CiSearch } from "react-icons/ci";
// import { CiHeart } from "react-icons/ci";
// import { FaCartShopping } from "react-icons/fa6";
// import { useContext } from "react";
// import { CartContext } from "../context/CartContext";

// function TopHeader() {
//     const { cartItem } = useContext(CartContext)
//     console.log(cartItem)
//     return (

            
//         <div className="top-header">
//             <div className="container">
//                 <nav className="d-flex content-nav">
//                     <Link to="/">
//                         <img src={Logo} alt="logo" className="logo" />
//                     </Link>
//                     <form action="" className="d-flex gap-3 search_box border " >
//                         <input type="text" name="Search" id="Search" placeholder="Search For Products" />
//                         <button type="submit"> <CiSearch /></button>
//                     </form>
//                     <div className="header_icon d-flex gap-3">
//                         <div className="icon">
//                             <CiHeart />
//                             <span>0</span>
//                         </div>
//                         <Link to="../cart/CartItem" className="icon">
//                             <FaCartShopping />
//                             <span>{cartItem.length}</span>
//                         </Link>
//                     </div>
//                 </nav>
//             </div>
//         </div>
//     );
// }

// export default TopHeader;
import { Link } from "react-router-dom"; 
import "../../components/header/header.css"
import Logo from "../../image/logo.webp";
import { CiHeart } from "react-icons/ci";
import { FaCartShopping } from "react-icons/fa6";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import SearchBox from "./SearchBox";

function TopHeader() {

    const { cartItem, heartItem } = useContext(CartContext)

    return (
        <div className="top-header">
            <div className="container">

                <nav className="d-flex content-nav">

                    <Link to="/">
                        <img src={Logo} alt="logo" className="logo" />
                    </Link>
                    <SearchBox/>
                    <div className="header_icon d-flex gap-3">

                        <Link to="/heartCart" className="icon">
                            <CiHeart />
                            <span>{heartItem?.length || 0}</span>
                        </Link>

                        <Link to="/cart" className="icon">
                        
                            <FaCartShopping />
                            <span>{cartItem?.length || 0}</span>
                        </Link>

                    </div>

                </nav>

            </div>
        </div>
    );
}

export default TopHeader;