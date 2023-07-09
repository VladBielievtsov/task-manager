import { apiSlice } from "./apiSlice";

interface IData {
  name?: string;
  email: string;
  password: string;
}

interface IUpload {
  token: string;
  file: FormData;
}

interface IUploadRes<T> {
  data: T[];
}

interface Data {
  url: string;
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
    getMe: build.query<any, string>({
      query: (token: string) => ({
        url: "/auth/me",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    upload: build.mutation<IUploadRes<Data>, IUpload>({
      query: (data: IUpload) => ({
        url: "/upload",
        method: "POST",
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
        body: data.file,
      }),
    }),
    update: build.mutation<any, any>({
      query: (data) => ({
        url: "/me/update",
        method: "PUT",
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
        body: data.body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetMeQuery,
  useUploadMutation,
  useUpdateMutation,
} = usersApiSlice;
