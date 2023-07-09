import { useGetMeQuery } from "../store/slices/usersApiSlice";

export interface IUser {
  id: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
  avatarUrl: string;
  phone: string;
  address: string;
  bio: string;
}

export const isAuth = () => {
  try {
    const { data } = useGetMeQuery(localStorage.getItem("token") || "");
    return data;
  } catch (err: any) {
    return err;
  }
};
