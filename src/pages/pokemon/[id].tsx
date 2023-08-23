import { NextPage } from "next";
import { useRouter } from "next/router";
import { MainLayout } from "@/components/layouts";
import { SmallPokemon, Ability, PokemonType } from "@/interfaces";
import { getSinglePokemonServerSideProps } from "@/utils/fetchData";
import { Card, Grid, Image, Spacer, Text } from "@nextui-org/react";
import { Button, Col, Container, Row } from "react-bootstrap";

interface Props {
  pokemonData: SmallPokemon;
}

const PokemonDetailPage: NextPage<Props> = ({ pokemonData }) => {
  const router = useRouter();

  if (!pokemonData) {
    router.push("/");
    return null;
  }
  const { img, id, name, abilities, types, weight, sprites } = pokemonData;

  const handleGoBack = () => {
    router.back();
  };

  // console.log(pokemonData)
  return (
    <MainLayout title={`Detalles de ${name}`}>
      <Container>
        <Button variant="outline-primary" onClick={handleGoBack}>
          Volver atrás
        </Button>
        <Text h3>Detalles pokemon {name}</Text>
        <Container>
          <Row>
            <Col xs={6} md={4}>
              <Image src={img} alt={name} />
            </Col>
            <Col xs={6} md={4}>
              <Text>Id: {id}</Text>
              <Text>Peso: {weight}</Text>
              {types && types.length > 0 && (
                <>
                  <Text h4>Tipos:</Text>
                  <div>
                    <div>
                      {types.map((type, index) => (
                        <p color="primary" key={index}>
                          {type.type?.name}
                        </p>
                      ))}
                    </div>
                  </div>
                </>
              )}
              {abilities && abilities.length > 0 && (
                <>
                  <Text h4>Habilidades:</Text>
                  <div>
                    {abilities.map((ability, index) => (
                      <p color="success" key={index}>
                        {ability.ability?.name}
                      </p>
                    ))}
                  </div>
                </>
              )}
            </Col>
          </Row>
          {sprites && (
            <div>
              <Spacer y={2} />
              <Text h4>Sprites:</Text>
              <Grid.Container gap={2} justify="center">
                <Grid xs={6}>
                  <Card>
                    <Card.Body css={{ p: 0 }}>
                      <Card.Image
                        src={sprites.front_shiny}
                        objectFit="cover"
                        width="40%"
                        height={140}
                        alt={sprites.front_shiny}
                      />
                    </Card.Body>
                  </Card>
                </Grid>
                <Grid xs={6}>
                  <Card>
                    <Card.Body css={{ p: 0 }}>
                      <Card.Image
                        src={sprites.back_shiny}
                        objectFit="cover"
                        width="40%"
                        height={140}
                        alt={sprites.back_shiny}
                      />
                    </Card.Body>
                  </Card>
                </Grid>
              </Grid.Container>
            </div>
          )}
        </Container>
      </Container>
    </MainLayout>
  );
};

export const getServerSideProps = getSinglePokemonServerSideProps;
export default PokemonDetailPage;
