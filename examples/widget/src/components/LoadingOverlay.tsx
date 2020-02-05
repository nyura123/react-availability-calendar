import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
// import Backdrop from "@material-ui/core/Backdrop";
// import CircularProgress from "@material-ui/core/CircularProgress";
// import { makeStyles } from "@material-ui/core/styles";

// const useStyles = makeStyles(theme => ({
//   backdrop: {
//     zIndex: theme.zIndex.drawer + 1,
//     color: "#000",
//     backgroundColor: "rgba(200,200,200,.2)"
//   }
// }));

const overlayStyle = {
  position: 'absolute',
  left: 0,
  top: 0,
  height: '100%',
  width: '100%',
  backgroundColor: 'rgba(200,200,200,.2)',
  zIndex: 2,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export function SimpleLoadingOVerlay() {
  // const classes = useStyles();

  return (
    <div>
      {/* <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop> */}
      <div style={overlayStyle as any}>
        <Spinner animation="border" />
      </div>
    </div>
  );
}
