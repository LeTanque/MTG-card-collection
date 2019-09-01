import React from 'react'
// import { Mana } from "@saeris/react-mana"


class SearchForm extends React.Component {
    state = {
        searchVarShow:[
            { id:0, searchOption:'type', optionValues:'', show:false },
            { id:1, searchOption:'subtypes', optionValues:'', show:false },
            { id:2, searchOption:'set', optionValues:'', show:false },
            { id:3, searchOption:'colors', optionValues:'', show:false },
            { id:4, searchOption:'name', optionValues:'', show:false },
        ],
        searchParams:{
            name:'',
            type:'',
            subtypes:'',
            set:'',
            colors:'',
            page:1
        }
    }



    showMenu = (event, varObject) => {
        event.preventDefault();
        const searchVarShowMinusTarget = this.state.searchVarShow.filter(element => element.searchOption !== varObject.searchOption)
        searchVarShowMinusTarget.forEach(element => element.show = false);

        const newSearchVarShow = [
            ...searchVarShowMinusTarget,
            { id:varObject.id, searchOption:varObject.searchOption, optionValues:'', show:true }
        ]
        newSearchVarShow.sort(this.props.sortingHat('id', 'asc'));
        this.setState({
            searchVarShow:newSearchVarShow
        })
    }


    handleChanges = event => {
        event.preventDefault();
        this.setState({
            searchParams:{
                ...this.state.searchParams,
                [event.target.name]:event.target.value,
            }
        })
    }

    submitInput = event => {
        event.preventDefault();
        this.props.submitSearch(event, this.state.searchParams);
    }

    pagination = (event, direction) => {
        direction === "++" 
        ? 
        this.setState({
            searchParams:{
                ...this.state.searchParams,
                page: ++this.state.searchParams.page
            }
        })
        : 
        this.setState({
            searchParams:{
                ...this.state.searchParams,
                page: --this.state.searchParams.page
            }
        })
        
        this.submitInput(event);

        console.log(this.state.searchParams.page)
    }
    
    render() {
        return (
            <section className="search-form">
                <form 
                    onSubmit={this.submitInput}
                >
                    <input 
                        type="text"
                        name="name"
                        placeholder="Input card name here"
                        onChange={this.handleChanges}
                        value={this.state.searchParams.name}
                    />
                    <button className="btn-dark" >Search</button>
                </form>
                <div className="dropdown-group">

                    {this.state.searchVarShow.map(variable => (
                        <React.Fragment key={variable.id} >
                            <button 
                                className='btn-dark btn-dropdown' 
                                onClick={(e) => this.showMenu(e, variable)}
                                name={`${variable.searchOption}`}
                            >
                                {variable.searchOption}
                            </button>
                        </React.Fragment>
                    ))}

                </div>
                
                {this.state.searchVarShow.map(obj => (
                    <React.Fragment key={obj.id}>
                        {obj.show ? (
                            <div className="dropdown">
                                {obj.searchOption}
                            </div>
                        ) : (
                            <div className='display-none'></div>
                        )}
                    </React.Fragment>
                ))}

                <button onClick={(event)=>this.pagination(event, '--')}>last page</button>
                <button onClick={(event)=>this.pagination(event, '++')}>next page</button>

            </section>
        );
    }
}

export default SearchForm
