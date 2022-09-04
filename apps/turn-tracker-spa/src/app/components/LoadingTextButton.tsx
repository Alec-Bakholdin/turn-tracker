import React from 'react';
import { Button, CircularProgress, SxProps, Typography } from '@mui/material';

export default function LoadingTextButton(props: {
  text: string;
  loading: boolean;
  onClick?: () => void;
  onFinishLoading?: () => void;
  size?: number; // default: 25
  sx?: SxProps;
}): React.ReactElement {
  const fontSize = props.size ?? 15;

  return (
    <Button onClick={props.onClick} variant={'outlined'} sx={props.sx}>
      {props.loading ? (
        <CircularProgress size={fontSize} />
      ) : (
        <Typography fontSize={props.size}>{props.text}</Typography>
      )}
    </Button>
  );
}
