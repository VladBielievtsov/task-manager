import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
import { BiSolidDashboard, BiSolidFolderOpen } from "react-icons/bi";
import { isAuth, IUser } from "../utils/isAuth";

export default function Header() {
  const { userInfo } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    console.log("click");
    dispatch(logout(null));
    navigate("/login");
  };

  const user: IUser = isAuth();
  const [imageUrl, setInageUrl] = useState("");

  useEffect(() => {
    setInageUrl(
      user?.avatarUrl ? `http://localhost:4040${user?.avatarUrl}` : ""
    );
  }, [user]);

  return (
    <header>
      <Flex
        alignItems={"center"}
        px={4}
        py={3}
        bg={"#2d2e39"}
        w="100%"
        textColor={"white"}
        position={"fixed"}
        zIndex={"100"}
        shadow={"lg"}
      >
        <Flex alignItems={"center"}>
          <Box mr={"5"}>
            <Link to={"/"}>Logo</Link>
          </Box>
          <Menu>
            <MenuButton
              textColor={"white"}
              bg={"transparent"}
              as={Button}
              _hover={{ bg: "transparent" }}
              _expanded={{ bg: "transparent" }}
              _focus={{ bg: "transparent" }}
              rightIcon={<ChevronDownIcon />}
            >
              Company name
            </MenuButton>
            <MenuList bg={"#2d2e39"} borderColor={"#26272e"} shadow={"xl"}>
              <MenuItem bg={"#2d2e39"} _hover={{ bg: "#26272e" }}>
                Link
              </MenuItem>
              <MenuItem bg={"#2d2e39"} _hover={{ bg: "#26272e" }}>
                Link
              </MenuItem>
              <MenuItem bg={"#2d2e39"} _hover={{ bg: "#26272e" }}>
                Link
              </MenuItem>
            </MenuList>
          </Menu>
          <Box ml={"5"}>
            <Link to={"/"} style={{ display: "flex", alignItems: "center" }}>
              <BiSolidDashboard style={{ fontSize: "22px" }} />{" "}
              <Text ml={2}>Dashboard</Text>
            </Link>
          </Box>
          <Box ml={"5"}>
            <Link to={"/"} style={{ display: "flex", alignItems: "center" }}>
              <BiSolidFolderOpen style={{ fontSize: "22px" }} />{" "}
              <Text ml={2}>Projects</Text>
            </Link>
          </Box>
        </Flex>
        <Spacer></Spacer>
        <Box>
          <Menu>
            <MenuButton>
              <Flex alignItems={"center"}>
                <Text mr={4} fontWeight={"bold"}>
                  {user?.name}
                </Text>
                <Avatar
                  w={"40px"}
                  h={"40px"}
                  name={user?.name}
                  src={imageUrl}
                />
              </Flex>
            </MenuButton>
            <MenuList bg={"#2d2e39"} borderColor={"#26272e"} shadow={"xl"}>
              <MenuItem bg={"#2d2e39"} _hover={{ bg: "#26272e" }}>
                <Link style={{ width: "100%", height: "100%" }} to={"/profile"}>
                  Profile
                </Link>
              </MenuItem>
              <MenuItem
                bg={"#2d2e39"}
                _hover={{ bg: "#26272e" }}
                onClick={logoutHandler}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </header>
  );
}
