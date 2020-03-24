import PropTypes from 'prop-types'
import _ from 'lodash'
import React, { Component } from 'react'
import { Search, Grid, Label } from 'semantic-ui-react'
import GridEx from './grid'
import DropdownExampleRemote from "./filter"

var initialState = { isLoading: false, results: [], value: '', tracks  :[] }

var source = []
var track = []
var token =""
const resultRenderer = ({ title }) => <Label content={title} />

resultRenderer.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
}

export default class SearchExampleStandard extends Component {

  constructor(){
    super();
    this.state = initialState
  }
  state = initialState
  token = ""

  async obtainToken(){
    
    await fetch("http://localhost:9000/auth")
    .then(res => res.text())
    .then(res => {
        token = res
        }
    )   
    .catch(err => 
        console.log(err)
    );
  }  

  async searchBar(param){
    await this.obtainToken()
    var obj = {  
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization' : token.toString()
        }
    }
    source = []
    console.log("parammmm", param)
    fetch( 'https://api.spotify.com/v1/search?q='+ param +'&type=artist&offset=0&limit=5' , obj)  
        .then(res => res.text() )
        .then( res => {
            res = JSON.parse(res)
            let artist = res["artists"]["items"]
            artist.forEach(element => {
                let obj = {}
                obj.title = element["name"]
                source.push(obj)
            });
        } )
        .catch( err => 
            console.log(err)
        );
  }

  async obtainTracks(artist){

    await this.obtainToken()
    var obj = {  
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization' : token.toString()
        }
    }
    track = []

    fetch( 'https://api.spotify.com/v1/search?q='+ artist +'&type=track&offset=0&limit=20' , obj)  
    .then(res => res.text() )
    .then( res => {
        res = JSON.parse(res)
        
        let tr = res["tracks"]["items"]
        console.log("trackss---")
        console.log(tr)
        tr.forEach(element => {
            let obj = {}
            obj.title = element["name"]
            obj.image = element["album"]["images"][1]["url"]
            obj.popularity = element["popularity"]
            obj.release_date = element["album"]["release_date"]
            track.push(obj)
        });
      } )
    .catch( err => 
        console.log(err)
    );
  }

  handleResultSelect = (e, { result }) => {

    setTimeout(() => {
      this.obtainTracks(result.title)
      this.setState({ value: result.title , tracks : track})
    }, 300)
                
    }
  handleSearchChange = (e, { value }) => {
    
    this.setState({ isLoading: true, value })

    setTimeout(() => {

      if (this.state.value.length < 1) {
            track = []
            source = []
            return this.setState({ isLoading: false, results: source})
        }

      this.searchBar(value)
      this.obtainTracks(value)
      this.setState({
        isLoading: false,
        results : source,
      })

    }, 300)
  }

  handleStateChange=(track)=>{
    this.setState({tracks: track})
  }

  render() {
    
    const { isLoading, value, results } = this.state
    return (
        <div>
        <Grid>
        <Grid.Column width={7}>
        </Grid.Column>
        <Grid.Column width={6}>
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true,
            })}
            results={results}
            value={value}
            resultRenderer={resultRenderer}
            {...this.props}
          />
        </Grid.Column>

      </Grid>
      <DropdownExampleRemote param={this.state.value} onChange = {this.handleStateChange} />

     <GridEx param = {this.state.tracks}/>
    
    </div>
    )
  }
}
