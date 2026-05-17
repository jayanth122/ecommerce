import { React, useState, useEffect } from "react";
import { Box, Typography, List, ListItem, Divider } from "@mui/material";
import AccountInfo from "../MyAccount/AccountInfo/AccountInfo";
import MyAddresses from "../MyAccount/MyAddresses/MyAddresses";
import PersonalInfo from "../MyAccount/PersonalInfo/PersonalInfo";

const MyAccount = () => {
  const [user, setUser] = useState(null);
  const [selectedSection, setSelectedSection] = useState("AccountInfo");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  if (!user) {
    return <h2>Please register first</h2>;
  }

  // Function to render selected component
  const renderContent = () => {
    switch (selectedSection) {
      case "AccountInfo":
        return <AccountInfo />;
      case "PersonalInfo":
        return <PersonalInfo />;
      case "MyAddresses":
        return <MyAddresses />;
      case "PaymentMethod":
        return <Typography>Payment Method Section</Typography>;
      case "MyOrders":
        return <Typography>My Orders Section</Typography>;
      default:
        return <Typography>Select a section</Typography>;
    }
  };

  return (
    <>
      {/* Green Strip */}
      <Box
        sx={{ height: "25px", backgroundColor: "#BBFF0F", marginBottom: 2 }}
      />

      <Box
        sx={{
          display: "flex",
          maxWidth: "1400px",
          margin: "auto",
          padding: 2,
          border: 1,
          borderColor: "grey",
        }}
      >
        {/* Sidebar Navigation */}
        <Box
          sx={{
            width: "25%",
            paddingRight: 2,
            position: "sticky",
            top: 10,
            height: "100vh",
            overflowY: "auto",
            borderRight: "1px solid #e6e6e6",
            padding: 2,
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              marginBottom: 2,
              paddingTop: 1,
              textAlign: "center",
              background: "#BBFF0F",
              height: "40px",
            }}
          >
            Hello {user.firstname} {user.lastname}!
          </Typography>
          <Divider sx={{ margin: 2 }} />
          <List>
            <Typography fontWeight="bold" sx={{ marginBottom: 2 }}>
              Manage Account
            </Typography>

            {/* Sidebar List with Active Section Highlighting */}
            {[
              { label: "My Account", key: "AccountInfo" },
              { label: "Personal Info", key: "PersonalInfo" },
              { label: "My Addresses", key: "MyAddresses" },
              { label: "Payment Method", key: "PaymentMethod" },
            ].map((item) => (
              <ListItem
                button
                key={item.key}
                onClick={() => setSelectedSection(item.key)}
                sx={{
                  backgroundColor:
                    selectedSection === item.key ? "#e6e6e6" : "transparent",
                  borderRadius: 1,
                  "&:hover": { backgroundColor: "#f5f5f5" },
                }}
              >
                {item.label}
              </ListItem>
            ))}

            <Divider sx={{ margin: 2 }} />
            <Typography fontWeight="bold" sx={{ marginBottom: 2 }}>
              My Items
            </Typography>

            {/* My Orders */}
            <ListItem
              button
              onClick={() => setSelectedSection("MyOrders")}
              sx={{
                backgroundColor:
                  selectedSection === "MyOrders" ? "#e6e6e6" : "transparent",
                borderRadius: 1,
                "&:hover": { backgroundColor: "#f5f5f5" },
              }}
            >
              My Orders
            </ListItem>

            <ListItem button>Save for Later</ListItem>
            <ListItem button>Subscriptions</ListItem>
            <ListItem button>Wishlist</ListItem>
            <Divider sx={{ margin: 2 }} />
            <Typography fontWeight="bold" sx={{ marginBottom: 2 }}>
              Customer Service
            </Typography>
            <ListItem button>Help</ListItem>
            <ListItem button>Terms of Use</ListItem>
            <ListItem button>Sign Out</ListItem>
          </List>
        </Box>

        {/* Main Content Section */}
        <Box sx={{ width: "75%", paddingLeft: 2 }}>{renderContent()}</Box>
      </Box>
    </>
  );
};

export default MyAccount;
