import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import './searchbox.css'

function SearchBox() {
    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const timeout = setTimeout(async () => {
            if (search.trim()) {
                try {
                    const response = await fetch(
                        `https://dummyjson.com/products/search?q=${search}`
                    );
                    const data = await response.json();
                    setSuggestions(data.products || []);
                } catch (error) {
                    console.log(error);
                }
            } else {
                setSuggestions([]);
            }
        }, 400);
        return () => clearTimeout(timeout);
    }, [search]);
    return (
        <div className="search_box_container">
            <div className="search_box_wrapper">
                <form className="d-flex gap-3 search_box border">
                    <input
                        type="text"
                        placeholder="Search For Products"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={() => {
                            if (search.trim()) {
                                navigate(
                                    `/search?q=${encodeURIComponent(search)}`
                                );
                            }
                        }}
                    >
                        <CiSearch />
                    </button>
                </form>
                {suggestions.length > 0 && (
                    <div className="search_suggestions">
                        {suggestions.slice(0, 5).map((item) => (
                            <div
                                key={item.id}
                                className="suggestion_item"
                                onClick={() => {
                                    navigate(
                                        `/search?q=${encodeURIComponent(item.title)}`
                                    );
                                    setSearch(item.title);
                                    setSuggestions([]);
                                }}
                            >
                                <img
                                    src={item.thumbnail}
                                    alt={item.title}
                                    width="50"
                                />
                                <p>{item.title}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchBox;
// import { useEffect, useState } from "react";
// import { CiSearch } from "react-icons/ci";
// import { useNavigate } from "react-router-dom";

// function SearchBox() {
//     const [search, setSearch] = useState("");
//     const navigate = useNavigate();
//     useEffect(() => {
//         const timeout = setTimeout(() => {
//             if (search.trim()) {
//                 navigate(
//                     `/search?q=${encodeURIComponent(search.trim())}`
//                 );
//             } else {
//                 navigate("/");
//             }
//         }, 500);
//         return () => clearTimeout(timeout);
//     }, [search, navigate]);

//     return (
//         <div className='search_box_container'>
//             <form className="d-flex gap-3 search_box border">
//                 <input
//                     type="text"
//                     placeholder="Search For Products"
//                     // value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                 />

//                 <button type="submit">
//                     <CiSearch />
//                 </button>
//             </form>
//         </div>
//     );
// }

// export default SearchBox;