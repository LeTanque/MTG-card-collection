import React from 'react'
import Pack from '../Cards/Pack.jsx';
import CardStatus from '../Cards/CardStatus.jsx';



const RandomPack = props => {
    return (
        <>
            <section className="cards-nav">
                <div className="nav-icons">
                    <div className="nav-icon">
                        <div>
                            <button
                                onClick={() => props.getPackOfCards("m20")}
                                className="btn-red"
                            >
                                Core 2020
                            </button>
                            <button
                                onClick={() => props.getPackOfCards("war")}
                                className="btn-red"
                            >
                                War of the Spark
                            </button>
                            <button
                                onClick={() => props.getPackOfCards("rna")}
                                className="btn-red"
                            >
                                Ravnica Allegiance
                            </button>
                            <button
                                onClick={() => props.getPackOfCards("grn")}
                                className="btn-red"
                            >
                                Guilds of Ravnica
                            </button>
                            <button
                                onClick={() => props.getPackOfCards("dom")}
                                className="btn-red"
                            >
                                Dominaria
                            </button>
                            <button
                                onClick={() => props.getPackOfCards("rix")}
                                className="btn-red"
                            >
                                Rivals of Ixalan
                            </button>
                            <button
                                onClick={() => props.getPackOfCards("xln")}
                                className="btn-red"
                            >
                                Ixalan
                            </button>
                            <button
                                onClick={() => props.getPackOfCards("akh")}
                                className="btn-red"
                            >
                                Amonket
                            </button>
                            
                        </div>
                    </div>
                </div>
            </section>
            <Pack 
                allCards={props.allCards}
                statusCheck={props.statusCheck}
            />
            <CardStatus 
                status={props.status}
            />
        </>
    )

}


export default RandomPack

