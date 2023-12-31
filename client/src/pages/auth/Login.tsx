import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useLoginMutation } from "../../store/slices/usersApiSlice";
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
  useToast,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";

interface Inputs {
  name: string;
  email: string;
  password: string;
  cpassword: string;
}

export default function Login() {
  const [serverError, setServerError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const navigate = useNavigate();

  const { state } = useLocation();
  const toast = useToast();
  useEffect(() => {
    if (state) {
      toast({
        description: state?.msg,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate(location.pathname, {});
    }
  }, []);

  const dispatch = useAppDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    try {
      setServerError(null);
      const email = formData.email;
      const password = formData.password;
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
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
          Sign in
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          {serverError && (
            <Text textColor={"red.400"} mb={4}>
              {serverError}
            </Text>
          )}
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
          <Button
            mt={4}
            colorScheme="messenger"
            rounded={"lg"}
            w={"full"}
            isLoading={isSubmitting}
            type="submit"
          >
            Sign in
          </Button>
        </form>
        <Text mt={4} textAlign={"center"} textColor={"gray.400"}>
          Don't have an account?{" "}
          <Link className="link" to={"/register"}>
            Create Account
          </Link>
        </Text>
      </Box>
    </Flex>
  );
}
