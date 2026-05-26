
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Product from "../../components/product/Product";

function SearchPage() {
    const [productResults , setProductResults] = useState([])
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("q");
    console.log(location.search);
    console.log(query);
    useEffect(() => {
        const results = async () => {
            try {
                const response = await fetch(
                    `https://dummyjson.com/products/search?q=${query}`
                );
                const data = await response.json();
                setProductResults(data.products || []);
            } catch (error) {
                console.error(error);
            } finally {
                // setProductResults(false)
            }
        };
        if(query)results();
    }, [query]);

console.log(productResults)
    return (
        <>
            <div style={{ height: "150px" }} />
            <div>
            </div>
            <div className="category">
                <div><h2 className="title_category">
                Search results for {query}  ({productResults.length})
                </h2></div>
                <div className="category_product">
                    {productResults.map((item, index) => (
                        <Product key={index} item={item} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default SearchPage;