import React, { useState, useEffect } from "react";
import openSocket from "socket.io-client";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { toast } from "react-toastify";

import api from "../../services/api";
import { i18n } from "../../translate/i18n.js";
import toastError from "../../errors/toastError";
import host from "../../services/config";

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		alignItems: "center",
		padding: theme.spacing(4),
	},

	paper: {
		padding: theme.spacing(2),
		display: "flex",
		alignItems: "center",
		background: "#283046",
		justifyContent: "space-between"
	},

	settingOption: {
		marginLeft: "auto",
	},
	margin: {
		margin: theme.spacing(1),
	},
}));

const Settings = () => {
	const classes = useStyles();

	const [settings, setSettings] = useState([]);

	useEffect(() => {
		const fetchSession = async () => {
			try {
				const { data } = await api.get("/settings");
				setSettings(data);
			} catch (err) {
				toastError(err);
			}
		};
		fetchSession();
	}, []);

	useEffect(() => {
		const socket = openSocket(host.hostBack);

		socket.on("settings", data => {
			if (data.action === "update") {
				setSettings(prevState => {
					const aux = [...prevState];
					const settingIndex = aux.findIndex(s => s.key === data.setting.key);
					aux[settingIndex].value = data.setting.value;
					return aux;
				});
			}
		});

		return () => {
			socket.disconnect();
		};
	}, []);

	const handleChangeSetting = async e => {
		const selectedValue = e.target.value;
		const settingKey = e.target.name;

		try {
			await api.put(`/settings/${settingKey}`, {
				value: selectedValue,
			});
			toast.success(i18n.t("settings.success"));
		} catch (err) {
			toastError(err);
		}
	};

	const getSettingValue = key => {
		const { value } = settings.find(s => s.key === key);
		return value;
	};

	return (
		<div className={classes.root}>
			<Container className={classes.container} maxWidth="sm">
				<h1 style={{ marginBottom: 10, color: "#d0d2d6" }}>Configurações</h1>
				<Paper className={classes.paper} style={{marginTop: '15px'}}>
					<Typography variant="body1" style={{ color: "#d0d2d6" }}>
						Criação de usuário
					</Typography>
					<select
						id="userCreation-setting"
						name="userCreation"
						style={{
							height: "2em", width: "7em", border: "2px solid #3b4253", background: "transparent", padding: "3px",
							fontFamily: 'Regular', cursor: "pointer", outline: "none", appearance: "auto", borderRadius: "3px",
							color: "#d0d2d6"
						}}
						value={
							settings && settings.length > 0 && getSettingValue("userCreation")
						}
						onChange={handleChangeSetting}
					>
						<option style={{ backgroundColor: "#283046", borderRadius: "3px" }} value="enabled">
							Ativado
						</option>
						<option style={{ backgroundColor: "#283046", borderRadius: "3px" }} value="disabled">
							Desativado
						</option>
					</select>
				</Paper>


				<Typography variant="body2" gutterBottom></Typography>
					<Paper className={classes.paper} elevation={3} style={{marginTop: '15px'}}>
					<Typography variant="body1" style={{ color: "#d0d2d6" }}>
					Mensagem de boas-vindas após
					</Typography>
						<select
							margin="dense"
							variant="outlined"
							native
							style={{
								height: "2em", width: "7em", border: "2px solid #3b4253", background: "transparent", padding: "3px",
								fontFamily: 'Regular', cursor: "pointer", outline: "none", appearance: "auto", borderRadius: "3px",
								color: "#d0d2d6"
							}}
							id="timeCreateNewTicket-setting"
							name="timeCreateNewTicket"
							value={
								settings && settings.length > 0 && getSettingValue("timeCreateNewTicket")
							}
							className={classes.settingOption}
							onChange={handleChangeSetting}
						>
							<option style={{ backgroundColor: "#283046", borderRadius: "3px" }} value="10">
								10 segundos
							</option>
							<option style={{ backgroundColor: "#283046", borderRadius: "3px" }} value="30">
								30 segundos
							</option>
							<option style={{ backgroundColor: "#283046", borderRadius: "3px" }} value="60">
								1 minuto
							</option>
							<option style={{ backgroundColor: "#283046", borderRadius: "3px" }} value="300">
								5 minuto
							</option>
							<option style={{ backgroundColor: "#283046", borderRadius: "3px" }} value="1800">
								30 minuto
							</option>
							<option style={{ backgroundColor: "#283046", borderRadius: "3px" }} value="3600">
								1 hora
							</option>
							<option style={{ backgroundColor: "#283046", borderRadius: "3px" }} value="7200">
								2 horas
							</option>
							<option style={{ backgroundColor: "#283046", borderRadius: "3px" }} value="21600">
								6 horas
							</option>
							<option style={{ backgroundColor: "#283046", borderRadius: "3px" }} value="43200">
								12 horas
							</option>
							<option style={{ backgroundColor: "#283046", borderRadius: "3px" }} value="86400">
								24 horas
							</option>
							<option style={{ backgroundColor: "#283046", borderRadius: "3px" }} value="172800">
								48 horas
							</option>
						</select>
					</Paper>
				

				<Typography variant="body2" gutterBottom></Typography>
				<Paper className={classes.paper} style={{marginTop: '15px'}}>

					<Typography variant="body1" style={{ color: "#d0d2d6" }}>
					Aceitar chamadas
					</Typography>
					<select
						margin="dense"
						variant="outlined"
						native
						style={{
							height: "2em", width: "7em", border: "2px solid #3b4253", background: "transparent", padding: "3px",
							fontFamily: 'Regular', cursor: "pointer", outline: "none", appearance: "auto", borderRadius: "3px",
							color: "#d0d2d6"
						}}
						id="call-setting"
						name="call"
						value={
							settings && settings.length > 0 && getSettingValue("call")
						}
						className={classes.settingOption}
						onChange={handleChangeSetting}
					>
						<option style={{ backgroundColor: "#283046", borderRadius: "3px" }} value="enabled">
							Ativado
						</option>
						<option style={{ backgroundColor: "#283046", borderRadius: "3px" }} value="disabled">
							Desativado
						</option>
					</select>
				</Paper>

				<Paper className={classes.paper} style={{marginTop: '15px'}}>
					<Typography variant="body1" style={{ color: "#d0d2d6" }}>
					Ignorar Mensagens de Grupos
					</Typography>
					<select
						margin="dense"
						variant="outlined"
						native
						style={{
							height: "2em", width: "7em", border: "2px solid #3b4253", background: "transparent", padding: "3px",
							fontFamily: 'Regular', cursor: "pointer", outline: "none", appearance: "auto", borderRadius: "3px",
							color: "#d0d2d6"
						}}
						id="CheckMsgIsGroup-setting"
						name="CheckMsgIsGroup"
						value={
							settings && settings.length > 0 && getSettingValue("CheckMsgIsGroup")
						}
						className={classes.settingOption}
						onChange={handleChangeSetting}
					>
						<option style={{ backgroundColor: "#283046", borderRadius: "3px" }} value="enabled">
							Ativado
						</option>
						<option style={{ backgroundColor: "#283046", borderRadius: "3px" }} value="disabled">
							Desativado
						</option>
					</select>
				</Paper>

				<Paper className={classes.paper} style={{marginTop: '15px'}}>
					<Typography id="api-token-setting"
					style={{ color: "#d0d2d6" }}
						readonly
						margin="dense"
						variant="outlined"
						fullWidth>
							Token API - {settings && settings.length > 0 && getSettingValue("userApiToken")}
					</Typography>
				</Paper>

				<Paper className={classes.paper} style={{marginTop: '15px'}}>
					<Typography variant="body1" style={{ color: "#d0d2d6" }}>
					Tipo do Chatbot
					</Typography>
					<select
						margin="dense"
						variant="outlined"
						native
						id="chatBotType-setting"
						name="chatBotType"
						style={{
							height: "2em", width: "7em", border: "2px solid #3b4253", background: "transparent", padding: "3px",
							fontFamily: 'Regular', cursor: "pointer", outline: "none", appearance: "auto", borderRadius: "3px",
							color: "#d0d2d6"
						}}
						value={settings && settings.length > 0 && getSettingValue("chatBotType")}
						className={classes.settingOption}
						onChange={handleChangeSetting}
					>
						<option style={{ backgroundColor: "#283046", borderRadius: "3px" }} value="text">
							Texto
						</option>

						<option style={{ backgroundColor: "#283046", borderRadius: "3px" }} value="button">
							Botão
						</option>

						<option style={{ backgroundColor: "#283046", borderRadius: "3px" }} value="list">
							Lista
						</option>

					</select>
				</Paper>

			</Container>
		</div>
	);
};

export default Settings;
