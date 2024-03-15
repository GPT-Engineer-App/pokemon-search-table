import { useState } from "react";
import { Box, Heading, Input, Button, Table, Thead, Tbody, Tr, Th, Td, useToast } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const API_URL = "https://backengine-yvls.fly.dev";

const Index = () => {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonData, setPokemonData] = useState(null);
  const toast = useToast();

  const handleSearch = async () => {
    try {
      const response = await fetch(`${API_URL}/pokemon/${pokemonName}`);
      const data = await response.json();
      setPokemonData(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch Pokemon data",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxWidth="600px" margin="auto" padding="4">
      <Heading as="h1" size="xl" textAlign="center" marginBottom="8">
        Pokemon Search
      </Heading>
      <Box display="flex" marginBottom="8">
        <Input placeholder="Enter Pokemon name" value={pokemonName} onChange={(e) => setPokemonName(e.target.value)} fontFamily="Pokemon, sans-serif" fontSize="xl" borderRadius="md" boxShadow="md" marginRight="4" />
        <Button leftIcon={<FaSearch />} colorScheme="blue" onClick={handleSearch}>
          Search
        </Button>
      </Box>
      {pokemonData && (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Property</Th>
              <Th>Value</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Object.entries(pokemonData).map(([key, value]) => (
              <Tr key={key}>
                <Td>{key}</Td>
                <Td>{value}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default Index;
