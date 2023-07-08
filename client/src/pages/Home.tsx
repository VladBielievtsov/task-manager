import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import ProjectsList from "../components/ProjectsList";

export default function Home() {
  return (
    <Flex>
      <Box
        w="320px"
        borderRight={"1px"}
        position={"fixed"}
        left={0}
        top={81}
        borderColor={"gray.200"}
      >
        <ProjectsList />
      </Box>
      <Box flex="1"></Box>
    </Flex>
  );
}
