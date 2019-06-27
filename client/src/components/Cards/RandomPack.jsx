import React, { Component } from 'react'
import Pack from './Pack.jsx';


class RandomPack extends Component {


    render() {
        return (
            <>
                <section className="cards-nav">
                    <div className="nav-icons">
                        <button
                            onClick={this.props.openPackOfCards}
                            className="btn-red"
                        >
                            Open New Pack
                        </button>
                    </div>
                </section>
                <Pack 
                    allCards={this.props.allCards}
                />
            </>
        )
    }
}


export default RandomPack

