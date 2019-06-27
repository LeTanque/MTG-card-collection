import React, { Fragment, Component } from 'react'
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';





class Home extends Component {
    state = {
        bgSize:"",
        cursorX:"",
        cursorY:"",
        visited: false
    }
    
    componentDidUpdate(prevProps, prevState) {
        // console.log("previous Props", prevProps)
        // console.log("Props", this.props)
        // console.log("previous State", prevState)
        // console.log("State", this.state)
        if(prevProps !== this.props || this.state.visited === true){
            let bgMovement = document.querySelector('.home');
            if (bgMovement) {
                bgMovement.addEventListener('mousemove', event => {
                    bgMovement.style.backgroundPositionX= `${-event.offsetX}px`;
                    bgMovement.style.backgroundPositionY= `${-event.offsetY}px`;
                })
            }
        }
    }

    componentDidMount() {
        this.setState({
            visited: true
        })
    }
    
    render() {
        const bgCard = {
            WebkitTransition: 'all', // note the capital 'W' here
            msTransition: 'all', // 'ms' is the only lowercase vendor prefix
            backgroundImage: 'url(' + this.props.randomCardImageUrl + ')',
            // backgroundSize: `${this.state.bgSize}%`,
            // backgroundPositionX: `${this.state.cursorX}px`,
        };

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

                        <div 
                            className="home" 
                            style={bgCard}
                        ></div>
                        
                        <div className="home-button-container">

                            <Link to={{
                                pathname:'/card-search'
                                }}>
                                <button className='btn-red'>
                                    Card Search
                                </button>
                            </Link>

                            {/* <Link to={{
                                pathname:'/random-card'
                                }}>
                                <button className='btn-gray'>
                                    Random Card
                                </button>
                            </Link> */}
        
                            <Link to={'/random-pack-rna'}>
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