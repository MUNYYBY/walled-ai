import { Box, Container } from "@mui/material";

export default function Hallucination() {
  return (
    <div className="root-container">
      <div className="main-container">
        <Container sx={{ marginTop: "2rem" }} className="api-dashboard">
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <span className="page-title">Hallucination</span>
          </Box>
          <Box sx={{ marginTop: "2rem" }}>
            <p>Coming soon</p>
          </Box>
        </Container>
      </div>
    </div>
  );
}
