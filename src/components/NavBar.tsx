import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Box,
  useTheme,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import NavBarButton from "./NavBarButton";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMobile = useMediaQuery(useTheme().breakpoints.down("sm"));
  const navigate = useNavigate();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [activeButton, setActiveButton] = useState<string>("Home"); // Track active button

  const handleButtonClick = (buttonName: string, linkTo:string) => {
    setActiveButton(buttonName);
    console.log(linkTo)
    navigate(linkTo.startsWith("/") ? linkTo : `/${linkTo}`);
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <>
      <AppBar position="fixed" sx={{ width: "100%", top: 0, mb: "10px" }}>
        <Toolbar sx={{ padding: "0 16px" }}>
          {/* SKYLINK Title */}
          <Typography variant="h6" sx={{ flexGrow: 0 }}>
            SKYLINK
          </Typography>

          {/* Spacer for Flexbox Layout */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Mobile Menu */}
          {isMobile ? (
            <>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                aria-controls="mobile-menu"
                aria-haspopup="true"
                onClick={handleMenuOpen}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="mobile-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>Nasa Image</MenuItem>
                <MenuItem onClick={handleMenuClose}>Quiz</MenuItem>
                <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ display: "flex", gap: 2 }}>              
              <NavBarButton
                label="NASA Images"
                activeButton={activeButton}
                linkTo="nasa-images"
                handleButtonClick={handleButtonClick}
              />
              <NavBarButton
                label="Take Quiz"
                activeButton={activeButton}
                linkTo="quiz-instruction"
                handleButtonClick={handleButtonClick}
              />

              <Tooltip title="Logout" arrow>
                <IconButton
                  sx={{
                    color: "white",
                    "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
                    border: "none",
                  }}
                  onClick={handleLogout}
                >
                  <ExitToAppIcon />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar
        sx={{
          minHeight: "0px", // Remove default height
          padding: "0px", // Remove default padding
          marginBottom: "10px", // Add custom margin
        }}
      />
    </>
  );
};

export default Navbar;
