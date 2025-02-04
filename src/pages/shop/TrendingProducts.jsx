import { useState } from "react";
import ProductCards from "./ProductCards";
import products from '../../data/products.json';

export default function TrendingProducts() {
    const [visibleProduct, setVisibleProduct] = useState(8);

    const loadMoreProducts = () => {
        setVisibleProduct(prevCount => prevCount + 4)
    }
    return (
        <section className="section__container  product__container">
            <h2 className="section__header">Trending Products</h2>
            <p className="section__subheader">Lorem ipsum dolor sit amet consectetur adipisicing elit. Id cumque delectus aliquam iusto, iure nostrum?</p>

            {/* Product Cards */}
            <div className="mt-12">
                <ProductCards products={products.slice(0,visibleProduct)} />
            </div>

            {/* Load More Product button */}
            <div className="product__btn">
                {
                    visibleProduct < products.length && (
                        <button className="btn" onClick={loadMoreProducts}>
                            Load More
                        </button>
                    )
                }
            </div>
        </section>
    )
}
