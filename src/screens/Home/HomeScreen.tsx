import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        backgroundImage: "url('https://static.vecteezy.com/system/resources/thumbnails/026/992/343/small_2x/classic-modified-car-with-dark-smokie-background-ai-generative-free-photo.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container>
        <Typography variant="h2" fontWeight="bold" gutterBottom sx={{ color: "white", textShadow: "2px 2px 8px rgba(0,0,0,0.8)" }}>
          Welcome to Car Rental Service
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ color: "white", textShadow: "1px 1px 6px rgba(0,0,0,0.7)" }}>
          Rent your dream car with ease and convenience.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={Link}
          to="/vehicle"
          sx={{ mt: 3, px: 5 }}
        >
          Explore Cars
        </Button>
      </Container>
    </Box>
  );
}
