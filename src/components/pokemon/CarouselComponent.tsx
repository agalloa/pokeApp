import { Carousel } from "react-bootstrap";
import { SmallPokemon } from "@/interfaces";
import { PokemonCard } from "@/components/pokemon/PokemonCard";

interface Props {
  pokemons: SmallPokemon[];
}

const CarouselComponent: React.FC<Props> = ({ pokemons }) => {
  return (
    <Carousel indicators={false} data-bs-theme="dark" style={{ paddingTop: "20px" }}>
      {pokemons.map((pokemon) => (
        <Carousel.Item key={pokemon.id}>
          <PokemonCard {...pokemon} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
