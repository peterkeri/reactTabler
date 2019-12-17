import * as React from "react";





import SiteWrapper from "../../components/SiteWrapper";
import { Container, Header, Card, Grid, BlogCard } from "tabler-react";

function Home() {
  return (
    <SiteWrapper>
      <Container>
      <Header.H4 className="mt-4">Client Dashboard</Header.H4>

      <Card
        title="Card title"
        body={`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam
            deleniti fugit incidunt, iste, itaque minima neque pariatur
            perferendis sed suscipit velit vitae voluptatem. A consequuntur,
            deserunt eaque error nulla temporibus!`}
        />

        <Grid.Row>
            <Grid.Col>
                <BlogCard
                    title="And this isn't my nose. This is a false one."
                    postUrl="#"
                    description="Look, my liege! The Knights Who Say Ni demand a sacrifice! …Are you suggesting that coconuts migr..."
                    avatarImgSrc="https://tabler.github.io/tabler/demo/faces/female/18.jpg"
                    authorName="Rose Bradley"
                    profileHref="/profile.html"
                    date="3 days ago"
                    imgSrc="https://tabler.github.io/tabler/demo/photos/david-klaasen-54203-500.jpg"
                    imgAlt="Penguin"
                    iconName="heart"
                    iconHref="#"
                    />
            </Grid.Col>
            <Grid.Col>
                <BlogCard
                    title="And this isn't my nose. This is a false one."
                    postUrl="#"
                    description="Look, my liege! The Knights Who Say Ni demand a sacrifice! …Are you suggesting that coconuts migr..."
                    avatarImgSrc="https://tabler.github.io/tabler/demo/faces/female/18.jpg"
                    authorName="Rose Bradley"
                    profileHref="/profile.html"
                    date="3 days ago"
                    imgSrc="https://tabler.github.io/tabler/demo/photos/david-klaasen-54203-500.jpg"
                    imgAlt="Penguin"
                    iconName="heart"
                    iconHref="#"
                    />
            </Grid.Col>
        </Grid.Row>

        <Grid.Row cards deck>
            <Grid.Col md={4}>
                <Card body="Short content" />
            </Grid.Col>
            <Grid.Col md={4}>
                <Card
                body={`Extra long content of card. Lorem ipsum dolor sit amet,
                    consetetur sadipscing elitr`}
                />
            </Grid.Col>
            <Grid.Col md={4}>
                <Card body="Short content" />
            </Grid.Col>
        </Grid.Row>

        <Card
        title="Card title"
        body={`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam
            deleniti fugit incidunt, iste, itaque minima neque pariatur
            perferendis sed suscipit velit vitae voluptatem. A consequuntur,
            deserunt eaque error nulla temporibus!`}
        />
      </Container>
    </SiteWrapper>
  );
}

export default Home;