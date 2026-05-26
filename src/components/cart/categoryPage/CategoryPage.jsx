import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "../../product/Product";
import '../../product/product.css'
function CategoryPage() {
    const { category } = useParams();
    const [productCategory, setProductCategory] = useState([]);
    useEffect(() => {
        fetch(`https://dummyjson.com/products/category/${category}`)
            .then((res) => res.json())
            .then((data) => {
                setProductCategory(data.products);
            });
    }, [category]);
    return (
        <>
            <div style={{ height: "150px" }}></div>
            <div className="category">
                <div><h2 className="title_category">{category} {productCategory.length}</h2></div>
                <div className="category_product">
                    {productCategory.map((item, index) => (
                        <Product key={index} item={item} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default CategoryPage;