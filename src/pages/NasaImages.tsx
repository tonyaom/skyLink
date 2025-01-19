import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardMedia,
  Box,
  Typography,
  CircularProgress,
  Alert,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import NavBar from "../components/NavBar";

// Define the type for the image object
interface ApodImage {
  title: string;
  url: string;
  explanation: string;
}

const App: React.FC = () => {
  const [image, setImage] = useState<ApodImage | null>(null); // Store a single image
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0); // Keep track of the current image index
  const [currentDate, setCurrentDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  ); // Track the current image date
  const [startTouch, setStartTouch] = useState<number>(0); // Store touch start position

  const isMobile = useMediaQuery(useTheme().breakpoints.down("sm"));

  useEffect(() => {
    // Fetch the initial image when the component mounts
    fetchImage(currentDate);
  }, [currentDate]);

  const fetchImage = async (date: string) => {
    setLoading(true);
    setError(null); // Reset error state before fetching
    try {
      const response = await axios.get("https://api.nasa.gov/planetary/apod", {
        params: {
          api_key: "hywnwLJeCDzpl4Hp7eR9vo6xHprINyDDeiSeWYX8",
          date: date, // Use the current date to fetch the correct image
        },
      });
      setImage(response.data); // Set the fetched image
    } catch (error) {
      setError("Failed to fetch image. Please try again later.");
      console.error("Error fetching image:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setLoading(true); // Set loading true when changing images
    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() - 1); // Move to the next image by decreasing the date
    const nextDateStr = nextDate.toISOString().split("T")[0];
    setCurrentDate(nextDateStr); // Set the new date for the next image
    setCurrentIndex((prevIndex) => prevIndex + 1); // Increment the index to load the next image
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setLoading(true); // Set loading true when changing images
      const prevDate = new Date(currentDate);
      prevDate.setDate(prevDate.getDate() + 1); // Move to the previous image by increasing the date
      const prevDateStr = prevDate.toISOString().split("T")[0];
      setCurrentDate(prevDateStr); // Set the new date for the previous image
      setCurrentIndex((prevIndex) => prevIndex - 1); // Decrement the index to load the previous image
    }
  };

  // Handle touch start
  const handleTouchStart = (e: React.TouchEvent) => {
    const touchStart = e.touches[0].clientX;
    setStartTouch(touchStart);
  };

  // Handle touch move
  const handleTouchMove = (e: React.TouchEvent) => {
    const touchEnd = e.touches[0].clientX;
    if (startTouch - touchEnd > 50) {
      handleNext(); // Swipe left (next image)
    } else if (touchEnd - startTouch > 50) {
      handlePrev(); // Swipe right (previous image)
    }
  };

  // Handle touch end
  const handleTouchEnd = () => {
    setStartTouch(0); // Reset touch position
  };

  return (
    <>
      <NavBar />
      <Box p={2} position="relative">
        {isMobile ? (
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            textAlign="center"
            sx={{
              mt: "15px",
              fontSize: {
                xs: "1.25rem", // small devices (mobile)
                sm: "1.5rem", // medium devices
                md: "1.75rem", // large devices (default size)
              },
            }}
          >
            Astronomy Picture of the Day (APOD)
          </Typography>
        ) : (
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            textAlign="center"
          >
            Astronomy Picture of the Day (APOD)
          </Typography>
        )}

        {loading && (
          <Box display="flex" justifyContent="center" my={3}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Box my={3}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}

        {!loading && !error && image && (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <Card sx={{ maxWidth: 600, mb: 2 }}>
              <CardMedia
                component="img"
                image={image.url}
                alt={image.title}
                sx={{
                  objectFit: "cover",
                  height: "200px",
                }}
              />

              <CardContent>
                {isMobile ? (
                  <>
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{
                        fontSize: {
                          xs: "1.2rem", // small devices (mobile)
                          sm: "1.5rem", // medium devices
                          md: "1.75rem", // large devices (default size)
                        },
                      }}
                    >
                      {image.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ fontSize: "1rem" }}
                    >
                      {image.explanation}
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography variant="h5" gutterBottom>
                      {image.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ fontSize: "1.1rem" }}
                    >
                      {image.explanation}
                    </Typography>
                  </>
                )}
              </CardContent>
            </Card>

            <Box
              display="flex"
              justifyContent="space-between"
              sx={{ position: "absolute", top: "50%", width: "120%" }}
            >
              <IconButton
                onClick={handlePrev}
                disabled={currentIndex === 0}
                sx={{ color: "grey" }}
              >
                <ArrowBack sx={{ fontSize: "3rem" }} />
              </IconButton>
              <IconButton onClick={handleNext} sx={{ color: "grey" }}>
                <ArrowForward sx={{ fontSize: "3rem" }} />
              </IconButton>
            </Box>
          </Box>
        )}

        {!loading && !error && !image && (
          <Typography variant="body1" align="center" color="textSecondary">
            No images available at the moment.
          </Typography>
        )}
      </Box>
    </>
  );
};

export default App;
