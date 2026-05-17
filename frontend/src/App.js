import { Route, Routes } from "react-router-dom";
import "./App.css";
import ContentOfUse from "./components/ContentOfUse/ContentOfUse";
import CustomerProfile from "./components/CustomerProfile";
import LoginPage from "./components/Login/LoginPage";
import ProductPage from "./components/ProductPage/ProductPage";
import CustomerReviews from "./components/CustomerReviews/CustomerReviews";
import WriteReview from "./components/CustomerReviews/WriteReview";
import { CheckoutLayout, SignInLayout } from "./components/Main/MainLayout";
import MainLayout from "./components/Main/MainLayout";
import CartPage from "./components/ShoppingCart/CartPage";
import HomePage from "./components/HomePage/HomePage";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import CategoryProductList from "./components/ProductList/CategoryProductList/CategoryProductList";
import ProductList from "./components/ProductList/ProductList";
import RegistrationPage from "./components/Registration/RegistrationPage";
import Checkout from "./components/CheckOut/Checkout";
import MyAccount from "./components/MyAccount/MyAccount";
import CheckoutPage from "./components/CheckOut/CheckoutPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/register"
          element={
            <SignInLayout>
              <RegistrationPage />
            </SignInLayout>
          }
        />
        <Route
          path="/login"
          element={
            <SignInLayout>
              <LoginPage />
            </SignInLayout>
          }
        />

        <Route
          path="/"
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />
        <Route
          path="/my-account"
          element={
            <MainLayout>
              <MyAccount />
            </MainLayout>
          }
        />
        <Route
          path="/product/:id"
          element={
            <MainLayout>
              <ProductPage />
            </MainLayout>
          }
        />
        <Route
          path="/write-review"
          element={
            <MainLayout>
              <WriteReview />
            </MainLayout>
          }
        />
        <Route
          path="/cart"
          element={
            <MainLayout>
              <CartPage />
            </MainLayout>
          }
        />

        <Route
          path="/privacy-policy"
          element={
            <MainLayout>
              <PrivacyPolicy />
            </MainLayout>
          }
        />
        <Route
          path="/content-of-use"
          element={
            <MainLayout>
              <ContentOfUse />
            </MainLayout>
          }
        />
        <Route
          path="/search"
          element={
            <MainLayout>
              <ProductList />
            </MainLayout>
          }
        />
        <Route
          path="/category/:category"
          element={
            <MainLayout>
              <CategoryProductList />
            </MainLayout>
          }
        />
        <Route
          path="/checkout"
          element={
            <MainLayout>
              <Checkout />
            </MainLayout>
          }
        />

        <Route
          path="/checkoutPage"
          element={
            <CheckoutLayout>
              <CheckoutPage />
            </CheckoutLayout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
