import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography, Box, IconButton } from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

export function Navbar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center">
          <IconButton edge="start" color="inherit" sx={{ mr: 1 }}>
            <DirectionsCarIcon />
          </IconButton>
          <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: "none", color: "inherit", fontWeight: "bold" }}>
            Car Rental
          </Typography>
        </Box>
        <Box>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/vehicle">Cars</Button>
          <Button color="inherit" component={Link} to="/history">History</Button>
          <Button variant="contained" color="secondary" component={Link} to="/login">Login</Button>
          <Button sx={{ml: 2}} variant="contained" color="secondary" component={Link} to="/register">Register</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
