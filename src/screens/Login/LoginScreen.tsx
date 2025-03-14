import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {SubmitHandler, useForm} from "react-hook-form";
import {AuthRequestDto, LoginResponse} from "../../types";
import {toast} from "react-toastify";
import {userLogin} from "../../services/apiAuth";

export function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();
  //   try {
  //     // const res = await axios.post("/api/login", formData);
  //     // localStorage.setItem("token", res.data.token);
  //     navigate("/vehicle");
  //   } catch (error) {
  //     console.error("Login failed", error);
  //   }
  // };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthRequestDto>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<AuthRequestDto> = async (data) => {
    try {
      const response = await userLogin(data);
      console.log("RESPONSE IS: ", response)

      if (response.code !== 200) {
        toast.error(response.message || "Login failed");
        return;
      }

      if (response.jwt) {
        // Store relevant data in localStorage
        localStorage.setItem("customer_token", response.jwt);
        localStorage.setItem("userId", response.userId.toString());
        localStorage.setItem("role", response.role);
        localStorage.setItem("userName", response.userName);

        toast.success(response.message || "Logged in successfully");
        navigate("/dashboard"); // Adjusted to match your project
      } else {
        toast.error("No JWT token received from server");
      }
    } catch (error) {
      toast.error((error as Error).message || "An error occurred during login");
    }
  };

  return (
      <Container component="main" maxWidth="sm">
        <Paper elevation={3} sx={{ padding: 4, mt: 10, borderRadius: 3 }}>
          <Typography variant="h4" textAlign="center" gutterBottom>
            Login to Your Account
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Please provide a valid email address",
                      },
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    required
                />
              </Grid>
            </Grid>
            <Box mt={3}>
              <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </Box>
            <Box mt={2} textAlign="center">
              <Typography variant="body2">
                Don't have an account?{" "}
                <Button
                    onClick={() => navigate("/register")}
                    sx={{ textTransform: "none" }}
                >
                  Register
                </Button>
              </Typography>
            </Box>
          </form>
        </Paper>
      </Container>
  );
}
