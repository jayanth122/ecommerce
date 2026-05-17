import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Route, Routes, Link } from "react-router-dom";
import axios from 'axios';
import "../../styles/RegistrationPage/RegistrationPage.css"
import GenericHeader from "./GenericHeader";
import ErrorIcon from '@mui/icons-material/Error';
import { addMultipleToShoppingCart } from "../../api/endpoints/cart";


const RegistrationPage = () => {
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^_])[A-Za-z\d@$!%*?&#^_]{1,}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");
  const [emailTaken, setEmailTaken] = useState(false);
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [clicked, setClicked] = useState(false);
  const [error, setError] = useState({ message: "", flag: false });
  const navigate = useNavigate();

  let newCustomer = {};

  const handleClick = () => {
    setClicked(true);
  }

  const onEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailTaken(false);
  }

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
    setUsernameTaken(false);
  }

  const handleRegister = async (e) => {
    handleClick();
    e.preventDefault();

    newCustomer = {
      firstname,
      lastname,
      username,
      email,
      password,
    };

    const loginInfo = {
      username,
      password,
    };

    if (
      firstname !== "" &&
      lastname !== "" &&
      emailPattern.test(email) &&
      passwordPattern.test(password) &&
      confirmPassword === password
    ) {
      try {
        const res = await axios.post("/api/v1/public/register", newCustomer);
        console.log(res.data);

        if (res.data.hasOwnProperty("msg")) {
          setErrors("sorry");
        } else {
          try {
            const loginRes = await axios.post(
              "http://localhost:8080/api/v1/public/login",
              loginInfo
            );
            console.log(loginRes);
            console.log("Login successful");

            localStorage.setItem(
              "loggedInUser",
              JSON.stringify(loginRes.data.user)
            );
            localStorage.setItem("token", loginRes.data.token);
            console.log("Token stored: " + loginRes.data.token);

            // Handle cart items in local storage
            const storedCartItems = localStorage.getItem("cartItems");
            if (storedCartItems) {
              const cartItems = JSON.parse(storedCartItems);

              if (cartItems.length > 0) {
                console.log("Cart items found:", cartItems);

                const formattedCartItems = cartItems.map((item) => ({
                  quantity: item.quantity,
                  size: item.size,
                  productId: item.productId,
                }));

                setTimeout(async () => {
                  try {
                    await addMultipleToShoppingCart(formattedCartItems);
                    console.log("Cart items stored in backend.");
                    localStorage.removeItem("cartItems");
                  } catch (cartError) {
                    console.error("Error saving cart items:", cartError);
                  }
                }, 2000);
              }
            }
          } catch (err) {
            if (err.response?.status === 401 || err.response?.status === 404) {
              setError({
                message: "Incorrect username or password",
                flag: true,
              });
            } else {
              setError({
                message: "Unexpected error, please try again later!",
                flag: true,
              });
            }

            setTimeout(() => {
              setError({ message: "", flag: false });
            }, 3000);
          }

          navigate("/", { state: { justCreated: true } });
        }
      } catch (err) {
        console.log(err);
        console.log(err.response?.data);

        if (err.response?.data === "User email exists") {
          setEmailTaken(true);
        } else if (err.response?.data === "Username exists") {
          setUsernameTaken(true);
        }
      }
    }

    /*
    // Simulate registration logic (e.g., call an API)
    if (username && email && password) {
      localStorage.setItem("user", JSON.stringify({ username, email }));
      navigate("/profile");
    } else {
      setError("All fields are required.");
    }
    */
  };

  return (
    <>
      <div class="register-box">
        <div class="register-container">
          <form onSubmit={handleRegister}>
            <h2>Create Account</h2>
            <br />
            <div class="register-input-group">
              <label><b>First Name</b></label>
              <input
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                //required
                class="register-input"
              />
              {clicked && firstname === ""
                ? <div class="error-msg"><ErrorIcon fontSize="small" /> <span class="err-text"><b>Please provide your first name.</b></span></div>
                : <></>
              }
            </div>


            <div class="register-input-group">
              <label><b>Last Name</b></label>
              <input
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                //required
                class="register-input"
              />
              {clicked && lastname === ""
                ? <div class="error-msg"><ErrorIcon fontSize="small" /> <span class="err-text"><b>Please provide your last name.</b></span></div>
                : <></>
              }
            </div>

            <div class="register-input-group">
              <label><b>Username</b></label>
              <input
                type="text"
                value={username}
                onChange={onUsernameChange}
                //required
                class="register-input"
              />
              {clicked && username === ""
                ? <div class="error-msg"><ErrorIcon fontSize="small" /> <span class="err-text"><b>Please provide a username.</b></span></div>
                : <></>
              }

              {clicked && usernameTaken
                ? <div class="error-msg"><ErrorIcon fontSize="small" /> <span class="err-text"><b>This username has been taken.</b></span></div>
                : <></>
              }
            </div>

            <div class="register-input-group">
              <label><b>Email</b></label>
              <input
                type="text"
                value={email}
                onChange={onEmailChange}
                //required
                class="register-input"
              />
              {clicked && !emailPattern.test(email)
                ? <div class="error-msg"><ErrorIcon fontSize="small" /> <span class="err-text"><b>Invalid email.</b></span></div>
                : <></>
              }
              {clicked && emailTaken
                ? <div class="error-msg"><ErrorIcon fontSize="small" /> <span class="err-text"><b>This email has been taken.</b></span></div>
                : <></>
              }
            </div>

            <div class="register-input-group">
              <label><b>Password</b></label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                //required
                class="register-input"
              />
              {clicked && !passwordPattern.test(password)
                ? <div class="error-msg"><ErrorIcon fontSize="small" />
                  <span class="err-text">
                    <b>Password must contain at least one uppercase letter, one number, and one special character.</b>
                  </span>
                </div>
                : <></>
              }
            </div>

            <div class="register-input-group">
              <label><b>Confirm Password</b></label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                //required
                class="register-input"
              />
              {clicked && password != confirmPassword
                ? <div class="error-msg"><ErrorIcon fontSize="small" /> <span class="err-text"><b>Passwords do not match.</b></span></div>
                : <></>
              }
            </div>


            <div class="btn-container">
              <button type="submit" class="signup-btn"><b>Sign Up</b></button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
}

export default RegistrationPage;

