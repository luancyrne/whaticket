import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { WhatsAppsContext } from "../context/WhatsApp/WhatsAppsContext";
import { AuthContext } from "../context/Auth/AuthContext";

const MainListItems = (props) => {
  const { whatsApps } = useContext(WhatsAppsContext);
  const { user } = useContext(AuthContext);
  const [connectionWarning, setConnectionWarning] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (whatsApps.length > 0) {
        const offlineWhats = whatsApps.filter((whats) => {
          return (
            whats.status === "qrcode" ||
            whats.status === "PAIRING" ||
            whats.status === "DISCONNECTED" ||
            whats.status === "TIMEOUT" ||
            whats.status === "OPENING"
          );
        });
        if (offlineWhats.length > 0) {
          setConnectionWarning(true);
        } else {
          setConnectionWarning(false);
        }
      }
    }, 2000);
    return () => clearTimeout(delayDebounceFn);
  }, [whatsApps]);

  function switchItems(e) {
    localStorage.removeItem("item")
    localStorage.setItem("item", e.currentTarget.id)
  }

  return (
    <ul className="listmenu">
      <li className="headeritem">
        <span>Menu</span>
      </li>
      <li id="0" onClick={switchItems} className={localStorage.getItem("item") === "0" ? "item active" : "item"}>
        <Link to="/">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          <span className="itemtxt">Dashboard</span>
        </Link>
      </li>
      <li id="2" onClick={switchItems} className={localStorage.getItem("item") === "2" ? "item active" : "item"}>
        <Link to="/tickets">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" ><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          <span className="itemtxt">Chat</span>
        </Link>
      </li>
      <li id="3" onClick={switchItems} className={localStorage.getItem("item") === "3" ? "item active" : "item"}>
        <Link to="/contacts">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>
          <span className="itemtxt">Contatos</span>
        </Link>
      </li>
      <li id="4" onClick={switchItems} className={localStorage.getItem("item") === "4" ? "item active" : "item"}>
        <Link to="/quickAnswers">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" ><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          <span className="itemtxt">Respostas rápidas</span>
        </Link>
      </li>
      {
        user.profile === "admin" ? (<>
          <li className="headeritem">
            <span>Ferramentas</span>
          </li>
          <li id="5" onClick={switchItems} className={localStorage.getItem("item") === "5" ? "item active" : "item"}>
            <Link to="/users">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" ><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              <span className="itemtxt">Usuários</span>
            </Link>
          </li>
          <li id="1" onClick={switchItems} className={localStorage.getItem("item") === "1" ? "item active" : "item"}>
            <Link to="/connections">
              {
                connectionWarning ? <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{
                  color: "#ea5455"
                }}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" ><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" style={{
                  color: "#28c76f"
                }}></path><polyline points="22 4 12 14.01 9 11.01" style={{
                  color: "#28c76f"
                }}></polyline></svg>
              }
              <span className="itemtxt">Conexões</span>
            </Link>
          </li>
          <li id="6" onClick={switchItems} className={localStorage.getItem("item") === "6" ? "item active" : "item"}>
            <Link to="/queues">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" ><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              <span className="itemtxt">Filas e Bot</span>
            </Link>
          </li>
          <li id="7" onClick={switchItems} className={localStorage.getItem("item") === "7" ? "item active" : "item"}>
            <Link to="/tags" >
              <svg className="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"></path></svg>
              <span className="itemtxt">Tags</span>
            </Link>
          </li>
          <li id="8" onClick={switchItems} className={localStorage.getItem("item") === "8" ? "item active" : "item"}>
            <Link to="/settings" >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="me-75"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
              <span className="itemtxt">Configuração</span>
            </Link>
          </li>
        </>) : null
      }
    </ul>
  );
};

export default MainListItems;
