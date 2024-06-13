import { Link } from "react-router-dom";
import { Box, Flex, Button } from "@chakra-ui/react";

const Navigation = () => {
  return (
    <Box bg="brand.900" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box color="white" fontWeight="bold">
          Trading App
        </Box>
        <Flex alignItems="center">
          <Link to="/">
            <Button colorScheme="teal" variant="ghost">
              Home
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navigation;
