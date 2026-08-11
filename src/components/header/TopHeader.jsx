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