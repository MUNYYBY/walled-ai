import { Box, Card, CardContent, Container } from "@mui/material";

export default function PricingPage() {
  return (
    <div className="root-container">
      <div className="main-container">
        <Container sx={{ marginTop: "2rem" }} className="api-dashboard">
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <span className="page-title">Pricing</span>
          </Box>
          <Card
            sx={{
              backgroundColor: "#fff",
              padding: "0.75rem",
              marginTop: "1.75rem",
            }}
          >
            <CardContent>
              <p>Coming soon</p>
            </CardContent>
          </Card>
        </Container>
      </div>
    </div>
  );
}
