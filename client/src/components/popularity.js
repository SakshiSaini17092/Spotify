import React from 'react'
import { Dropdown, Grid } from 'semantic-ui-react'

const popularityOptions = [
  { key: 'None', value: 'None',  text: 'None' },
  { key: 'Low', value: 'Low',  text: 'Low' },
  { key: 'Medium', value: 'Medium',  text: 'Medium' },
  { key: 'High', value: 'High',  text: 'High' }
  ]

var value = ""

function handleChange (e, { value }){
    console.log("changes")
    console.log(value)
}

const DropdownExampleSearchSelection = () => (

    <Grid>
        <Grid.Column width={8}>
        <Dropdown
            placeholder='Popularity'
            fluid
            search
            selection
            options={popularityOptions}
            onChange={handleChange}
            // value= {value}
        />

        </Grid.Column>
    </Grid>
)
export default DropdownExampleSearchSelection