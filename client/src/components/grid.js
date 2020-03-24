import React, { Component } from 'react';
import { Grid, Card, Icon, Image } from 'semantic-ui-react'
import "./styles/filter.css"
class GridEx extends Component {

    render() {    
        return <div className="cards">


        <Grid >
        
        <Grid.Column width={1}>
        </Grid.Column>
          <Grid.Column width={14}>

          <Card.Group>        
            { 
                this.props.param.map( (title) => (
                  <Card>
                    <Image src={title["image"]} wrapped ui={false} />
                    <Card.Content>
                      <Card.Header>{title["title"]}</Card.Header>
                      <Card.Meta>{title["release_date"]}</Card.Meta>
      
                    </Card.Content>
                    <Card.Content extra>
                      <a>
                        <Icon name='user' />
                        {title["popularity"]}
                      </a>
                    </Card.Content>
                  </Card>
                )) 
            }
  
          </Card.Group>
          </Grid.Column>
          </Grid>

         
        </div>

       
    }
  }

  
export default GridEx;
