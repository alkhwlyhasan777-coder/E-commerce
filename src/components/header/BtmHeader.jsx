// import React from "react";
// import { Link } from "react-router-dom"; 
import "../../components/header/header.css"
import { useEffect, useState } from "react";
import { Link ,useLocation } from "react-router-dom";
    // React Icon ;
import { IoMdMenu } from "react-icons/io";
import { MdArrowDropDown } from "react-icons/md";
import { PiSignIn } from "react-icons/pi";
import { FaUserPlus } from "react-icons/fa";
import { FaThList } from "react-icons/fa";
const NavLink = [
    { title: "Home" , url:"/"},
    { title: "About" , url:"/about"},
    { title: "Contact" , url:"/contact"},
]
function BtnHeader() {
    //useLocation
    const location = useLocation()
    // useState
    const [list , setList]= useState(false)
    const [listNav , setListNav]= useState(false)
    const [categories, setCategories] = useState([])
    useEffect(() => {
        setList(false)
    } , [location])
    useEffect(() => {
        fetch('https://dummyjson.com/products/categories')
            .then(res => res.json())
            .then(data =>  setCategories(data) )
    }, [])
    return (
        <div className="btm_header">
            <div className="container">
                <div className="content-btm_header  position-relative d-flex">
                    <nav className="d-flex" gap-4
                        style={{
                            width:"60%",
                            height: "55px",
                            justifyContent: "space-between",
                            alignItems:"center"
                        }}>
                        <div className="category-nav">
                            <div className="category_btn" onClick={
                                ()=>setList(!list)
                            }>
                                <IoMdMenu />
                                <p>Category</p>
                                <MdArrowDropDown className="dropdown"/>
                            </div>
                            <div className={`category_nav_list ${!list ? "active" : ""}`} >
                                {
                                    categories.map(c => (
                                        <Link to={`/category/${c.slug}`} key={c.slug} >
                                            {c.name}
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="nav_links">
                        {NavLink.map((link, index) => (
                                <Link
                                    key={index}
                                    className={
                                    location.pathname === link.url ? "active" : ""
                                    }
                                    to={link.url}
                                >
                                    {link.title}
                                </Link>
                            ))} 
                            {/* {NavLink.map(link => (
                                <Link
                                    className={
                                        location.pathname === link.url ? "active" : ""
                                    }
                                    to={link.url}
                                >
                                    {link.title}
                                </Link>
                            ))} */}
                        </div>
                        <div className={ `nav_links-mobile ${!listNav ? "active" : ""}`}>
                            
                            {NavLink.map(link => (
                                <Link
                                    className={
                                        location.pathname === link.url ? "active" : ""
                                    }
                                    to={link.url}
                                >
                                    {link.title}
                                </Link>
                            ))}
                        </div>
                        <Link to="/"className="custom-link" onClick={()=>setListNav(!listNav)}>
                            <FaThList />
                        </Link>
                    </nav>
                    <div className="sign-regst d-flex">
                        <Link to="/"><PiSignIn/></Link>
                        <Link to="/"><FaUserPlus /> </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BtnHeader