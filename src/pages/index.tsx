import { NextPage, GetServerSideProps } from "next";
import { Button, Carousel } from "react-bootstrap";
import { Grid, Spacer, Text } from "@nextui-org/react";

import { MainLayout } from "@/components/layouts";
import { pokeApi } from "@/api";
import { PokemonListResponse, SmallPokemon } from "@/interfaces";
import Image from "next/image";
import { sampleSize } from "lodash";
import { PokemonCard } from "@/components/pokemon/PokemonCard";
import CarouselComponent from "@/components/pokemon/CarouselComponent";
import PokemonList from "@/components/pokemon/PokemonList";

interface Props {
  carouselPokemons: SmallPokemon[];
  cardPokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ carouselPokemons, cardPokemons}) => {
  return (
    <MainLayout title="Listado de pokemons">
      <>
      <CarouselComponent pokemons={carouselPokemons} />
        <Spacer y={2} />
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
        <PokemonList pokemons={cardPokemons} />
      </>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>(
    "/pokemon/?limit=151"
  );

  const allPokemons: SmallPokemon[] = data.results.map((poke, index) => ({
    ...poke,
    id: index + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
      index + 1
    }.svg`,
  }));

  const randomPokemons: SmallPokemon[] = sampleSize(allPokemons, 10); 

  const carouselPokemons: SmallPokemon[] = sampleSize(randomPokemons, 5); 
  const cardPokemons: SmallPokemon[] = randomPokemons.slice(5); 

  return {
    props: {
      carouselPokemons,
      cardPokemons,
    },
  };
};

export default HomePage;
