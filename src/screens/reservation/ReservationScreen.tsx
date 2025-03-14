import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";
import Axios from "../../axios";

export function ReservationHistory() {
  const [reservations, setReservations] = useState([]);
  const userId = localStorage.getItem("userId");

  const fetchBookingsByUserId = async (userId: string) => {
    try {
      const response = await Axios.get(`/booking/viewHistory/${userId}`); // Correctly interpolate userId in the path
      return response.data.data; // Extract the actual data
    } catch (error) {
      // @ts-ignore
      console.error("Error fetching bookings:", error.response?.data || error.message);
      throw new Error("Failed to fetch bookings");
    }
  };

  useEffect(() => {
    if (!userId) return; // Prevent API call if userId is not available

    fetchBookingsByUserId(userId)
        .then((response) => {
          console.log("RESERVATIONS: ", response)
          setReservations(response);
        })
        .catch((error) => {
          console.error("Error fetching reservations:", error);
        });
  }, [userId]);

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Your Rental History
      </Typography>
      <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Vehicle Model</strong>
              </TableCell>
              <TableCell>
                <strong>Plate Number</strong>
              </TableCell>
              <TableCell>
                <strong>Driver Name</strong>
              </TableCell>
              <TableCell>
                <strong>Start Location</strong>
              </TableCell>
              <TableCell>
                <strong>Drop Location</strong>
              </TableCell>
              <TableCell>
                <strong>Booking Date</strong>
              </TableCell>
              <TableCell>
                <strong>Amount</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.length > 0 ? (
              reservations.map((reservation: any) => (
                <TableRow key={reservation.bookingId}>
                  <TableCell>{reservation.vehicleModel}</TableCell>
                  <TableCell>{reservation.vehiclePlateNumber}</TableCell>
                  <TableCell>{reservation.driverName}</TableCell>
                  <TableCell>{reservation.startLocation}</TableCell>
                  <TableCell>{reservation.dropLocation}</TableCell>
                  <TableCell>{reservation.bookingDate}</TableCell>
                  <TableCell>${reservation.amount}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No reservations found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
