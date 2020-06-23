import React from 'react';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const MyButton = styled(Button)({
  background: 'grey',
  // background: 'linear-gradient(to right, #000046, #1cb5e0)',
  border: 0,
  borderRadius: 3,
  // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
});

const StyledComponents = (props) => {
  return <MyButton>{props.name}</MyButton>;
}

export default StyledComponents;