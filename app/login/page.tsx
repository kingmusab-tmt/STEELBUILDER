import { Metadata } from "next";
import LoginForm from "../components/loginform";

export const metadata: Metadata = {
  title: "Steelbuilder Login Form",
  description: "Steelbuilder Login form",
};

const LoginPage = () => {
  return <LoginForm />;
};

export default LoginPage;
