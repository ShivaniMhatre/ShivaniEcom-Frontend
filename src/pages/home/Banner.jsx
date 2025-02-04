import {Link} from 'react-router-dom'
import bannerImg from '../../assets/header.png'

export default function Banner() {
    return (
        <div className="section__container header__container">
            <div className='header__content z-30'>
                <h4 className='uppercase'>UP TO 20% Discount on</h4>
                <h1>Girls Fashion</h1>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam sequi sint quisquam in eius obcaecati. Fugit sunt quas eum soluta dicta, dolorem quae voluptatem veniam iusto eveniet atque consectetur ea cum odio aperiam? Harum, ab minima? </p>
                <button className="btn">
                    <Link to="/shop">
                        Explore Now
                    </Link>
                </button>
            </div>
            <div className='header__image'>
                <img src={bannerImg} alt=''/>
            </div>
        </div>
    )
}
