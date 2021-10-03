import React from "react";
import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import NavBar from "../common/NavBar";

const TimerTemplate = ({children}) => {
  const StyledContainer = styled(Container)({
    backgroundColor: '#000F04',
    width: '100vw',
    height: '100vh',
    maxWidth: 'none'
  });
  return (
    <>
      <NavBar bgColor={"primary"}/>
      <StyledContainer>
        {children}
      </StyledContainer>
    </>
  );
};

export default TimerTemplate;