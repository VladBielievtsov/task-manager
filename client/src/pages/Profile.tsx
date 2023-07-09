import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Container,
  Avatar,
  Text,
  Grid,
  GridItem,
  AvatarBadge,
  Input,
  FormLabel,
  useToast,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
} from "@chakra-ui/react";
import { useAppSelector } from "../hooks/redux";
import { BiSolidPencil } from "react-icons/bi";
import { isAuth, IUser } from "../utils/isAuth";
import { useUploadMutation } from "../store/slices/usersApiSlice";
import { axios } from "../utils/axios";
import EditProfileInfo from "../components/EditProfileInfo";

export default function Profile() {
  const user: IUser = isAuth();
  const [imageUrl, setInageUrl] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  useEffect(() => {
    setInageUrl(
      user?.avatarUrl ? `http://localhost:4040${user?.avatarUrl}` : ""
    );
  }, [user]);

  const [upload, { isLoading }] = useUploadMutation();

  const avatarHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    const file = e.target.files?.[0] as File;
    formData.append("image", file);
    try {
      const token = localStorage.getItem("token") || "";
      const body = {
        token,
        file: formData,
      };
      let res = await upload(body);

      axios
        .patch("/me/change-avatar", {
          // @ts-ignore
          avatarUrl: res.data.url,
        })
        .then((res) => {
          toast({
            description: res.data.msg,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        });
      // @ts-ignore
      setInageUrl(`http://localhost:4040${res.data.url}`);
    } catch (err: any) {
      console.log(err?.data?.msg);
    }
  };

  return (
    <Box pt={10} minH={"100vh"}>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={"#2d2e39"} maxW={"600px"}>
          <EditProfileInfo onClose={onClose} />
        </ModalContent>
      </Modal>
      <Container maxW={"container.xl"} rounded={"xl"} py={6}>
        <Text fontSize={"2xl"} fontWeight={"bold"} mb={6}>
          My Profile
        </Text>
        <Flex alignItems={"flex-start"} py={4} rounded={"xl"}>
          <FormLabel cursor={"pointer"}>
            <Input
              type="file"
              visibility={"hidden"}
              opacity={0}
              w={"0"}
              h={"0"}
              p={"0"}
              onChange={avatarHandler}
            />
            <Avatar
              w={"90px"}
              h={"90px"}
              size="2xl"
              textColor={"white"}
              name={user?.name}
              src={imageUrl}
            >
              <AvatarBadge
                boxSize="30px"
                top={"-8px"}
                bg="gray.400"
                border={"2px"}
                fontSize={"17px"}
                borderColor={"#26272e"}
              >
                <BiSolidPencil />
              </AvatarBadge>
            </Avatar>
          </FormLabel>
          <Box ml={10}>
            <Text fontSize={"xl"} mb={1} fontWeight={"semibold"}>
              {user?.name}
            </Text>
            <Text fontSize={"lg"} textColor={"gray.400"}>
              {user?.bio}
            </Text>
            <Text fontSize={"lg"} textColor={"gray.400"}>
              {user?.address}
            </Text>
          </Box>
          <Button
            ml={"auto"}
            bg={"#49485b"}
            textColor={"white"}
            _hover={{ bg: "#2d2e38" }}
            onClick={onOpen}
          >
            Edit
          </Button>
        </Flex>
        <Box bg={"#2d2e39"} mt={6} p={6} rounded={"xl"}>
          <Text fontSize={"xl"} fontWeight={"bold"} mb={4}>
            Personal Information
          </Text>
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            <GridItem w="100%">
              <Text textColor={"gray.400"}>First Name</Text>
              <Text fontSize={"lg"} fontWeight={"medium"}>
                {user?.name}
              </Text>
            </GridItem>
            {user?.lastname && (
              <GridItem w="100%">
                <Text textColor={"gray.400"}>Last Name</Text>
                <Text fontSize={"lg"} fontWeight={"medium"}>
                  {user?.lastname}
                </Text>
              </GridItem>
            )}
            <GridItem w="100%">
              <Text textColor={"gray.400"}>Email address</Text>
              <Text fontSize={"lg"} fontWeight={"medium"}>
                {user?.email}
              </Text>
            </GridItem>
            {user?.phone && (
              <GridItem w="100%">
                <Text textColor={"gray.400"}>Phone</Text>
                <Text fontSize={"lg"} fontWeight={"medium"}>
                  {user?.phone}
                </Text>
              </GridItem>
            )}
            {user?.bio && (
              <GridItem w="100%">
                <Text textColor={"gray.400"}>Bio</Text>
                <Text fontSize={"lg"} fontWeight={"medium"}>
                  {user?.bio}
                </Text>
              </GridItem>
            )}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
