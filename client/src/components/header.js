import React from 'react'
import { Header, Icon } from 'semantic-ui-react'

const HeaderExampleUsersIcon = () => (
  <div>
    <Header as='h2' icon textAlign='center' >
      <Icon name='users' circular />
      <Header.Content>Spotify</Header.Content>
    </Header>
    
  </div>
)

export default HeaderExampleUsersIcon
