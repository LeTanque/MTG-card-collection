import React from 'react'
import { Keyrune } from "@saeris/react-keyrune"


const AdminTools = props => {

    const upperCaseThis = thing => {
        return thing.toLowerCase();
    }

    return (
        <>
            <button
                onClick={props.getAllTheSets}
            >
                Get All The Sets
            </button>
            {props.allTheSets ? props.allTheSets.map((set, index) => (
                <React.Fragment key={index}>
                    <p className="all-sets">
                        {set.name}
                        <br />
                        {set.type}
                        <br />
                        {set.releaseDate}
                        <br />
                        {set.code}
                        <br />
                        <Keyrune 
                            fixed
                            set={upperCaseThis(set.code)}
                            rarity="rare" 
                            size="2x"
                        />
                        <br />
                        <br />
                    </p>
                </React.Fragment>
            )) : null}
        </>
    );

}

export default AdminTools

