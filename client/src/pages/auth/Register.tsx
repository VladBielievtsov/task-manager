import React, { useEffect, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useRegisterMutation } from "../../store/slices/usersApiSlice";
import { setCredentials } from "../../store/slices/authSlice";
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";

interface Inputs {
  name: string;
  email: string;
  password: string;
  cpassword: string;
}

export default function Register() {
  const [serverError, setServerError] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { userInfo } = useAppSelector((state) => state.auth);

  const [registerApi, { isLoading }] = useRegisterMutation();

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    const { name, email, password } = formData;
    try {
      setServerError(null);
      const res = await registerApi({ name, email, password }).unwrap();
      navigate("/login", { state: { msg: "Account has been created" } });
    } catch (err: any) {
      console.log(err?.data?.msg);
      setServerError(err?.data?.msg);
    }
  };

  if (userInfo) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <Flex
      bg={"#26272e"}
      alignItems={"center"}
      justifyContent={"center"}
      h={"100vh"}
    >
      <Box w={"500px"} p={6} rounded={"lg"} bg={"#2d2e39"}>
        <Heading mb={4} textAlign={"center"}>
          Sign up
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          {serverError && (
            <Text textColor={"red.400"} mb={4}>
              {serverError}
            </Text>
          )}
          <FormControl mb={4} isInvalid={!!errors.name}>
            <FormLabel htmlFor="name">First name</FormLabel>
            <Input
              id="name"
              placeholder="name"
              rounded={"lg"}
              {...register("name", {
                required: "Name is required",
              })}
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl mb={4} isInvalid={!!errors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              placeholder="email"
              type="email"
              rounded={"lg"}
              {...register("email", {
                required: "This is required",
                minLength: { value: 4, message: "Minimum length should be 4" },
              })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl mb={4} isInvalid={!!errors.password}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              placeholder="password"
              type="password"
              rounded={"lg"}
              {...register("password", {
                required: "This is required",
                minLength: { value: 4, message: "Minimum length should be 4" },
              })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.cpassword}>
            <FormLabel htmlFor="cpassword">Confirm Password</FormLabel>
            <Input
              id="cpassword"
              placeholder="confirm password"
              type="password"
              rounded={"lg"}
              {...register("cpassword", {
                required: "This is required",
                validate: (val: string) => {
                  if (watch("password") !== val) {
                    return "Your password do no match";
                  }
                },
              })}
            />
            <FormErrorMessage>
              {errors.cpassword && errors.cpassword.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            mt={7}
            colorScheme="messenger"
            rounded={"lg"}
            w={"full"}
            isLoading={isSubmitting}
            type="submit"
          >
            Sign up
          </Button>
        </form>
        <Text mt={4} textAlign={"center"} textColor={"gray.400"}>
          Have an account?{" "}
          <Link className="link" to={"/login"}>
            Login
          </Link>
        </Text>
      </Box>
    </Flex>
  );
}
