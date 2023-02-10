import React, { useState, useContext, useEffect } from "react";
import logo from '../../layout/img/logobranca.png';
import "../../layout/styles/login.css"

import {
  Container
} from '@material-ui/core';
// import Button from '@material-ui/core/Button';
// import ButtonGroup from '@material-ui/core/ButtonGroup';

import { AuthContext } from "../../context/Auth/AuthContext";

const Login = () => {

  const [user, setUser] = useState({ email: "", password: "" });
  const [mobile, setMobile] = useState(false)

  const { handleLogin } = useContext(AuthContext);

  useEffect(() => {
    window.screen.width <= 600 ? setMobile(true) : setMobile(false)

    if (mobile) {
      document.getElementById("root").style.height = "100%"
    }
  }, [mobile])

  const handleChangeInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlSubmit = (e) => {
    e.preventDefault();
    handleLogin(user);
  };

  return (
    <div className="login">
      {/* {
        mobile ? null :
          <div className="cardDownload" style={{ position: "absolute", right: 0, top: 0, marginRight: "4em", marginTop: "2em", display:"flex", flexDirection:"column", alignItems:"center" }}>
            <p style={{ color: "white", fontSize: "1.2em" }}>Baixe agora o aplicativo mobile</p>
            <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group" style={{marginTop:10}}>
              <Button><a href="">Android</a></Button>
              <Button><a href="">iOS</a></Button>
            </ButtonGroup>
          </div>
      } */}

      <Container component="main" maxWidth="xs">
        <div className="card">
          <div className="formEl">
          <label> Gerenciamento de atendimento </label>
            <form noValidate onSubmit={handlSubmit}>
              <h4>Bem vindo a central de atendimento</h4>
              <p>Efetue o login para ter acesso ao painel de atendimento</p>
              <div>
                <label>Email</label>
                <input id="email" name="email" required autoComplete="email" autoFocus value={user.email} onChange={handleChangeInput} type="email" placeholder="Email:" />
                <div style={{ marginTop: 14, display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                  <label>Senha</label>
                </div>

                <input id="password" name="password" required value={user.password} onChange={handleChangeInput} type={"password"} placeholder="Senha:" />
              </div>

              <button type="submit">Entrar</button>
              <footer>
                <label style={{ marginBottom: 10 }}>{"Design & APIs: Luan Cyrne"}</label>
                {/* <label>Direitos Reservados © 2022 {}</label> */}
              </footer>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
