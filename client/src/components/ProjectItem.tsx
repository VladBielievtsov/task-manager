import React from "react";
import { Box, Image, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function ProjectItem() {
  return (
    <Link to={"/"} style={{ width: "100%" }}>
      <Flex
        w={"full"}
        _hover={{ background: "#ebeefd" }}
        borderBottom={"1px"}
        borderColor={"gray.200"}
        p={4}
      >
        <Box>
          <Image
            borderRadius="full"
            boxSize="48px"
            src="https://bit.ly/dan-abramov"
            alt="Dan Abramov"
          />
        </Box>
        <Box ml={4}>
          <Text fontWeight={"bold"} fontSize="md">
            Project name
          </Text>
          <Text fontSize="sm">2 Todo • active</Text>
        </Box>
      </Flex>
    </Link>
  );
}
