import React, { Fragment, Component } from 'react'
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';




class Home extends Component {
    state = {
        bgSize:"",
        cursorX:"",
        cursorY:""
    }
    
    componentDidUpdate() { 
        let bgMovement = document.querySelector('.home');
        if (bgMovement) {
            bgMovement.addEventListener('mousemove', event => {
                bgMovement.style.backgroundPositionX= `${-event.offsetX}px`;
                bgMovement.style.backgroundPositionY= `${-event.offsetY}px`;
            })
        }
    }
    
    render() {
        const bgCard = {
            WebkitTransition: 'all', // note the capital 'W' here
            msTransition: 'all', // 'ms' is the only lowercase vendor prefix
            backgroundImage: 'url(' + this.props.randomCardImageUrl + ')',
            backgroundSize: `${this.state.bgSize}%`,
            backgroundPositionX: `${this.state.cursorX}px`,
        };


        // console.log("Home.jsx props", this.props);
        // console.log("state cursor X", this.state.cursorX)


        if (!this.props.randomCardImageUrl) {
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
    
                        <div className="home" style={bgCard}>
                        </div>
                        
                        <div className="home-button-container">


                            <Link to={{
                                pathname:'/cardsearch'
                                }}>
                                <button className='btn-red'>
                                    Card Search
                                </button>
                            </Link>


                            <Link to={{
                                pathname:'/randomcard'
                                }}>
                                <button className='btn-gray'>
                                    Random Card
                                </button>
                            </Link>
    
    
                            <Link to={{
                                pathname:'/allcards'
                                }}>
                                <button>
                                    Random pack of Ravnica Allegiance
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