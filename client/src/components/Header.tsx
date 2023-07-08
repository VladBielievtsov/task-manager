import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/slices/authSlice";
import {
  Flex,
  Spacer,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Button,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

export default function Header() {
  const { userInfo } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    console.log("click");
    dispatch(logout(null));
    navigate("/login");
  };

  return (
    <header>
      <Flex
        alignItems={"center"}
        p={4}
        bg={"white"}
        w="100%"
        borderBottom={"1px"}
        borderColor={"gray.200"}
        position={"fixed"}
        zIndex={"100"}
      >
        <Flex alignItems={"center"}>
          <Box mr={"5"}>
            <Link to={"/"}>Logo</Link>
          </Box>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Company name
            </MenuButton>
            <MenuList>
              <MenuItem>Link</MenuItem>
              <MenuItem>Link</MenuItem>
              <MenuItem>Link</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Spacer></Spacer>
        <Box>
          <Menu>
            <MenuButton>
              <Flex alignItems={"center"}>
                <Text mr={4} fontWeight={"bold"}>
                  {userInfo?.user.name}
                </Text>
                <Avatar
                  name="Prosper Otemuyiwa"
                  src="https://bit.ly/prosper-baba"
                />
              </Flex>
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Link style={{ width: "100%", height: "100%" }} to={"/profile"}>
                  Profile
                </Link>
              </MenuItem>
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </header>
  );
}
