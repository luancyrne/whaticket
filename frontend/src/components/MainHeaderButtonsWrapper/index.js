import React from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	MainHeaderButtonsWrapper: {
		flex: "none",
		display:"flex",
		marginLeft: "auto",
		"& > *": {
			margin: theme.spacing(1),
		},
	},
}));

const MainHeaderButtonsWrapper = ({ children }) => {
	const classes = useStyles();

	return <div className={classes.MainHeaderButtonsWrapper}>{children}</div>;
};

export default MainHeaderButtonsWrapper;
