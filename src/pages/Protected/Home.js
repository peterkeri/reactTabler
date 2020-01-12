import React, { useContext } from 'react'
import { Container, Header, Card } from 'tabler-react'
import SiteWrapper from '../../components/SiteWrapper'
import { AuthenticationContext } from '../../context/AuthenticationContextProvider'

const Home = (props) => {
  const [{ token_type }] = useContext(AuthenticationContext)

  console.log(token_type)
  return (
    <SiteWrapper {...props}>
      <Container>
        <Header.H4 className="mt-4">Authenticated Dashboard</Header.H4>

        <Card
          title="Welcome back,"
          body="this is the home page of authenticated users"
        />
      </Container>
    </SiteWrapper>
  )
}

export default Home
