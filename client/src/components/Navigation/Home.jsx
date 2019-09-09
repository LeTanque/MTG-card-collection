import React, { Fragment, Component } from 'react'
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';



class Home extends Component {

    bgCardMovement = event => {
        const adjust = 3.5;
        let bgMovement = document.querySelector('.home');
        bgMovement.style.backgroundPositionX= `${-event.pageX / adjust}px`;
        bgMovement.style.backgroundPositionY= `${-event.pageY / adjust}px`;
    }
    
    render() {
        const bgCard = {
            WebkitTransition: 'all', // note the capital 'W' here
            msTransition: 'all', // 'ms' is the only lowercase vendor prefix
            backgroundImage: 'url(' + this.props.randomCardImage + ')',
        };

        if (!this.props.randomCardImage) {
            return (
                <Fragment>
                    <section className="loader">
                        <Loader  type="Grid" color="#ffffff" height={80} width={80} />
                        <code>Loading...</code>
                    </section>
                </Fragment>
            )
        }

        else {
            return (
                <>
                
                    <section className="home-container"  >

                        <div 
                            className="home" 
                            style={bgCard}
                            onMouseMove={(event) => this.bgCardMovement(event)}
                        >
                        </div>
                        
                        <div className="home-button-container">

                            <Link to={{
                                pathname:'/card-search'
                                }}>
                                <button className='btn-red'>
                                    Card Search
                                </button>
                            </Link>

                            <Link to={'/random-pack'}>
                                <button className="btn-red">
                                    Random Pack
                                </button>
                            </Link>

                            <Link to={{
                                pathname:'/collection'
                                }}>
                                <button className='btn-red'>
                                    Collection
                                </button>
                            </Link>

                            <Link to={{
                                pathname:'/admin-tools'
                                }}>
                                <button className='btn-dark'>
                                    Admin Tools
                                </button>
                            </Link>
    
                        </div>

                    </section>
                </>
            );
        }
    }
}



export default Home