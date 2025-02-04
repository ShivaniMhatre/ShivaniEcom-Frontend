import dealsImg from '../../assets/deals.png'

export default function Deals() {
    return (
        <section className="section__container deals__container">
            <div className='deals__image'>
                <img src={dealsImg} />
            </div>
            <div className='deals__content'>
                <h5>Get Up to 20% Discount</h5>
                <h4>Deals Of This Month</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias accusantium totam velit ad reprehenderit excepturi!</p>
                <div className='deals__countdown flex-wrap '>
                    <div className='deals__countdown__card'>
                        <h4>14</h4>
                        <p>Days</p>
                    </div>
                    <div className='deals__countdown__card'>
                        <h4>20</h4>
                        <p>Hrs</p>
                    </div>
                    <div className='deals__countdown__card'>
                        <h4>15</h4>
                        <p>Mins</p>
                    </div>
                    <div className='deals__countdown__card'>
                        <h4>05</h4>
                        <p>Secs</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
