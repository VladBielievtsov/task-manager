import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  useDisclosure,
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { isAuth, IUser } from "../utils/isAuth";
import { useUpdateMutation } from "../store/slices/usersApiSlice";

import { useForm, SubmitHandler } from "react-hook-form";

interface Inputs {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  address: string;
  bio: string;
}

export default function EditProfileInfo({ onClose }: any) {
  const user: IUser = isAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();
  const toast = useToast();
  const [updateUser, { isLoading }] = useUpdateMutation();

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    const data = {
      token: localStorage.getItem("token") || "",
      body: formData,
    };

    try {
      await updateUser(data).then((res) => {
        onClose();
        toast({
          description: "Account has been updated",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      });
    } catch (err: any) {
      console.log(err?.data?.msg);
    }
  };

  return (
    <>
      <ModalHeader>Edit profile</ModalHeader>
      <ModalCloseButton />
      <ModalBody pb={6}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl mb={4}>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              id="name"
              placeholder="name"
              rounded={"lg"}
              defaultValue={user.name}
              {...register("name", {
                required: "Name is required",
              })}
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl mb={4} isInvalid={!!errors.lastname}>
            <FormLabel htmlFor="lastname">Last name</FormLabel>
            <Input
              id="lastname"
              placeholder="last name"
              type="text"
              rounded={"lg"}
              defaultValue={user.lastname}
              {...register("lastname")}
            />
            <FormErrorMessage>
              {errors.lastname && errors.lastname.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl mb={4} isInvalid={!!errors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              placeholder="email"
              type="email"
              rounded={"lg"}
              defaultValue={user.email}
              {...register("email", {
                required: "This is required",
                minLength: { value: 4, message: "Minimum length should be 4" },
              })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl mb={4} isInvalid={!!errors.phone}>
            <FormLabel htmlFor="phone">Phone</FormLabel>
            <Input
              id="phone"
              placeholder="phone"
              rounded={"lg"}
              defaultValue={user.phone}
              {...register("phone")}
            />
            <FormErrorMessage>
              {errors.phone && errors.phone.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl mb={4} isInvalid={!!errors.address}>
            <FormLabel htmlFor="address">Address</FormLabel>
            <Input
              id="address"
              placeholder="address"
              rounded={"lg"}
              defaultValue={user.address}
              {...register("address")}
            />
            <FormErrorMessage>
              {errors.address && errors.address.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl mb={4} isInvalid={!!errors.bio}>
            <FormLabel htmlFor="bio">Phone</FormLabel>
            <Input
              id="bio"
              placeholder="bio"
              rounded={"lg"}
              defaultValue={user.bio}
              {...register("bio")}
            />
            <FormErrorMessage>
              {errors.bio && errors.bio.message}
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
      </ModalBody>
    </>
  );
}
