import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCharacterById } from "../services/marvelApi";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";

import {
  Box,
  Heading,
  Image,
  Text,
  VStack,
  Link as ChakraLink,
} from "@chakra-ui/react";

function CharacterDetailPage() {
  const { characterId } = useParams();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    loadCharacter();
  }, []);

  const loadCharacter = async () => {
    try {
      const data = await getCharacterById(characterId);
      setCharacter(data.results[0]);
    } catch (error) {
      console.error(error.message);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    return `modified ${formatDistanceToNow(date, { locale: enUS })} ago`;
  };

  if (!character) {
    return (
      <Box p={4}>
        <Heading as="h1" size="xl">
          Loading...
        </Heading>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={4}>
        {character.name}
      </Heading>
      <Image
        src={`${character.thumbnail.path}/standard_fantastic.jpg`}
        alt={character.name}
      />
      <Text mt={2} mb={4}>
        Description: {character.description || "No description available."}
      </Text>
      <Text>Last Modified Date: {formatDate(character.modified)}</Text>
      <VStack spacing={4} alignItems="center" mt={4}>
        <Box>
          <Heading as="h2" size="lg" mb={2}>
            Comics:
          </Heading>
          <ul>
            {character.comics.items.map((comic) => (
              <li key={comic.name}>{comic.name}</li>
            ))}
          </ul>
        </Box>
        <Box>
          <Heading as="h2" size="lg" mb={2}>
            Series:
          </Heading>
          <ul>
            {character.series.items.map((serie) => (
              <li key={serie.name}>{serie.name}</li>
            ))}
          </ul>
        </Box>
        <Box>
          <Heading as="h2" size="lg" mb={2}>
            Stories:
          </Heading>
          <ul>
            {character.stories.items.map((story) => (
              <li key={story.name}>{story.name}</li>
            ))}
          </ul>
        </Box>
        <Box>
          <Heading as="h2" size="lg" mb={2}>
            Urls:
          </Heading>
          <ul>
            {character.urls.map((url) => (
              <li key={url.type}>
                <ChakraLink
                  href={url.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {url.type}
                </ChakraLink>
              </li>
            ))}
          </ul>
        </Box>
      </VStack>
      <ChakraLink as={Link} to="/" mt={4} display="block">
        Back to list
      </ChakraLink>
    </Box>
  );
}

export default CharacterDetailPage;
