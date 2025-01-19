import React from 'react';
import { Button } from '@mui/material';

interface NavBarButtonProps {
  label: string;
  linkTo: string;
  activeButton: string;
  handleButtonClick: (label: string, linkTo: string) => void;
}

const NavBarButton: React.FC<NavBarButtonProps> = ({ label, activeButton, linkTo, handleButtonClick }) => {
  return (
    <Button
      color="inherit"
      sx={{
        backgroundColor: activeButton === label ? '#00695c' : 'inherit', // Active color
        color: activeButton === label ? 'white' : 'inherit', // Text color for active
        border: activeButton === label ? 'none' : 'inherit', // Remove border when active
        outline: 'none', // Remove focus outline
        '&:hover': {
          backgroundColor: '#00695c', // Green on hover
          color: 'white',
        },
        '&:focus': {
          outline: 'none', // Remove focus outline on focus
        },
      }}
      onClick={() => handleButtonClick(label, linkTo)}
    >
      {label}
    </Button>
  );
};

export default NavBarButton;
