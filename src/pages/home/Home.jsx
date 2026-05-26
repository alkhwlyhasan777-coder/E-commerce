import { useEffect, useState } from "react";
import HeroSlider from "../../components/HeroSlider"
import SliderPrpduct from "../../components/product/SliderPrpduct"
import '../home/home.css'
import SliswProductLoading from "../../components/product/SliswProductLoading";
import PageTransition from "../../components/PageTransition";
// import "./index.css";
const categories = [
    "smartphones",
    "laptops",
    "tablets",
    "mens-watches",
    "womens-watches",
    "fragrances",
    "mobile-accessories",
    "womens-bags",
    "motorcycle",
    "sports-accessories",
    "tops",
    "mens-shoes",
    "mens-shirts",
    
]
function Home() {
    // const [products , setProducts] = useState({})
    // useEffect( () => {
    //     const ApiProduct = async () => {
    //         try {
    //             const product = await Promise.all(
    //                 categories.map(async (c) => {
    //                     const res = await fetch(`https://dummyjson.com/products/category-list${c}`);
    //                     const data = await res.json
    //                     return {[c]: data.product}
    //                 })
    //             )
    //             const productData = Object.assign({}, ...product)
    //             setProducts(productData)
    //         } catch (error) {
    //             console.error(error)
    //         }
    //     }
    //     (ApiProduct())
    // }, [])
    // console.log(products)
    const [products, setProducts] = useState({});
    const [loading, setloading] = useState(true);
useEffect(() => {
    const ApiProduct = async () => {
        try {
            const product = await Promise.all(
                categories.map(async (c) => {
                    const res = await fetch(
                        `https://dummyjson.com/products/category/${c}`
                    );
                    const data = await res.json();
                    return {
                        [c]: data.products
                    };
                })
            );
            const productData = Object.assign({}, ...product);
            setProducts(productData);
        } catch (error) {
            console.error(error);
        } finally {
            setloading(false)
        }
    };
    if (categories.length > 0) {
        ApiProduct();
    }
}, []);
//categories
    return (
        <PageTransition>
            <div>
                <HeroSlider />
                {loading ?
                    (
                        categories.map(category => (
                            <SliswProductLoading key={category}/>
                        ))
                    ):
                    (categories.map(category => (
                        <SliderPrpduct key={category} data= {products[category]} title = {category}/>
                    )))
                }
            </div>
            
        </PageTransition>
    )
}

export default Home