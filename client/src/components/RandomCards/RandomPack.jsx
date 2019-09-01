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
                            <button
                                onClick={() => props.getPackOfCards("aer")}
                                className="btn-red"
                            >
                                Aether Revolt
                            </button>
                            <button
                                onClick={() => props.getPackOfCards("emn")}
                                className="btn-red"
                            >
                                Eldritch Moon
                            </button>
                            <button
                                onClick={() => props.getPackOfCards("soi")}
                                className="btn-red"
                            >
                                Shadows over Innistrad
                            </button>
                            <button
                                onClick={() => props.getPackOfCards("ogw")}
                                className="btn-red"
                            >
                                Oath of the Gatewatch
                            </button>
                            <button
                                onClick={() => props.getPackOfCards("bfz")}
                                className="btn-red"
                            >
                                Battle for Zendikar
                            </button>
                            <button
                                onClick={() => props.getPackOfCards("dtk")}
                                className="btn-red"
                            >
                                Dragons of Tarkir
                            </button>
                            <button
                                onClick={() => props.getPackOfCards("frf")}
                                className="btn-red"
                            >
                                Fate Reforged
                            </button>
                            <button
                                onClick={() => props.getPackOfCards("ktk")}
                                className="btn-red"
                            >
                                Khans of Tarkir
                            </button>
                            <button
                                onClick={() => props.getPackOfCards("jou")}
                                className="btn-red"
                            >
                                Journey into Nyx
                            </button>
                            <button
                                onClick={() => props.getPackOfCards("bng")}
                                className="btn-red"
                            >
                                Born of the Gods
                            </button>
                            <button
                                onClick={() => props.getPackOfCards("ths")}
                                className="btn-red"
                            >
                                Theros
                            </button>
                            <button
                                onClick={() => props.getPackOfCards("dgm")}
                                className="btn-red"
                            >
                                Dragon's Maze
                            </button>
                            
                        </div>
                    </div>
                </div>
            </section>
            <Pack 
                packOfCards={props.packOfCards}
                statusCheck={props.statusCheck}
            />
            <CardStatus 
                status={props.status}
            />
        </>
    )

}


export default RandomPack

