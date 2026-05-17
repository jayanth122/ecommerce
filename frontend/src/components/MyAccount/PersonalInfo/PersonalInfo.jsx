import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Snackbar,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  getUserPersonalInfo,
  updateUserPersonalInfo,
  updateUserCredentials,
  changePassword,
} from "../../../api/endpoints/personalInfo";

const PersonalInfo = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
  });

  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [editSection, setEditSection] = useState({
    name: false,
    account: false,
    address: false,
    password: false,
  });
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const fetchUserInfo = async () => {
    try {
      const data = await getUserPersonalInfo();
      setUserInfo(data);
    } catch (error) {
      console.error("Failed to fetch user info", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const validateFields = (sectionKey) => {
    const newErrors = {};
    if (sectionKey === "name") {
      if (!userInfo.firstname.trim())
        newErrors.firstname = "First name is required";
      if (!userInfo.lastname.trim())
        newErrors.lastname = "Last name is required";
    } else if (sectionKey === "account") {
      if (!userInfo.username.trim())
        newErrors.username = "Username is required";
      if (!userInfo.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(userInfo.email)) {
        newErrors.email = "Invalid email format";
      }
    } else if (sectionKey === "address") {
      if (!userInfo.phoneNumber.trim())
        newErrors.phoneNumber = "Phone number is required";
      if (!userInfo.street.trim()) newErrors.street = "Street is required";
      if (!userInfo.city.trim()) newErrors.city = "City is required";
      if (!userInfo.state.trim()) newErrors.state = "State is required";
      if (!userInfo.country.trim()) newErrors.country = "Country is required";
      if (!userInfo.zipcode.trim()) newErrors.zipcode = "Zipcode is required";
    } else if (sectionKey === "password") {
      if (!passwordData.oldPassword)
        newErrors.oldPassword = "Old password is required";
      if (!passwordData.newPassword)
        newErrors.newPassword = "New password is required";
      if (!passwordData.confirmNewPassword)
        newErrors.confirmNewPassword = "Please confirm your new password";
      if (
        passwordData.newPassword &&
        passwordData.confirmNewPassword &&
        passwordData.newPassword !== passwordData.confirmNewPassword
      ) {
        newErrors.confirmNewPassword = "Passwords do not match";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordEdit = () => {
    setPasswordData({
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
    setEditSection((prev) => ({ ...prev, password: true }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClickShowPassword = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSave = async (sectionKey) => {
    if (!validateFields(sectionKey)) {
      setSnackbarMessage("Please correct the highlighted errors.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    try {
      if (sectionKey === "account") {
        const updatedCredentials = {
          username: userInfo.username,
          email: userInfo.email,
        };
        try {
          await updateUserCredentials(updatedCredentials);
          setSnackbarMessage("Credentials updated successfully");
          setSnackbarSeverity("success");
        } catch (error) {
          const backendMessage =
            error.response?.data || "Failed to update credentials";
          setSnackbarMessage(backendMessage);
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
          return;
        }
      } else if (sectionKey === "address") {
        await updateUserPersonalInfo(userInfo);
        setSnackbarMessage("Address updated successfully");
        setSnackbarSeverity("success");
      } else if (sectionKey === "name") {
        await updateUserPersonalInfo(userInfo);
        setSnackbarMessage("Name updated successfully");
        setSnackbarSeverity("success");
      } else if (sectionKey === "password") {
        const passwordUpdate = {
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword,
        };
        try {
          await changePassword(passwordUpdate);
          setSnackbarMessage("Password updated successfully");
          setSnackbarSeverity("success");
        } catch (error) {
          const backendMessage =
            error.response?.data || "Failed to change password";
          setSnackbarMessage(backendMessage);
          setSnackbarSeverity("error");
        }
      } else if (sectionKey === "language") {
      }
      setEditSection((prev) => ({ ...prev, [sectionKey]: false }));
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Update failed", error);
      setSnackbarMessage("Update failed");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleCancel = (sectionKey) => {
    fetchUserInfo();
    setErrors({});
    setEditSection((prev) => ({ ...prev, [sectionKey]: false }));
  };

  const renderField = (label, name, sectionKey, type = "text") => {
    const isEditable = editSection[sectionKey];
    const value = userInfo[name];
    return (
      <Grid item xs={12} sm={6}>
        {isEditable ? (
          <TextField
            fullWidth
            label={label}
            name={name}
            value={value}
            type={type}
            onChange={handleChange}
            error={!!errors[name]}
            helperText={errors[name] || ""}
            InputProps={
              type === "password"
                ? {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => handleClickShowPassword(name)}
                        >
                          {showPassword[name] ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }
                : {}
            }
          />
        ) : (
          <Box>
            <Typography variant="subtitle2" color="textSecondary">
              {label}
            </Typography>
            <Typography variant="body1" fontWeight="500">
              {type === "password" ? "••••••••" : value || "-"}
            </Typography>
          </Box>
        )}
      </Grid>
    );
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Personal Information
      </Typography>

      {/* Name Card */}
      <Card sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            <strong>Name</strong>
          </Typography>
          <Grid container spacing={2}>
            {renderField("First Name", "firstname", "name")}
            {renderField("Last Name", "lastname", "name")}
          </Grid>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          {editSection.name ? (
            <>
              <Button
                variant="contained"
                onClick={() => handleSave("name")}
                sx={{ backgroundColor: "#BBFF0F", color: "black" }}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                onClick={() => handleCancel("name")}
                sx={{ marginLeft: 1 }}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              onClick={() =>
                setEditSection((prev) => ({ ...prev, name: true }))
              }
            >
              Edit
            </Button>
          )}
        </CardActions>
      </Card>

      {/* Account Info Card */}
      <Card sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            <strong>Credentials</strong>
          </Typography>
          <Grid container spacing={2}>
            {renderField("Username", "username", "account")}
            {renderField("Email", "email", "account")}
          </Grid>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          {editSection.account ? (
            <>
              <Button
                variant="contained"
                onClick={() => handleSave("account")}
                sx={{ backgroundColor: "#BBFF0F", color: "black" }}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                onClick={() => handleCancel("account")}
                sx={{ marginLeft: 1 }}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              onClick={() =>
                setEditSection((prev) => ({ ...prev, account: true }))
              }
            >
              Edit
            </Button>
          )}
        </CardActions>
      </Card>

      {/* Password Card */}
      <Card sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            <strong>Password</strong>
          </Typography>
          <Grid container spacing={2}>
            {editSection.password ? (
              <>
                {["oldPassword", "newPassword", "confirmNewPassword"].map(
                  (field) => (
                    <Grid item xs={12} sm={6} key={field}>
                      <TextField
                        fullWidth
                        label={
                          field === "oldPassword"
                            ? "Old Password"
                            : field === "newPassword"
                            ? "New Password"
                            : "Re-enter New Password"
                        }
                        name={field}
                        type={showPassword[field] ? "text" : "password"}
                        value={passwordData[field]}
                        onChange={handlePasswordChange}
                        error={!!errors[field]}
                        helperText={errors[field] || ""}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => handleClickShowPassword(field)}
                              >
                                {showPassword[field] ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  )
                )}
              </>
            ) : (
              <Box sx={{ marginLeft: 2, marginTop: 2 }}>
                <Typography variant="subtitle2" color="textSecondary">
                  Password
                </Typography>
                <Typography variant="body1" fontWeight="500">
                  ••••••••••••••••
                </Typography>
              </Box>
            )}
          </Grid>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          {editSection.password ? (
            <>
              <Button
                variant="contained"
                onClick={() => handleSave("password")}
                sx={{ backgroundColor: "#BBFF0F", color: "black" }}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                onClick={() => handleCancel("password")}
                sx={{ marginLeft: 1 }}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button onClick={handlePasswordEdit}>Edit</Button>
          )}
        </CardActions>
      </Card>

      {/* Contact & Address Card */}
      <Card sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            <strong>Contact & Address</strong>
          </Typography>
          <Grid container spacing={2}>
            {renderField("Phone Number", "phoneNumber", "address")}
            {renderField("Street", "street", "address")}
            {renderField("City", "city", "address")}
            {renderField("State", "state", "address")}
            {renderField("Country", "country", "address")}
            {renderField("Zipcode", "zipcode", "address")}
          </Grid>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          {editSection.address ? (
            <>
              <Button
                variant="contained"
                onClick={() => handleSave("address")}
                sx={{ backgroundColor: "#BBFF0F", color: "black" }}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                onClick={() => handleCancel("address")}
                sx={{ marginLeft: 1 }}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              onClick={() =>
                setEditSection((prev) => ({ ...prev, address: true }))
              }
            >
              Edit
            </Button>
          )}
        </CardActions>
      </Card>

      {/* Language Preferences Card */}
      <Card sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            <strong>Language Preferences</strong>
          </Typography>
          <Box>
            <Typography variant="subtitle2" color="textSecondary">
              Preferred Language
            </Typography>
            <Typography variant="body1" fontWeight="500">
              English
            </Typography>
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          {editSection.password ? (
            <>
              <Button
                variant="contained"
                onClick={() => handleSave("language")}
                sx={{ backgroundColor: "#BBFF0F", color: "black" }}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                onClick={() => handleCancel("language")}
                sx={{ marginLeft: 1 }}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button>Edit</Button>
          )}
        </CardActions>
      </Card>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PersonalInfo;
