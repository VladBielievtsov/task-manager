import { apiSlice } from "./apiSlice";

interface IData {
  name?: string;
  email: string;
  password: string;
}

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (data: IData) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    register: build.mutation({
      query: (data: IData) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = usersApiSlice;
