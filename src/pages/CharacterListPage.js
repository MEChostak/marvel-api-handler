import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCharacters } from "../services/marvelApi";
import ReactPaginate from "react-paginate";
import { Box, Input, Heading, Image, Text, VStack } from "@chakra-ui/react";
import "./../App.css";

function CharacterListPage() {
  const [characters, setCharacters] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para armazenar o termo de pesquisa
  console.log(
    "🚀 ~ file: CharacterListPage.js:13 ~ CharacterListPage ~ searchTerm:",
    searchTerm
  );
  const charactersPerPage = 10;

  useEffect(() => {
    if (searchTerm === "") {
      // Carrega todos os personagens somente se o campo de pesquisa estiver vazio
      loadCharacters();
    } else {
      // Se a pesquisa não estiver vazia, filtra os personagens com base na pesquisa
      filterCharacters();
    }
  }, [currentPage, searchTerm]);

  const loadCharacters = async () => {
    try {
      const data = await getCharacters(
        charactersPerPage,
        (currentPage - 1) * charactersPerPage
      );
      setCharacters(data.results);
      setTotalPages(Math.ceil(data.total / charactersPerPage));
    } catch (error) {
      console.error(error.message);
    }
  };

  const filterCharacters = async () => {
    try {
      const data = await getCharacters(
        charactersPerPage,
        (currentPage - 1) * charactersPerPage,
        searchTerm
      );
      setCharacters(data.results);
      setTotalPages(Math.ceil(data.total / charactersPerPage));
    } catch (error) {
      console.error(error.message);
    }
  };

  const handlePageChange = ({ selected }) => {
    // selected é o índice da página selecionada (baseado em 0)
    setCurrentPage(selected + 1); // 1 porque as páginas são baseadas em 1 (1, 2, 3, ...)
  };

  const handleSearchChange = (event) => {
    console.log("teste");
    setCurrentPage(1);
    setSearchTerm(event.target.value);
  };

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={4} className="title">
        List of Marvel Characters
      </Heading>
      <Input
        type="text"
        placeholder="Pesquisar por nome"
        value={searchTerm}
        onChange={handleSearchChange}
        mb={4}
        w="50%"
        alignSelf="flex-end"
        padding="8px"
        margin="9px"
      />
      <VStack spacing={4} alignItems="center">
        {characters.map((character) => (
          <Link
            key={character.id}
            to={`/character/${character.id}`}
            style={{
              border: "2px solid #282c34",
              borderRadius: "20px",
              width: "100%",
              padding: "90px",
            }}
          >
            <Box borderWidth="1px" borderRadius="md" p={4} cursor="pointer">
              <Image
                src={`${character.thumbnail.path}/standard_fantastic.jpg`}
                alt={character.name}
              />
              <Heading as="h2" size="md" mt={2} mb={4}>
                {character.name}
              </Heading>
              <Text>Total number of comics: {character.comics.available}</Text>
              <Text>Total number of series: {character.series.available}</Text>
              <Text>
                Total number of stories: {character.stories.available}
              </Text>
            </Box>
          </Link>
        ))}
      </VStack>
      <div className="pagination">
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          onPageChange={handlePageChange}
          forcePage={currentPage - 1}
          nextLabel=">>"
          previousLabel="<<"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
        />
      </div>
    </Box>
  );
}

export default CharacterListPage;
