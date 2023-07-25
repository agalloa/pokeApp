// utils/fetchData.ts

import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { pokeApi } from "@/api";
import {  PokemonListResponse,  SmallPokemon } from "@/interfaces";
import { sampleSize } from "lodash";

export const getSinglePokemonData = async (id: number) => {
  const { data } = await pokeApi.get<SmallPokemon>(`/pokemon/${id}`);
  const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
  const abilities = data.abilities?.map((ability) => ability.ability.name) || [];
  const types = data.types?.map((type) => type.type.name) || [];

  return {
    ...data,
    abilities,
    types,
    img,
  };
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon/?limit=151");

  const allPokemons: SmallPokemon[] = data.results.map((poke, index) => ({
    ...poke,
    id: index + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index + 1}.svg`,
  }));

  const randomPokemons: SmallPokemon[] = sampleSize(allPokemons, 10);
  const carouselPokemons: SmallPokemon[] = sampleSize(randomPokemons, 5);

  return {
    props: {
      carouselPokemons,
      allPokemons,
    },
  };
};

export const getSinglePokemonServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const { id } = ctx.query;

  if (typeof id !== "string") {
    return {
      notFound: true,
    };
  }

  const pokemonData = await getSinglePokemonData(Number(id));

  if (!pokemonData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      pokemonData,
    },
  };
};