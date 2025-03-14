import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
} from "@mui/material";
import axios from "axios";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import GroupIcon from "@mui/icons-material/Group";
import {getAllVehicles, VehicleCustomResult} from "../../services/apiAuth";
import Axios from "../../axios";
import {format} from "date-fns";

export function CarList() {
  const [cars, setCars] = useState<VehicleCustomResult[]>([]);

  const [selectedCar, setSelectedCar] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [pickUpLocation, setPickUpLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [totalKm, setTotalKm] = useState<number>(0);
  const [hours, setHours] = useState("");

  useEffect(() => {
    getAllVehicles()
      .then((response) => {
        setCars(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleOpen = (car: any) => {
    setSelectedCar(car);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDate("");
    setPickUpLocation("");
    setTotalKm(0);
    setDropLocation("");
    setHours("");
  };

  const calculateAmount = (pricePerKm: number, totalKm: number) => {
    return pricePerKm * totalKm;
  };

  const handleRent = () => {
    const formattedDate = format(new Date(), "yyyy-MM-dd HH:mm:ss.SSSSSS");

    Axios
        .post("/booking/save", {
          vehicleId: selectedCar.vehicleId,
          pickUpLocation,
          dropLocation,
          hours: String(hours),
          totalKm: Number(totalKm),
          bookingDateTime: formattedDate,
          totalAmount: calculateAmount(selectedCar.pricePerKm, Number(totalKm)),
          status: "Pending",
          customerId: localStorage.getItem("userId")
        })
        .then((response) => {
          console.log(response.data);
          alert("Booking Confirmed");
        })
        .catch((error) => {
          console.error(error);
          alert("Failed to book the car");
        });
    handleClose();
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h3" textAlign="center" gutterBottom>
        Available Cars for Rent
      </Typography>
      <Grid container spacing={4}>
        {cars.map((car: any) => (
          <Grid item xs={12} sm={6} md={4} key={car.vehicleId}>
            <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
              <CardMedia
                component="img"
                height="200"
                image={`data:image/png;base64,${car.image}`}
                alt={car.vehicleModel}
              />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {car.vehicleModel} ({car.category})
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Plate: {car.plateNumber}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Passengers: {car.passengerCount}
                </Typography>
                <Typography variant="body1" fontWeight="bold" mt={1}>
                  ${car.pricePerKm} per km
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={() => handleOpen(car)}
                >
                  Rent Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Rent {selectedCar?.vehicleModel}</DialogTitle>
        <DialogContent>
          <CardMedia
            component="img"
            height="200"
            image={`data:image/png;base64,${selectedCar?.image}`}
            alt={selectedCar?.vehicleModel}
          />
          <Typography variant="h6" fontWeight="bold">
            {selectedCar?.vehicleModel} ({selectedCar?.category})
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <DirectionsCarIcon sx={{ mr: 1 }} />
            <Typography variant="body2" color="text.secondary">
              Plate: {selectedCar?.plateNumber}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* Users icon */}
            <GroupIcon sx={{ mr: 1 }} />
            <Typography variant="body2" color="text.secondary">
              Passengers: {selectedCar?.passengerCount}
            </Typography>
          </Box>
          <Typography variant="body1" fontWeight="bold" mt={1}>
            ${selectedCar?.pricePerKm} per km
          </Typography>
          <TextField
            fullWidth
            type="date"
            label="Booking Date"
            InputLabelProps={{ shrink: true }}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            sx={{ my: 2 }}
          />
          <TextField
            fullWidth
            type="text"
            label="Pickup Location"
            InputLabelProps={{ shrink: true }}
            value={pickUpLocation}
            onChange={(e) => setPickUpLocation(e.target.value)}
            sx={{ my: 2 }}
          />
          <TextField
            fullWidth
            type="text"
            label="Drop Location"
            InputLabelProps={{ shrink: true }}
            value={dropLocation}
            onChange={(e) => setDropLocation(e.target.value)}
            sx={{ my: 2 }}
          />
          <TextField
            fullWidth
            type="text"
            label="Hours"
            InputLabelProps={{ shrink: true }}
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            sx={{ my: 2 }}
          />
          <TextField
            fullWidth
            type="number"
            label="Total Distance(Km)"
            InputLabelProps={{ shrink: true }}
            value={totalKm}
            onChange={(e) => setTotalKm(Number(e.target.value))}
            sx={{ my: 2 }}
          />
          <TextField
            fullWidth
            type="text"
            disabled
            label="Amount"
            InputLabelProps={{ shrink: true }}
            value={selectedCar?.pricePerKm * Number(totalKm)}
            sx={{ my: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleRent} variant="contained" color="primary">
            Confirm Rental
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
