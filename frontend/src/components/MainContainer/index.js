import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    flex: 1,
    // padding: theme.spacing(2),
    // height: `calc(100% - 48px)`,
    padding: 0,
    height: "60em",
    width:"81em"
  },

  contentWrapper: {
    height: "100%",
    overflowY: "unset",
    display: "flex",
    flexDirection: "column",
  },
}));

const MainContainer = ({ children }) => {
  const classes = useStyles();

  return (
    <Container className={classes.mainContainer} style={window.screen.width <= 600 ? {width:"100%"} : null} maxWidth={false}>
      <div className={classes.contentWrapper}>{children}</div>
    </Container>
  );
};

export default MainContainer;
