import React from 'react'
// import { Mana } from "@saeris/react-mana"


class SearchForm extends React.Component {
    state = {
        searchOptionShow:[
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
        const searchOptionShowMinusTarget = this.state.searchOptionShow.filter(element => element.searchOption !== varObject.searchOption)
        searchOptionShowMinusTarget.forEach(element => element.show = false);

        const newSearchOptionShow = [
            ...searchOptionShowMinusTarget,
            { id:varObject.id, searchOption:varObject.searchOption, optionValues:'', show:true }
        ]
        newSearchOptionShow.sort(this.props.sortingHat('id', 'asc'));
        this.setState({
            searchOptionShow: newSearchOptionShow
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
        console.log(this.state.searchParams.name, this.props.currentSearch.name);
        if(this.state.searchParams.name !== this.props.currentSearch.name) {
            this.props.submitSearch(event, this.state.searchParams);
        } else {
            this.setState({
                searchParams:{
                    ...this.state.searchParams,
                    page:1,
                }
            });
            this.props.submitSearch(event, this.state.searchParams);
        }
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
                    <button className="btn-dark">Search</button>
                </form>
                <div className="dropdown-group">

                    {this.state.searchOptionShow.map(variable => (
                        <React.Fragment key={variable.id} >
                            <button 
                                className='btn-dark btn-dropdown' 
                                onClick={(event) => this.showMenu(event, variable)}
                                name={`${variable.searchOption}`}
                            >
                                {variable.searchOption}
                            </button>
                        </React.Fragment>
                    ))}

                </div>
                
                {this.state.searchOptionShow.map(object => (
                    <React.Fragment key={object.id}>
                        {object.show ? (
                            <div className="dropdown">
                                {object.searchOption}
                            </div>
                        ) : (
                            <div className='display-none'></div>
                        )}
                    </React.Fragment>
                ))}
                <div className="search__pagination">
                    <button onClick={(event)=>this.pagination(event, '--')}>last page</button>
                    <button onClick={(event)=>this.pagination(event, '++')}>next page</button>
                </div>

            </section>
        );
    }
}

export default SearchForm
