
import { NextPage, GetServerSideProps } from 'next';

import { MainLayout } from '@/components/layouts';
import { pokeApi } from '@/api';
import { PokemonListResponse } from '@/interfaces';

const HomePage = ( props: PokemonListResponse ) => {
  // console.log(props)
  return (
    <MainLayout title='Listado de pokemons'>
      <ul>
        <li>Pokemon</li>
        <li>Pokemon</li>
        <li>Pokemon</li>
        <li>Pokemon</li>
        <li>Pokemon</li>
        <li>Pokemon</li>
      </ul>
    </MainLayout>
  )
}



export const getServerSideProps: GetServerSideProps = async (ctx) => {
 
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon/?limit=151');

  return {
    props: {
      pokemons: data.results
    }
  }
}
export default HomePage;
