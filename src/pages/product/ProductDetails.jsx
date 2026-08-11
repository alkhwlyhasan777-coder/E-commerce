import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./productDetails.css";
import "../../components/product/product.css";
// Icons
import { CiHeart } from "react-icons/ci";
import { FaShare } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";
// Swiper Style
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// Components
import SliderPrpduct from "../../components/product/SliderPrpduct";
import ProductDetailsLoading from "./ProductDetailsLoading";
import SliswProductLoading from "../../components/product/SliswProductLoading";
// Context
import { CartContext } from "../../components/context/CartContext";
import PageTransition from "../../components/PageTransition";
function ProductDetails() {
    const { id } = useParams();
    // =========================
    // Context
    // =========================
    const {
        cartItem,
        heartItem,
        toggleCart,
        toggleHeart,
    } = useContext(CartContext);

    //  =========================//  States  // =========================  //
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [loadingRelatedProduct, setLoadingRelatedProduct] =
        useState(true);

    const [mainImg, setMainImg] = useState("");

    const [shared, setShared] = useState(false);

    // =========================  //  Fetch Product  // =========================  //
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);

                const res = await fetch(
                    `https://dummyjson.com/products/${id}`
                );

                if (!res.ok) {
                    throw new Error("Failed to fetch product");
                }

                const data = await res.json();

                setProduct(data);
                setMainImg(data?.images?.[0] || "");
            } catch (error) {
                console.error("Product Details Error:", error);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    // =========================  //  Fetch Related Products  // =========================
    useEffect(() => {
        if (!product?.category) return;

        const fetchRelatedProducts = async () => {
            try {
                setLoadingRelatedProduct(true);

                const res = await fetch(
                    `https://dummyjson.com/products/category/${product.category}`
                );

                if (!res.ok) {
                    throw new Error(
                        "Failed to fetch related products"
                    );
                }

                const data = await res.json();

                // Remove current product
                const filteredProducts = data.products.filter(
                    (item) => item.id !== product.id
                );

                setRelatedProduct(filteredProducts);
            } catch (error) {
                console.error(
                    "Related Products Error:",
                    error
                );
            } finally {
                setLoadingRelatedProduct(false);
            }
        };

        fetchRelatedProducts();
    }, [product]);

    // =========================  // Check Product Status  // =========================
    const inCart = cartItem.some(
        (item) => item.id === product?.id
    );

    const inHeart = heartItem.some(
        (item) => item.id === product?.id
    );
    // =========================  // Share Button  // =========================
    const toggleShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: product.title,
                    text: product.description,
                    url: window.location.href,
                });
            } else {
                setShared((prev) => !prev);
                alert("Sharing not supported");
            }
        } catch (error) {
            console.log(error);
        }
    };

    // =========================
    // Loading State
    // =========================
    if (loading) {
        return <ProductDetailsLoading />;
    }
    // =========================   // Product Not Found   // =========================
    if (!product?.id) {
        return (
            <div className="container">
                <h1>Product Not Found...</h1>
            </div>
        );
    }
    // =========================  // JSX  // =========================
    return (
        <PageTransition key={id}>
            <div>
                <div style={{ height: "150px" }} />
                <div className="item_details">
                    <div className="container">
                        <div className="data_img_item">
                            {/* Images */}
                            <div className="imgs_item">

                                {/* Main Image */}
                                <div className="big_img">
                                    <img
                                        src={mainImg}
                                        alt={product.title}
                                    />
                                </div>

                                {/* Small Images */}
                                <div className="sm_img">
                                    {product?.images?.map(
                                        (img, index) => (
                                            <img
                                                key={index}
                                                src={img}
                                                alt={`product-${index}`}
                                                onClick={() =>
                                                    setMainImg(img)
                                                }
                                                className={
                                                    mainImg === img
                                                        ? "active"
                                                        : ""
                                                }
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                            {/* Details */}
                            <div className="details-item">

                                {/* Title */}
                                <h1 className="name">
                                    {product.title}
                                </h1>

                                {/* Stars */}
                                <div className="stars">
                                    {Array.from({
                                        length: 4,
                                    }).map((_, i) => (
                                        <FaStar key={i} />
                                    ))}

                                    <FaStarHalfAlt />
                                </div>

                                {/* Price */}
                                <p className="price">
                                    $ {product.price}
                                </p>

                                {/* Availability */}
                                <h4 className="availability">
                                    Availability :
                                    <span>
                                        {" "}
                                        {product.availabilityStatus ||
                                            "In Stock"}
                                    </span>
                                </h4>

                                {/* Brand */}
                                {/* <p className="brand">
                                    Brand :
                                    <span>
                                        {" "}
                                        {product.brand ||
                                            "Unknown"}
                                    </span>
                                </p> */}

                                {/* Description */}
                                <p className="description">
                                    {product.description}
                                </p>
                                <p className="stock">
                                    Hurry up! only
                                    <span>
                                        {" "}
                                        {product.stock}{" "}
                                    </span>
                                    products left in stock.
                                </p>

                                {/* Add To Cart */}
                                <button
                                    className={`btn ${inCart ? "active" : ""
                                        }`}
                                    onClick={() =>
                                        toggleCart(product)
                                    }
                                >
                                    {/* <IoCartOutline /> */}

                                    {inCart
                                        ? " Remove From Cart"
                                        : " Add To Cart"}
                                </button>

                                {/* Icons */}
                                <div className="icons">

                                    {/* Heart */}
                                    <button
                                        className={`box ${inHeart
                                                ? "active"
                                                : ""
                                            }`}
                                        onClick={() =>
                                            toggleHeart(product)
                                        }
                                    >
                                        <CiHeart />
                                    </button>

                                    {/* Share */}
                                    <button
                                        className={`box ${shared
                                                ? "active"
                                                : ""
                                            }`}
                                        onClick={toggleShare}
                                    >
                                        <FaShare />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {loadingRelatedProduct ? (
                    <SliswProductLoading />
                ) : (
                    <SliderPrpduct
                        key={product.category}
                        data={relatedProduct}
                        title={
                            product?.category?.replace(
                                "-", " "
                            ) || "Related Products"
                        }
                    />
                )}
            </div>
        </PageTransition>
    );
}

export default ProductDetails;