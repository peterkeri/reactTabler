import * as React from "react";
import SiteWrapper from "../../components/SiteWrapper";
import { Container, Header, Card } from "tabler-react";

const Home = (props) => {
  return (
    <SiteWrapper {...props}>
      <Container>
        <Header.H4 className="mt-4">Authenticated Dashboard</Header.H4>

        <Card
          title="Welcome back,"
          body={`this is the home page of authenticated users`}
        />
      </Container>
    </SiteWrapper>
  );
}

export default Home;
