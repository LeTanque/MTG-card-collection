import React from 'react';
import Loader from 'react-loader-spinner';

import Pack from '../Cards/Pack.jsx';
import CardStatus from '../Cards/CardStatus.jsx';


class RandomPack extends React.Component {
    
    
    render() {

        if (this.props.searchResultPlaceholder === "Searching...") {
            return (
                <>
                    <section className="loader">
                        <Loader  type="Grid" color="#ffffff" height={80} width={80} />
                        <code>Loading...</code>
                    </section>
                    <CardStatus 
                        status={this.props.status}
                    />
                </>
            )
        }
        return (
            <>
                <section className="cards-nav">
                    <div className="nav-icons">
                        <div className="nav-icon">
                            <div>
                                <button
                                    onClick={() => this.props.getPackOfCards("war")}
                                    className="btn-red"
                                >
                                    War of the Spark
                                </button>
                                <button
                                    onClick={() => this.props.getPackOfCards("rna")}
                                    className="btn-red"
                                >
                                    Ravnica Allegiance
                                </button>
                                <button
                                    onClick={() => this.props.getPackOfCards("grn")}
                                    className="btn-red"
                                >
                                    Guilds of Ravnica
                                </button>
                                <button
                                    onClick={() => this.props.getPackOfCards("dom")}
                                    className="btn-red"
                                >
                                    Dominaria
                                </button>
                                <button
                                    onClick={() => this.props.getPackOfCards("rix")}
                                    className="btn-red"
                                >
                                    Rivals of Ixalan
                                </button>
                                <button
                                    onClick={() => this.props.getPackOfCards("xln")}
                                    className="btn-red"
                                >
                                    Ixalan
                                </button>
                                <button
                                    onClick={() => this.props.getPackOfCards("akh")}
                                    className="btn-red"
                                >
                                    Amonket
                                </button>
                                <button
                                    onClick={() => this.props.getPackOfCards("aer")}
                                    className="btn-red"
                                >
                                    Aether Revolt
                                </button>
                                <button
                                    onClick={() => this.props.getPackOfCards("emn")}
                                    className="btn-red"
                                >
                                    Eldritch Moon
                                </button>
                                <button
                                    onClick={() => this.props.getPackOfCards("soi")}
                                    className="btn-red"
                                >
                                    Shadows over Innistrad
                                </button>
                                <button
                                    onClick={() => this.props.getPackOfCards("ogw")}
                                    className="btn-red"
                                >
                                    Oath of the Gatewatch
                                </button>
                                <button
                                    onClick={() => this.props.getPackOfCards("bfz")}
                                    className="btn-red"
                                >
                                    Battle for Zendikar
                                </button>
                                <button
                                    onClick={() => this.props.getPackOfCards("dtk")}
                                    className="btn-red"
                                >
                                    Dragons of Tarkir
                                </button>
                                <button
                                    onClick={() => this.props.getPackOfCards("frf")}
                                    className="btn-red"
                                >
                                    Fate Reforged
                                </button>
                                <button
                                    onClick={() => this.props.getPackOfCards("ktk")}
                                    className="btn-red"
                                >
                                    Khans of Tarkir
                                </button>
                                <button
                                    onClick={() => this.props.getPackOfCards("jou")}
                                    className="btn-red"
                                >
                                    Journey into Nyx
                                </button>
                                <button
                                    onClick={() => this.props.getPackOfCards("bng")}
                                    className="btn-red"
                                >
                                    Born of the Gods
                                </button>
                                <button
                                    onClick={() => this.props.getPackOfCards("ths")}
                                    className="btn-red"
                                >
                                    Theros
                                </button>
                                <button
                                    onClick={() => this.props.getPackOfCards("dgm")}
                                    className="btn-red"
                                >
                                    Dragon's Maze
                                </button>
                                
                            </div>
                        </div>
                    </div>
                </section>
                <Pack 
                    packOfCards={this.props.packOfCards}
                    statusCheck={this.props.statusCheck}
                />
                <CardStatus 
                    status={this.props.status}
                />
            </>
        )
    }
}



export default RandomPack

