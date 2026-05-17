import React from "react";
import { Box, Container, Typography, Divider } from "@mui/material";

function ContentOfUse() {
	return (
		<>
			<Box
				sx={{
					height: "25px",
					backgroundColor: "#BBFF0F",
					marginBottom: 2,
				}}
			/>
			<Container>
				<Typography
					variant="h4"
					sx={{
						fontWeight: "bold",
						marginBottom: 2,
					}}
				>
					Conditions of Use
				</Typography>
				<Divider sx={{ marginBottom: 2, marginLeft: "-5%", backgroundColor: "rgba(0, 0, 0, 0.87)", width: "110%" }} />
				<Typography
					variant="body2"
					sx={{
						lineHeight: "1.6",
						fontSize: "14px",
						color: "#333",
						marginBottom: 2,
					}}
				>
					<strong>(Dummy Text)**</strong> Welcome to FDM.com. FDM.com Services LLC and/or its affiliates ("FDM") provide website features and other products and services
					to you when you visit or shop at FDM.com, use FDM products or services, use FDM applications for mobile, or use software provided by FDM in connection with any
					of the foregoing (collectively, "FDM Services"). By using the FDM Services, you agree, on behalf of yourself and all members of your household and others who
					use any Service under your account, to the following conditions.
				</Typography>
				<Typography
					variant="body2"
					sx={{
						lineHeight: "1.6",
						fontSize: "14px",
						color: "#333",
						marginBottom: 3,
					}}
				>
					Please read these conditions carefully. We offer a wide range of FDM Services, and sometimes additional terms may apply. When you use an FDM Service (for
					example, Your Profile, Gift Cards, FDM Video, Your Media Library, FDM devices, or FDM applications) you also will be subject to the guidelines, terms, and
					agreements applicable to that FDM Service ("Service Terms"). If these Conditions of Use are inconsistent with the Service Terms, those Service Terms will
					control.
				</Typography>
				<Divider sx={{ marginTop: 2, marginLeft: "-5%", width: "110%", backgroundColor: "rgba(0, 0, 0, 0.87)" }} />
			</Container>
		</>
	);
}

export default ContentOfUse;
