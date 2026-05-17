import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import CardDummyImage from "../../../assets/Images/visa-mastercard.png";
import { getPaymentCards } from "../../../api/endpoints/paymentCard";
import { getMyAccountUserInfo } from "../../../api/endpoints/myAccount";

const AccountInfo = () => {
  const [cards, setCards] = useState([]); // Store payment cards
  const [userInfo, setUserInfo] = useState([]); // Store payment cards
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await getPaymentCards();
        setCards(response); // Assuming API returns an array of cards
      } catch (error) {
        console.error("Failed to fetch payment cards", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  useEffect(() => {
    const myAccountUserInfo = async () => {
      try {
        const response = await getMyAccountUserInfo();
        setUserInfo(response); // Assuming API returns an array of cards
      } catch (error) {
        console.error("Failed to User info for Account", error);
      } finally {
        setLoading(false);
      }
    };

    myAccountUserInfo();
  }, []);

  const handleViewAddressesButtonClick = () => {};

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h5" fontWeight="bold">
        Welcome to your account
      </Typography>

      <Accordion sx={{ marginTop: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ background: "#e6e6e6" }}
        >
          <Typography fontWeight="bold">Account Info</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <strong>Username:</strong> {userInfo.username}
          </Typography>
          <Divider sx={{ marginY: 1 }} />

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography>
              <strong>First Name:</strong> {userInfo.firstname}{" "}
            </Typography>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ marginLeft: "25%" }}
            />
            <Typography>
              <strong>Last Name:</strong> {userInfo.lastname}
            </Typography>
          </Box>
          <Divider sx={{ marginY: 1 }} />

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography>
              <strong>Email:</strong> {userInfo.email}{" "}
            </Typography>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ marginLeft: "25%" }}
            />
            <Typography>
              <strong>Phone:</strong> {userInfo.phoneNumber}
            </Typography>
          </Box>
          <Divider sx={{ marginY: 1 }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>
              <strong>Address:</strong> {userInfo.street}, {userInfo.city},{" "}
              {userInfo.state}, {userInfo.country}, {userInfo.zipcode}
            </Typography>
            <Button
              variant="contained"
              sx={{
                borderRadius: 10,
                background: "white",
                color: "black",
                fontWeight: "bold",
              }}
              onClick={handleViewAddressesButtonClick}
            >
              View Addresses
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Payment Methods Section */}
      <Accordion sx={{ marginTop: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ background: "#e6e6e6" }}
        >
          <Typography fontWeight="bold">Payment Methods</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {loading ? (
            <Typography>Loading payment methods...</Typography>
          ) : cards.length === 0 ? (
            <Typography>No saved payment methods.</Typography>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {cards.map((card, index) => (
                <Box
                  key={index}
                  sx={{ display: "flex", alignItems: "center", gap: 2 }}
                >
                  {/* Card Details */}
                  <Box sx={{ textAlign: "center" }}>
                    <Box
                      component="img"
                      src={CardDummyImage}
                      alt="Payment Methods"
                      sx={{ width: 100, marginBottom: 1 }}
                    />
                    <Typography fontWeight="bold">{card.cardName}</Typography>
                    <Typography>
                      **** **** **** {card.cardNumber.slice(-4)}
                    </Typography>
                  </Box>

                  {/* Vertical Divider (except after the last card) */}
                  {index < cards.length - 1 && (
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{ margin: 1 }}
                    />
                  )}
                </Box>
              ))}
            </Box>
          )}
        </AccordionDetails>
      </Accordion>

      {/* My Orders Accordion */}
      <Accordion sx={{ marginTop: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ background: "#e6e6e6" }}
        >
          <Typography fontWeight="bold">My Orders</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Your past orders will be displayed here.</Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default AccountInfo;
