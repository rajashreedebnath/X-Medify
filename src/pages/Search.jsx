import { Container, Stack, Box, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import HospitalCard from "../components/HospitalCard/HospitalCard";
import icon from "../assets/tick.jpg";
import cta from "../assets/cta.jpg";
import SearchHospital from "../components/SearchHospital/SearchHospital";
import BookingModal from "../components/BookingModal/BookingModal";
import AutohideSnackbar from "../components/AutohideSnackbar/AutohideSnackbar.jsx";
import NavBar from "../components/NavBar/NavBar";

export default function Search() {
  
  const [searchParams] = useSearchParams();
  const [hospitals, setHospitals] = useState([]);
  const state = searchParams.get("state");
  const city = searchParams.get("city");

console.log("STATE:", state); // should log "Delaware"
console.log("CITY:", city);   // should log "NEWARK"

  const availableSlots = {
    morning: ["11:30 AM"],
    afternoon: ["12:00 PM", "12:30 PM", "01:30 PM", "02:00 PM", "02:30 PM"],
    evening: ["06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM"],
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({});
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  
  useEffect(() => {
  const getHospitals = async () => {
    setHospitals([]);
    setIsLoading(true);
    try {
      const res = await axios.get(
        `https://meddata-backend.onrender.com/data?state=${state}&city=${city}`
      );
      console.log("HOSPITAL DATA:", res.data);
      setHospitals(res.data);
    } catch (err) {
      console.log("API ERROR:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (state && city) {
    getHospitals();
  }
}, [state, city]);

const handleBookingModal = (details) => {
    setBookingDetails(details);
    setIsModalOpen(true);
  };

  return (
    <>
      <NavBar />
      <Box
        sx={{
          background: "linear-gradient(#EFF5FE, rgba(241,247,255,0.47))",
          width: "100%",
          pl: 0,
        }}
      >
        <Box
          sx={{
            position: "relative",
            background: "linear-gradient(90deg, #2AA7FF, #0C8CE5)",
            borderBottomLeftRadius: "1rem",
            borderBottomRightRadius: "1rem",
          }}
        >
          <Container
            maxWidth="xl"
            sx={{
              background: "#fff",
              p: 3,
              borderRadius: 2,
              transform: "translatey(50px)",
              mb: "50px",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            }}
          >
            <SearchHospital />
          </Container>
        </Box>

        <Container maxWidth="xl" sx={{ pt: 8, pb: 10, px: { xs: 0, md: 4 } }}>
          {hospitals.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography
                component="h1"
                fontSize={24}
                lineHeight={1.1}
                mb={2}
                fontWeight={500}
              >
                {`${hospitals.length} medical centers available in `}
                <span style={{ textTransform: "capitalize" }}>
                  {city.toLocaleLowerCase()}
                </span>
              </Typography>
              <Stack direction="row" spacing={2}>
                <img src={icon} height={24} width={24} alt="icon" />
                <Typography color="#787887" lineHeight={1.4}>
                  Book appointments with minimum wait-time & verified doctor
                  details
                </Typography>
              </Stack>
            </Box>
          )}

          <Stack alignItems="flex-start" direction={{ md: "row" }}>
            <Stack
              mb={{ xs: 4, md: 0 }}
              spacing={3}
              width={{ xs: 1, md: "calc(100% - 384px)" }}
              mr="24px"
            >
              {hospitals.length > 0 &&
                hospitals.map((hospital) => (
                  <HospitalCard
                    key={hospital["Hospital Name"]}
                    details={hospital}
                    availableSlots={availableSlots}
                    handleBooking={handleBookingModal}
                  />
                ))}

              {isLoading && (
                <Typography variant="h3" bgcolor="#fff" p={3} borderRadius={2}>
                  Loading...
                </Typography>
              )}

              {!state && (
                <Typography variant="h3" bgcolor="#fff" p={3} borderRadius={2}>
                  Please select a state and city
                </Typography>
              )}
            </Stack>

            <img src={cta} width={360} height="auto" alt="banner" />
          </Stack>
        </Container>

        <BookingModal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          bookingDetails={bookingDetails}
          showSuccessMessage={setShowBookingSuccess}
        />

        <AutohideSnackbar
          open={showBookingSuccess}
          setOpen={setShowBookingSuccess}
          message="Booking Successful"
        />
      </Box>
    </>
  );
}