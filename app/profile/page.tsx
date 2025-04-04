import {
  Avatar,
  Box,
  Button,
  Container,
  InputLabel,
  TextField,
} from "@mui/material";

export default function ProfilePage() {
  return (
    <div className="root-container">
      <div className="main-container">
        <Container sx={{ marginTop: "2rem" }} className="api-dashboard">
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <span className="page-title">Profile</span>
          </Box>

          <Box sx={{ marginTop: "1rem" }}>
            <Box>
              <Avatar sx={{ width: "75px", height: "75px" }}>H</Avatar>
            </Box>
            <Box sx={{ marginTop: "1rem", width: "65%" }}>
              <p style={{ fontSize: "18px" }}>Profile Details</p>
              <Box sx={{ display: "flex", marginTop: "1rem" }}>
                <Box sx={{ flex: 1 }}>
                  <InputLabel
                    sx={{ fontSize: "14px", textTransform: "uppercase" }}
                  >
                    First Name
                  </InputLabel>
                  <TextField variant="outlined" size="medium" fullWidth />
                </Box>
                <Box sx={{ flex: 1, marginLeft: "1rem" }}>
                  <InputLabel
                    sx={{ fontSize: "14px", textTransform: "uppercase" }}
                  >
                    Last Name
                  </InputLabel>
                  <TextField variant="outlined" size="medium" fullWidth />
                </Box>
              </Box>
              <Box sx={{ display: "flex", marginTop: "1rem" }}>
                <Box sx={{ flex: 1 }}>
                  <InputLabel
                    sx={{ fontSize: "14px", textTransform: "uppercase" }}
                  >
                    Email
                  </InputLabel>
                  <TextField variant="outlined" size="medium" fullWidth />
                </Box>
                <Box sx={{ flex: 1, marginLeft: "1rem" }}>
                  <InputLabel
                    sx={{ fontSize: "14px", textTransform: "uppercase" }}
                  >
                    Phone Number
                  </InputLabel>
                  <TextField variant="outlined" size="medium" fullWidth />
                </Box>
              </Box>

              <Box
                sx={{
                  position: "fixed",
                  width: "52vw",
                  bottom: "1rem",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button variant="outlined" color="error">
                  Logout
                </Button>
                <Button variant="outlined">Save Changes</Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </div>
    </div>
  );
}
