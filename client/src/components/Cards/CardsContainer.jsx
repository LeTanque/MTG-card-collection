import React, { Fragment, Component } from 'react'
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import Loader from 'react-loader-spinner';


class CardsContainer extends Component {


    render() {

        if(this.props.allCards.length === 0) {
            return (
                <Fragment>
                    <section className="loader">
                        <Loader  type="Grid" color="#ffffff" height={80} width={80} />
                        <code>Loading...</code>
                    </section>
                </Fragment>
            )
        } else {

            // console.log("the props in CardsContainer", this.props)
            
            return (
                <>
                <section className="cards-nav">
                    <div className="nav-icons">
                        <MdNavigateBefore className="nav-icon"/> Previous 
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Next 
                            <MdNavigateNext 
                                className="nav-icon"
                                onClick={this.props.goToNextPage}
                            />
                    </div>
                </section>
                <section className="cards-container">
                    {this.props.allCards.map(eachCard => 
                        (
                            <Fragment key={eachCard.id}>
                                <div className="card">
                                    <img src={eachCard.imageUrl} alt={eachCard.name} />
                                </div>
                            </Fragment>
                        ))
                    }
                </section>
                </>
            );
        }
    }
}


export default CardsContainer

