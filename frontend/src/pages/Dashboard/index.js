import React, { useContext, useEffect, useState } from "react"

import Paper from "@material-ui/core/Paper"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"
import "../../layout/styles/analytics.css";

import useDashboard from "../../hooks/useDashboard"

import { AuthContext } from "../../context/Auth/AuthContext";

import Chart from "./Chart"
// import { set } from "date-fns"

const useStyles = makeStyles(theme => ({
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
	fixedHeightPaper: {
		padding: theme.spacing(2),
		display: "flex",
		overflow: "auto",
		flexDirection: "column",
		height: 240,
	},
	customFixedHeightPaper: {
		padding: theme.spacing(2),
		display: "flex",
		overflow: "auto",
		flexDirection: "column",
		height: 120,
	},
	customFixedHeightPaperLg: {
		padding: theme.spacing(2),
		display: "flex",
		overflow: "auto",
		flexDirection: "column",
		height: "100%",
	},
}))

const Dashboard = () => {
	const classes = useStyles()
	const [mobile, setMobile] = useState(false)

	const { user } = useContext(AuthContext);
	var userQueueIds = [];

	if (user.queues && user.queues.length > 0) {
		userQueueIds = user.queues.map(q => q.id);
	}

	const GetTickets = (status, showAll, withUnreadMessages) => {

		const { tickets } = useDashboard({
			status: status,
			showAll: showAll,
			withUnreadMessages: withUnreadMessages,
			queueIds: JSON.stringify(userQueueIds)
		});
		return tickets.length;
	}

	useEffect(()=>{
		window.screen.width <= 600 ? setMobile(true) : setMobile(false)
	},[])

	return (
		<div>
			<Container maxWidth="lg" className={classes.container}>
				<div className="cards">
					<div className="cardBefore" style={mobile ? { width:"100%"} : null}>
						<div id="circle1">
							<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" ><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
						</div>
						<div>
							<h1>Em atendimento</h1>
							<p>{GetTickets("open", "true", "false")}</p>
						</div>

					</div>
					<div className="cardBefore" style={mobile ? { width:"100%"} : null}>
						<div id="circle2">
							<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" ><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>
						</div>
						<div>
							<h1>Aguardando</h1>
							<p>{GetTickets("pending", "true", "false")}</p>
						</div>
					</div>
					<div className="cardBefore" style={mobile ? { width:"100%"} : null}>
						<div id="circle3">
							<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" ><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
						</div>
						<div>
							<h1>Finalizados</h1>
							<p>{GetTickets("closed", "true", "false")}</p>
						</div>
					</div>
				</div>

				
					<Grid item xs={12}>
						<Paper style={{backgroundColor:"#283046"}} className={classes.fixedHeightPaper}>
							<Chart />
						</Paper>
					</Grid>
			
			</Container>
		</div>
	)
}

export default Dashboard
