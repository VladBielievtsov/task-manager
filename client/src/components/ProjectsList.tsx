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
        bg={"transparent"}
        rounded={"md"}
        border={"1px"}
        borderColor={"#5a5a63"}
        p={1}
        px={4}
        display={"flex"}
        justifyContent={"center"}
        cursor={"pointer"}
        _checked={{
          color: "#fff",
          background: "#49485b",
          borderColor: "#49485b",
        }}
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
    <Box bg={"#2d2e39"} textColor={"white"} pt={"70px"}>
      <Box p={4}>
        <Input placeholder="Search" borderColor={"#5a5a63"} />
        <Flex {...group} gap={4} mt={4}>
          {values.map((item) => (
            <CustomRadio key={item} {...getRadioProps({ value: item })}>
              {item}
            </CustomRadio>
          ))}
        </Flex>
      </Box>
      <VStack overflowY={"auto"} h={"100vh"}>
        <ProjectItem />
      </VStack>
    </Box>
  );
}
