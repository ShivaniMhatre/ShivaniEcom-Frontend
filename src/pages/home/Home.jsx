import Blogs from "../blogs/Blogs";
import TrendingProducts from "../shop/TrendingProducts";
import Banner from "./Banner";
import Categories from "./Categories";
import Deals from "./Deals";
import HeroSection from "./HeroSection";
import PromoBanner from "./PromoBanner";

export default function Home() {
    return (
        <>
            <Banner />
            <Categories />
            <HeroSection />
            <TrendingProducts />
            <Deals />
            <PromoBanner />
            <Blogs />
        </>
    )
}
