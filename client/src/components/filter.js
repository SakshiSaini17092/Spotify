import _ from 'lodash'
import React, { Component } from 'react'
import { Button, Dropdown, Grid } from 'semantic-ui-react'
import GridEx from "./grid"

import "./styles/filter.css"

var opts =[]
var token = ""

var track =[]

const popularityOptions = [
  { key: 'None', value: 'None',  text: 'None' },
  { key: 'Low', value: 'Low',  text: 'Low' },
  { key: 'Medium', value: 'Medium',  text: 'Medium' },
  { key: 'High', value: 'High',  text: 'High' }
  ]

async function obtainToken(){
    await fetch("http://localhost:9000/auth")
    .then(res => res.text())
    .then(res => {
        token = res
        }
    )   
    .catch(err => 
        console.log(err)
  );}  

async function getOptions(artist){

    await obtainToken()
    var obj = {  
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : token.toString()
            }
        }
        var track =[]
        fetch( 'https://api.spotify.com/v1/search?q='+ artist +'&type=track&offset=0&limit=10' , obj)  
        .then(res => res.text() )
        .then( res => {
            res = JSON.parse(res)        
            let tr = res["tracks"]["items"][0]["available_markets"]
            let obj ={}
            tr.forEach(element => {
                obj = {}
                obj.key = element
                obj.value = element
                obj.text = element
                track.push(obj)
            });
            opts = track
        } )
    .catch( err => 
        console.log(err)
    );
    return track
}

class DropdownExampleRemote extends Component {
  state = {
    isFetching: false,
    multiple: true,
    search: true,
    searchQuery: null,
    value: [],
    options: opts,
    tracks : []
  }

  handleChange = (e, { value }) => this.setState({ value })
  handleSearchChange = (e, { searchQuery }) => this.setState({ searchQuery })
  fetchOptions = () => {
    this.setState({ isFetching: true })

    setTimeout(() => {
      this.setState({ isFetching: false, options: opts })
      this.selectRandom()
    }, 500)
  }

  selectRandom = () => {
    const { multiple, options } = this.state
    const value = _.sample(options).value
    this.setState({ value: multiple ? [value] : value })
  }

  toggleSearch = (e) => this.setState({ search: e.target.checked })

  toggleMultiple = (e) => {
    const { value } = this.state
    const multiple = e.target.checked
    const newValue = multiple ? _.compact([value]) : _.head(value) || ''
    this.setState({ multiple, value: newValue })
  }

  handlePopularityChange = (e, {value}) =>{
    console.log("hangeling popularity")
    console.log(value)
    value = value.toString()
    var artist = this.props.param
    track =[]
    var obj = {  
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization' : token.toString()
          }
      }
      fetch( 'https://api.spotify.com/v1/search?q='+ artist +'&type=track&offset=0' , obj)  
      .then(res => res.text() )
      .then( res => {
          res = JSON.parse(res)
          console.log(res)
          var tr = res["tracks"]["items"]

          var obj ={}
          tr.forEach(element => {
              obj = {}
              var pop = element["popularity"]
              obj.title = element["name"]
              obj.image = element["album"]["images"][0]["url"]
              obj.popularity = element["popularity"]
              obj.release_date = element["album"]["release_date"]
              console.log( "pop",pop,"value", value )

              if( (value == "High" && pop >= 80 ) || (value == "Medium" && pop >= 70 && pop < 80) || (value == "Low" && pop >0 && pop < 70) || (value == "None"&& pop == 0) ){
                track.push(obj)
              }
          });
          this.props.onChange(track)
          this.setState({tracks: []})
      } )
    .catch( err => 
        console.log(err)
    );
  }

  applyFilter = (e) => {

    var values = this.state.value
    var artist = this.props.param

    var mar = values[0]
    values.forEach((m) => (
        mar = mar + '%2C' + m    
    ))
    track = []
    var obj = {  
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : token.toString()
            }
        }
        fetch( 'https://api.spotify.com/v1/search?q='+ artist +'&type=track&offset=0&limit=10&market=' + values[0] , obj)  
        .then(res => res.text() )
        .then( res => {
            res = JSON.parse(res)
            console.log(res)
            var tr = res["tracks"]["items"]

            var obj ={}
            tr.forEach(element => {
                obj = {}
                obj.title = element["name"]
                obj.image = element["album"]["images"][0]["url"]
                obj.popularity = element["popularity"]
                console.log(obj.image, "imahgeee")
                track.push(obj)
            });
            this.props.onChange(track)
            this.setState({tracks: track})
        } )
    .catch( err => 
        console.log(err)
    );
  }
  render() {

    getOptions(this.props.param)
    const { multiple, options, isFetching, search, value } = this.state

    return (
      <div> 
      <Grid>
        
      <Grid.Column width={1}>
      </Grid.Column>
        <Grid.Column width={8}>
          <p>
            <Button onClick={this.fetchOptions}>Fetch Markets</Button>
            <Button onClick={this.selectRandom} disabled={_.isEmpty(options)}>Random</Button>
            <Button onClick={this.applyFilter} disabled={_.isEmpty(options)}>Apply Filter</Button>
          </p>
        </Grid.Column>
                
        <Grid.Column width={4}>

        <div className="dropdown">
        <Dropdown
            fluid
            selection
            multiple={multiple}
            search={search}
            options={options}
            value={value}
            placeholder='Add Markets'
            onChange={this.handleChange}
            onSearchChange={this.handleSearchChange}
            disabled={isFetching}
            loading={isFetching}
            
          />
        </div>
            <Dropdown
                placeholder='Popularity'
                fluid
                search
                selection
                options={popularityOptions}
                onChange={this.handlePopularityChange}
                
            />
         
        </Grid.Column>
      </Grid>
      
      <GridEx param = {this.state.tracks}/>

      </div>
    )
  }
}

export default DropdownExampleRemote

