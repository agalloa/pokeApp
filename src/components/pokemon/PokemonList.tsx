import { Button } from "react-bootstrap";
import { Grid } from "@nextui-org/react";
import { SmallPokemon } from "@/interfaces";
import { PokemonCard } from "@/components/pokemon/PokemonCard";

interface Props {
  pokemons: SmallPokemon[];
}

const PokemonList: React.FC<Props> = ({ pokemons }) => {
  return (
    <>
      <Grid.Container gap={2} justify="flex-start">
        {pokemons.map((pokemon) => (
          <Grid xs={6} sm={3} md={2} xl={1} key={pokemon.id}>
            <PokemonCard {...pokemon} />
          </Grid>
        ))}
        <Grid
          xs={6}
          sm={3}
          md={2}
          xl={1}
          key="ver-mas-button"
          className="d-flex align-items-center justify-content-center"
        >
          <Button
            variant="secondary"
            style={{ width: "90px", borderRadius: "50%", height: "90px" }}
          >
            Ver más
          </Button>
        </Grid>
      </Grid.Container>
    </>
  );
};

export default PokemonList;
