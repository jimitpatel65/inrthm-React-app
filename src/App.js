import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Grid, Button } from 'react-bootstrap';
import SearchBar from './components/searchbar';
import { actionFetchData } from './actions/index'; 
import ListContainer from './components/listContainer';


class App extends Component {

  constructor(props) { 
  super(props); 
    this.state = {
      searchString:''
    };    
    this.onSearch = this.onSearch.bind(this);
    this.renderList = this.renderList.bind(this);
  }

  serachTextChange = e => {   
    this.setState({ searchString: e }); 
  }

  onSearch(){       
    this.props.actionFetchData(this.state.searchString);      
   
  }

  renderList() {
    /*

    1. check if object is empty return null 
    2. else display content. 
    
    */
    const { data } = this.props; 

      console.log('app.js', data);
      if ( data.length === 0 ) {
        console.log('response data empty ');
        return null;
      }
      else {         
        return(
          <div className="container-fluid ">

             <div className="col-3"/>

             <div className="col-6">
                <ListContainer
                  data={data}
                  
                />
              </div>

              <div className="col-3"/>

          </div> 
          /*
          <div>             
              {data.map(e=> <ul> <li>{e.trackName}</li><li>{e.collectionName}</li></ul>)} 
          </div>   
          */
        )
      }

      
    
  }

  render() {
    return (
      <div className="container-fluid ">

        <div className="row">
          <div className="col">
            <SearchBar 
              serachText = { this.state.searchString }
              serachTextfunction = { this.serachTextChange }
            />
          </div>
          <div className="col">
          <button
            className="btn btn-info"
            onClick = {() => this.onSearch()}
          > Submit </button> 
          </div>

        </div>
        
        <div className="row">
          {this.renderList()}
        </div>  

      </div>
    );
  }
}

const mapSatateToProps = state => {
  return {
    data: state.apidata.data
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ actionFetchData }, dispatch);
}


export default connect(mapSatateToProps,mapDispatchToProps)(App);


/*
set state pattern.  
*/