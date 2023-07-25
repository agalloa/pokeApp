import { NextPage } from "next";
import { Spacer, Text } from "@nextui-org/react";

import { MainLayout } from "@/components/layouts";
import { SmallPokemon } from "@/interfaces";

import CarouselComponent from "@/components/pokemon/CarouselComponent";
import { getServerSideProps } from "@/utils/fetchData";
import PokemonListPage from "@/components/pokemon/PokemonListPage";
import { Col, Container, Form, FormControl, Row } from "react-bootstrap";
import { useState } from "react";

interface Props {
  carouselPokemons: SmallPokemon[];
  allPokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ carouselPokemons, allPokemons }) => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [filteredPokemons, setFilteredPokemons] =
    useState<SmallPokemon[]>(allPokemons);

  const handleFilterChange = (event: any) => {
    const type = event.target.value;
    if (type === "") {
      setFilteredPokemons(allPokemons);
    } else {
      const filteredPokemons = allPokemons.filter((pokemon) =>
        pokemon.types?.some((pokemonType) => pokemonType.type.name === type)
      );
      setFilteredPokemons(filteredPokemons);
    }

    setSelectedType(type);
  };

  return (
    <MainLayout title="Listado de pokemons">
      <Container>
        <>
          <CarouselComponent pokemons={carouselPokemons} />
          <Spacer y={2} />
          <Row>
            <Col>
              <Text
                h1
                size={60}
                css={{
                  textGradient: "45deg, $blue600 -20%, $pink600 50%",
                }}
                weight="bold"
              >
                Pokemons
              </Text>
            </Col>
            <Col>
              <Form.Group controlId="pokemonTypeFilter">
                <Form.Label>Filtrar por tipo:</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedType || ""}
                  onChange={handleFilterChange}
                >
                  <option value="">Todos</option>
                  <option value="grass">Grass</option>
                  <option value="fire">Fire</option>
                  <option value="water">Water</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <PokemonListPage pokemons={filteredPokemons} />
        </>
      </Container>
    </MainLayout>
  );
};

export { getServerSideProps };
export default HomePage;
