import ErrorIcon from "@mui/icons-material/Error";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addMultipleToShoppingCart } from "../../api/endpoints/cart";
import "../../styles/LoginPage/LoginPage.css";
const LoginPage = () => {
  let loginInfo = {};
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passType, setPassType] = useState("password");
  const [error, setError] = useState({ message: "", flag: false });
  const [clicked, setClicked] = useState(false);

  loginInfo = {
    username: username,
    password: password,
  };

  const onChangePass = () => {
    if (passType === "password") {
      setPassType("text");
    } else {
      setPassType("password");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setClicked(true);

    if (password !== "" && username !== "") {
      try {
        const res = await axios.post(
          "http://192.168.2.47:8080/api/v1/public/login",
          loginInfo
        );

        console.log("Login successful");
        localStorage.setItem("loggedInUser", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token); // Store token correctly

        // Check for cart items in local storage
        const storedCartItems = localStorage.getItem("cartItems");
        localStorage.removeItem("guestAddress");
        if (storedCartItems) {
          const cartItems = JSON.parse(storedCartItems);

          if (cartItems.length > 0) {
            console.log("Cart items found in local storage:", cartItems);

            const formattedCartItems = cartItems.map((item) => ({
              quantity: item.quantity,
              size: item.size,
              productId: item.productId,
            }));

            setTimeout(async () => {
              try {
                await addMultipleToShoppingCart(formattedCartItems);
                console.log("Cart items successfully stored in the backend.");
                localStorage.removeItem("cartItems"); // Clear local cart after saving
              } catch (cartError) {
                console.error("Error saving cart items:", cartError);
              }
            }, 2000);
          }
        }

        navigate("/", {
          state: { justCreated: false },
        });
      } catch (err) {
        if (err && (err.status == 401 || err.status == 404)) {
          setError({ message: "Incorrect username or password", flag: true });
          setTimeout(() => {
            setError({ message: "", flag: false });
          }, 3000);
        } else {
          setError({
            message: "Unexpected error, please try again later!",
            flag: true,
          });
          setTimeout(() => {
            setError({ message: "", flag: false });
          }, 3000);
        }
      }
    }
  };

  return (
    <>
      <div class="login-box">
        <div>
          <div class="login-container">
            <form onSubmit={handleLogin}>
              <h2>Sign In</h2>
              <br />

              <div>
                <label>
                  <b>Username</b>
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  //required
                  class="login-input"
                />
              </div>

              {username === "" && clicked ? (
                <div class="error-msg">
                  <ErrorIcon fontSize="small" />{" "}
                  <span class="err-text">
                    <b>Please enter your username.</b>
                  </span>
                </div>
              ) : (
                <></>
              )}

              <div>
                <label>
                  <b>Password</b>
                </label>
                <input
                  type={passType}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  //required
                  class="login-input"
                />
              </div>

              {password === "" && clicked ? (
                <div class="error-msg">
                  <ErrorIcon fontSize="small" />{" "}
                  <span class="err-text">
                    <b>Please enter your password.</b>
                  </span>
                </div>
              ) : (
                <></>
              )}

              {error.flag ? (
                <div class="error-msg">
                  <ErrorIcon fontSize="small" />{" "}
                  <span class="err-text">
                    <b>{error.message}</b>
                  </span>
                </div>
              ) : (
                <></>
              )}

              <div class="show-pass">
                <input type="checkbox" onChange={onChangePass} id="chk-pass" />
                <label for="chk-pass">Show Password</label>
              </div>

              <a href="" class="loginpage-link">
                Forgot Password?
              </a>

              <div class="btn-container">
                <button type="submit" class="login-btn">
                  <b>Sign In</b>
                </button>
              </div>
            </form>
          </div>
          <a href="/register" class="loginpage-link">
            Don't have an account yet? Create one!
          </a>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
