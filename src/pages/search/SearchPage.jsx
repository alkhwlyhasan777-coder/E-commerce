import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Product from "../../components/product/Product";

function SearchPage() {
    const [productResults, setProductResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const location = useLocation();

    const query = new URLSearchParams(location.search).get("q");


    useEffect(() => {

        if (!query) return;


        const getProducts = async () => {

            try {

                setLoading(true);

                const response = await fetch(
                    "https://dummyjson.com/products?limit=0"
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }

                const data = await response.json();


                const filteredProducts = data.products.filter(
                    (product) =>
                        product.title
                            .toLowerCase()
                            .startsWith(query.toLowerCase())
                );


                setProductResults(filteredProducts);

            } catch (error) {

                console.error(error);

                setProductResults([]);

            } finally {

                setLoading(false);

            }
        };


        getProducts();

    }, [query]);


    return (
        <>
            <div style={{ height: "150px" }} />

            <div className="category">

                <h2 className="title_category">
                    Search results for "{query}"
                    ({productResults.length})
                </h2>


                {loading ? (

                    <p>Loading...</p>

                ) : productResults.length === 0 ? (

                    <p>
                        No products found starting with "{query}"
                    </p>

                ) : (

                    <div className="category_product">

                        {productResults.map((item) => (
                            <Product
                                key={item.id}
                                item={item}
                            />
                        ))}

                    </div>

                )}

            </div>
        </>
    );
}

export default SearchPage;