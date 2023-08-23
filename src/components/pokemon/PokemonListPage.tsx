import { useState } from "react";
import { Grid } from "@nextui-org/react";
import { SmallPokemon } from "@/interfaces";
import { PokemonCard } from "@/components/pokemon/PokemonCard";
import ReactPaginate from "react-paginate";
import Link from "next/link"; // Importa el componente Link de Next.js

interface Props {
  pokemons: SmallPokemon[];
}

const PokemonListPage: React.FC<Props> = ({ pokemons }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 20;

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const paginatedPokemons = pokemons.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <>
      <Grid.Container gap={2} justify="flex-start">
        {paginatedPokemons.map((pokemon) => (
          <Grid xs={6} sm={3} md={2} xl={1} key={pokemon.id}>
            <Link href={`/pokemon/${pokemon.id}`} style={{ textDecoration: 'none'}}>
              <PokemonCard {...pokemon} />
            </Link>
          </Grid>
        ))}
      </Grid.Container>
      <ReactPaginate
        previousLabel="< previous"
        nextLabel="next >"
        breakLabel={"..."}
        pageCount={Math.ceil(pokemons.length / itemsPerPage)}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        activeClassName={"active"}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default PokemonListPage;
