import { BrowserRouter as Router } from "react-router-dom";
import { Box, Container, CssBaseline } from "@mui/material";
import { Navbar } from "./components/MenuBar/MenuBar";
import RootRoutes from "./components/RootPage/RootRoutes";

function App() {
  return (
      <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}>
        <Router>
          <CssBaseline />
          <Navbar />
          <Container>
            <RootRoutes />
          </Container>
        </Router>
      </Box>
  );
}

export default App;
