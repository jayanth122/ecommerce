import { Box, Container, Divider, Link, List, ListItem, ListItemText, Typography } from "@mui/material";

function PrivacyPolicy() {
	return (
		<>
			<Box
				sx={{
					height: "25px",
					backgroundColor: "#BBFF0F",
					marginBottom: 2,
				}}
			/>
			<Container sx={{ marginTop: 2 }}>
				<Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 2 }}>
					Privacy Notice
				</Typography>
				<Divider sx={{ marginBottom: 2, marginLeft: "-5%", backgroundColor: "rgba(0, 0, 0, 0.87)", width: "110%" }} />

				<Typography variant="body2" sx={{ marginBottom: 1 }}>
					<strong>(Dummy Text)**</strong> We know that you care how information about you is used and shared, and we appreciate your trust that we will do so carefully
					and sensibly. This Privacy Notice describes how FDM collects and processes your personal information through FDM services. By using FDM Services, you consent to
					the practices described in this Privacy Notice.
				</Typography>
				<Typography variant="body2">
					Please read our{" "}
					<Link to="#" sx={{ color: "#0073e6" }}>
						Additional State-Specific Privacy Disclosures
					</Link>{" "}
					and{" "}
					<Link to="#" sx={{ color: "#0073e6" }}>
						Consumer Health Data Privacy Disclosure
					</Link>{" "}
					for additional information about your personal data.
				</Typography>
				<List
					sx={{
						paddingLeft: 5,
						listStyleType: "disc",
					}}
				>
					{[
						"What Personal Information About Customers Do We Collect?",
						"For What Purposes Does FDM Use Your Personal Information?",
						"What About Cookies and Other Identifiers?",
						"Do we Share Your Personal Information?",
						"How Secure is Information About Me?",
						"What About Advertising?",
						"What Information Can I Access?",
						"What Choices Do I Have?",
						"Are Children Allowed to Use FDM Services?",
						"EU-US and Swiss-US Data Privacy Framework",
						"Conditions of Use, Notices, and Revisions",
						"Examples of Information Collected",
					].map((item, index) => (
						<ListItem
							key={index}
							disableGutters
							sx={{
								display: "list-item",
								fontSize: "14px",
							}}
						>
							<ListItemText
								primary={
									<Link to="#" underline="hover" sx={{ color: "#0073e6" }}>
										{item}
									</Link>
								}
							/>
						</ListItem>
					))}
				</List>
				<Divider sx={{ marginTop: 2, marginLeft: "-5%", width: "110%", backgroundColor: "rgba(0, 0, 0, 0.87)" }} />
			</Container>
		</>
	);
}

export default PrivacyPolicy;
