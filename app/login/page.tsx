import { Metadata } from "next";
import LoginForm from "../components/loginform";

export const metadata: Metadata = {
  title: "Steelbuilder Login Form",
  description: "Steelbuilder Login form",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  alternates: {
    canonical: "https://www.steelbuilderstechengltd.com.ng/login",
  },
};

const LoginPage = () => {
  return <LoginForm />;
};

export default LoginPage;
