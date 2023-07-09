import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import ProjectsList from "../components/ProjectsList";

export default function Home() {
  return (
    <Flex>
      <Box w="320px" position={"fixed"} left={0} top={0}>
        <ProjectsList />
      </Box>
      <Box flex="1"></Box>
    </Flex>
  );
}
