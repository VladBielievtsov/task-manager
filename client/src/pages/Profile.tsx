import React from "react";
import {
  Box,
  Flex,
  Container,
  Avatar,
  Text,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useAppSelector } from "../hooks/redux";

export default function Profile() {
  const { userInfo } = useAppSelector((state) => state.auth);
  const name = userInfo?.user.name;
  return (
    <Box bg={"#f8fafb"} pt={10} minH={"100vh"}>
      <Container maxW={"container.xl"} rounded={"xl"} py={6} bg={"white"}>
        <Text fontSize={"2xl"} fontWeight={"bold"} mb={6}>
          My Profile
        </Text>
        <Flex
          alignItems={"flex-start"}
          border={"1px"}
          borderColor={"gray.200"}
          p={4}
          rounded={"xl"}
        >
          <Avatar
            w={"90px"}
            h={"90px"}
            size="2xl"
            bg="gray.300"
            name={name}
            src="https://bit.ly/prosper-baba"
          />
          <Box ml={6}>
            <Text fontSize={"xl"} mb={1} fontWeight={"semibold"}>
              {name}
            </Text>
            <Text fontSize={"lg"} textColor={"gray.500"}>
              Front-End Developer
            </Text>
            <Text fontSize={"lg"} textColor={"gray.500"}>
              Kharkiv Ukraine
            </Text>
          </Box>
        </Flex>
        <Box
          border={"1px"}
          mt={6}
          borderColor={"gray.200"}
          p={4}
          rounded={"xl"}
        >
          <Text fontSize={"xl"} fontWeight={"bold"} mb={4}>
            Personal Information
          </Text>
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            <GridItem w="100%">
              <Text textColor={"gray.500"}>First Name</Text>
              <Text fontSize={"lg"} fontWeight={"medium"}>
                {name}
              </Text>
            </GridItem>
            <GridItem w="100%">
              <Text textColor={"gray.500"}>Last Name</Text>
              <Text fontSize={"lg"} fontWeight={"medium"}>
                Last name
              </Text>
            </GridItem>
            <GridItem w="100%">
              <Text textColor={"gray.500"}>Email address</Text>
              <Text fontSize={"lg"} fontWeight={"medium"}>
                email@mail.com
              </Text>
            </GridItem>
            <GridItem w="100%">
              <Text textColor={"gray.500"}>Phone</Text>
              <Text fontSize={"lg"} fontWeight={"medium"}>
                +380 00 000 00 00
              </Text>
            </GridItem>
            <GridItem w="100%">
              <Text textColor={"gray.500"}>Bio</Text>
              <Text fontSize={"lg"} fontWeight={"medium"}>
                Front-End Developer
              </Text>
            </GridItem>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
