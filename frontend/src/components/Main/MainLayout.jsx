import React from "react";
import Header from "../HomePage/Header";
import SubHeader from "../HomePage/SubHeader";
import Footer from "../HomePage/Footer";
import GenericHeader from "../Registration/GenericHeader";
import CheckoutHeader from "../CheckOut/CheckoutHeader";

function MainLayout({ children }) {
  return (
    <>
      <Header />
      <SubHeader />
      <div>{children}</div>
      <Footer />
    </>
  );
}

function SignInLayout({ children }) {
  return (
    <>
    <GenericHeader />
      <div>{children}</div>
      <Footer />
    </>
  );
}

function CheckoutLayout({ children }) {
  return (
    <>
    <CheckoutHeader />
      <div>{children}</div>
      <Footer />
    </>
  );
}

export default MainLayout;
export { SignInLayout, CheckoutLayout };
