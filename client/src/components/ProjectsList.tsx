import React, { useState } from "react";
import {
  Box,
  Input,
  useRadio,
  useRadioGroup,
  Flex,
  VStack,
} from "@chakra-ui/react";

import ProjectItem from "./ProjectItem";

function CustomRadio(props: any) {
  const { getInputProps, getCheckboxProps } = useRadio(props);
  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label" flex={1}>
      <input {...input} />
      <Box
        {...checkbox}
        bg={"gray.200"}
        rounded={"md"}
        p={1}
        px={4}
        display={"flex"}
        justifyContent={"center"}
        cursor={"pointer"}
        _checked={{ color: "#fff", background: "#000" }}
      >
        {props.children}
      </Box>
    </Box>
  );
}

export default function ProjectsList() {
  const values = ["Active", "Closed"];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "test",
    defaultValue: "Active",
    onChange: console.log,
  });

  const group = getRootProps();

  return (
    <Box>
      <Box p={4}>
        <Input placeholder="Search" />
        <Flex {...group} gap={4} mt={4}>
          {values.map((item) => (
            <CustomRadio key={item} {...getRadioProps({ value: item })}>
              {item}
            </CustomRadio>
          ))}
        </Flex>
      </Box>
      <VStack overflowY={"auto"} h={"84.3vh"}>
        <ProjectItem />
      </VStack>
    </Box>
  );
}
