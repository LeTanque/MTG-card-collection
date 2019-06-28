import React from 'react'

const AdminTools = props => {


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
                        {set.code}
                        <br />
                        {set.type}
                        <br />
                        {set.releaseDate}
                    </p>
                </React.Fragment>
            )) : null}
        </>
    );

}

export default AdminTools
