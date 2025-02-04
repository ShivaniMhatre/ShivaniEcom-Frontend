import { Link, useParams } from "react-router-dom";
import RatingStars from "../../../components/RatingStars";
import { useDispatch } from "react-redux";
import { useFetchSingleProductQuery } from "../../../redux/features/products/productApi";
import { addToCart } from "../../../redux/features/cart/CartSlice";
import ReviewCard from "../reviews/ReviewCard";

export default function SingleProduct() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { data, error, isLoading } = useFetchSingleProductQuery(id);

    const singleProduct = data?.product || {};
    const productReviews = data?.reviews || [];

    if (isLoading) return <p>Loading.....</p>
    if (error) return <p>Error While Loading Product Details...</p>

    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }
    return (
        <>
            <section className='section__container bg-primary-light'>
                <h2 className='section__header capitalize'>Single Product Page</h2>
                <div className="section__subheader space-x-2">
                    <span className="hover:text-primary"><Link to="/">home</Link></span>
                    <i className="ri-arrow-right-s-line"></i>
                    <span className="hover:text-primary"><Link to="/shop">shop</Link></span>
                    <i className="ri-arrow-right-s-line"></i>
                    <span className="hover:text-primary">{singleProduct?.name}</span>
                </div>
            </section>

            <section className="section__container mt-8">
                <div className="flex flex-col items-center md:flex-row gap-8">
                    {/* Product Image */}
                    <div className="md:w-1/2 w-full">
                        <img src={singleProduct?.image} alt=""
                            className="rounded-md w-full h-auto"
                        />
                    </div>
                    <div className="md:w-1/2 w-full">
                        <h3 className="text-2xl font-semibold mb-4">{singleProduct?.name}</h3>
                        <p className="text-xl text-primary mb-4">
                            &#8377;{singleProduct?.price}
                            {singleProduct?.oldPrice && <s className="ml-2">&#8377;{singleProduct?.oldPrice}</s>}
                        </p>
                        <p className="text-gray-700 mb-4">{singleProduct.description}</p>
                        {/* Addotional Product Info */}
                        <div className="flex flex-col space-y-2">
                            <p><strong>Category:</strong> {singleProduct?.category}</p>
                            <p><strong>Color:</strong> {singleProduct?.color}</p>
                            <div className="flex gap-1 items-center">
                                <strong>Rating :</strong>
                                <RatingStars rating={singleProduct?.rating} />
                            </div>
                        </div>

                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                handleAddToCart(singleProduct)
                            }}
                            className="mt-6 px-6 py-3 bg-primary text-white rounded-md"
                        >
                            Add To Cart
                        </button>
                    </div>
                </div>
            </section>

            {/* Displat Reviews */}
            {/* Todo work with review when we have api */}
            <section className="section__container mt-8">
                <ReviewCard productReviews={productReviews}/>
            </section>
        </>
    )
}
