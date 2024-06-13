import React from "react";
import { Container, Text, VStack } from "@chakra-ui/react";

const NewPage = () => {
  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">This is the new page</Text>
      </VStack>
    </Container>
  );
};

export default NewPage;
