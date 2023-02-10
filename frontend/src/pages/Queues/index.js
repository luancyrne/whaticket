import React, { useEffect, useReducer, useState } from "react";
import "../../layout/styles/button.css"
import openSocket from "socket.io-client";

import {
  IconButton,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";

import MainContainer from "../../components/MainContainer";
import MainHeader from "../../components/MainHeader";
import MainHeaderButtonsWrapper from "../../components/MainHeaderButtonsWrapper";
import TableRowSkeleton from "../../components/TableRowSkeleton";
import toastError from "../../errors/toastError";
import api from "../../services/api";
import { DeleteOutline, Edit } from "@material-ui/icons";
import QueueModal from "../../components/QueueModal";
import { toast } from "react-toastify";
import ConfirmationModal from "../../components/ConfirmationModal";
import host from "../../services/config";

const useStyles = makeStyles((theme) => ({
  mainPaper: {
    flex: 1,
    padding: theme.spacing(1),
    overflowY: "scroll",
    background:"#283046",
    ...theme.scrollbarStyles,
  },
  customTableCell: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const reducer = (state, action) => {
  if (action.type === "LOAD_QUEUES") {
    const queues = action.payload;
    const newQueues = [];

    queues.forEach((queue) => {
      const queueIndex = state.findIndex((q) => q.id === queue.id);
      if (queueIndex !== -1) {
        state[queueIndex] = queue;
      } else {
        newQueues.push(queue);
      }
    });

    return [...state, ...newQueues];
  }

  if (action.type === "UPDATE_QUEUES") {
    const queue = action.payload;
    const queueIndex = state.findIndex((u) => u.id === queue.id);

    if (queueIndex !== -1) {
      state[queueIndex] = queue;
      return [...state];
    } else {
      return [queue, ...state];
    }
  }

  if (action.type === "DELETE_QUEUE") {
    const queueId = action.payload;
    const queueIndex = state.findIndex((q) => q.id === queueId);
    if (queueIndex !== -1) {
      state.splice(queueIndex, 1);
    }
    return [...state];
  }

  if (action.type === "RESET") {
    return [];
  }
};

const Queues = () => {
  const classes = useStyles();

  const [queues, dispatch] = useReducer(reducer, []);
  const [loading, setLoading] = useState(false);

  const [queueModalOpen, setQueueModalOpen] = useState(false);
  const [selectedQueue, setSelectedQueue] = useState(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/queue");
        dispatch({ type: "LOAD_QUEUES", payload: data });

        setLoading(false);
      } catch (err) {
        toastError(err);
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const socket = openSocket(host.hostBack);

    socket.on("queue", (data) => {
      if (data.action === "update" || data.action === "create") {
        dispatch({ type: "UPDATE_QUEUES", payload: data.queue });
      }

      if (data.action === "delete") {
        dispatch({ type: "DELETE_QUEUE", payload: data.queueId });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleOpenQueueModal = () => {
    setQueueModalOpen(true);
    setSelectedQueue(null);
  };

  const handleCloseQueueModal = () => {
    setQueueModalOpen(false);
    setSelectedQueue(null);
  };

  const handleEditQueue = (queue) => {
    setSelectedQueue(queue);
    setQueueModalOpen(true);
  };

  const handleCloseConfirmationModal = () => {
    setConfirmModalOpen(false);
    setSelectedQueue(null);
  };

  const handleDeleteQueue = async (queueId) => {
    try {
      await api.delete(`/queue/${queueId}`);
      toast.success("Fila deletada com sucesso");
    } catch (err) {
      toastError(err);
    }
    setSelectedQueue(null);
  };

  return (
    <MainContainer>
      <ConfirmationModal
        title={
          selectedQueue &&
          `Excluir fila ${
            selectedQueue.name
          }?`
        }
        open={confirmModalOpen}
        onClose={handleCloseConfirmationModal}
        onConfirm={() => handleDeleteQueue(selectedQueue.id)}
      >
        Você tem certeza? Essa ação não pode ser revertida! Os tickets dessa fila continuarão existindo, mas não terão mais nenhuma fila atribuída.
      </ConfirmationModal>
      <QueueModal
        open={queueModalOpen}
        onClose={handleCloseQueueModal}
        queueId={selectedQueue?.id}
      />
      <MainHeader>
        <h1 style={{color:"#d0d2d6"}}>Filas</h1>
        <MainHeaderButtonsWrapper>
          <button
          onClick={handleOpenQueueModal}
          className="buttonRox"
          >
            Adicionar fila
          </button>
        </MainHeaderButtonsWrapper>
      </MainHeader>
      <Paper className={classes.mainPaper} variant="outlined">
        <Table size="small" >
          <TableHead style={{border: "1px solid #343d55", background: "#343d55", fontFamily:"Bold"}}>
            <TableRow>
              <TableCell align="center" style={{color:"#d0d2d6", borderBottom:"1px solid #3b4253"}}>
                Setor
              </TableCell>
              <TableCell align="center" style={{color:"#d0d2d6", borderBottom:"1px solid #3b4253"}}>
                Cor
              </TableCell>
              <TableCell align="center" style={{color:"#d0d2d6", borderBottom:"1px solid #3b4253"}}>
                Mensagem de Resposta
              </TableCell>
              <TableCell align="center" style={{color:"#d0d2d6", borderBottom:"1px solid #3b4253"}}>
                Ações
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <>
              {queues.map((queue) => (
                <TableRow key={queue.id}>
                  <TableCell style={{borderBottom:"1px solid #3b4253", color:"#676d7d", fontFamily:"Bold"}} align="center">{queue.name}</TableCell>
                  <TableCell style={{borderBottom:"1px solid #3b4253"}} align="center">
                    <div className={classes.customTableCell}>
                      <span
                        style={{
                          backgroundColor: queue.color,
                          width: 60,
                          height: 20,
                          alignSelf: "center",
                        }}
                      />
                    </div>
                  </TableCell>
                  <TableCell style={{borderBottom:"1px solid #3b4253", color:"#676d7d", fontFamily:"Regular"}} align="center">
                    <div className={classes.customTableCell}>
                      <Typography
                        style={{ width: 300, align: "center" }}
                        noWrap
                        variant="body2"
                      >
                        {queue.greetingMessage}
                      </Typography>
                    </div>
                  </TableCell>
                  <TableCell style={{borderBottom:"1px solid #3b4253"}} align="center" >
                    <IconButton
                      size="small"
                      style={{color:"#b4b7bd"}}
                      onClick={() => handleEditQueue(queue)}
                    >
                      <Edit />
                    </IconButton>

                    <IconButton
                      style={{color:"#b4b7bd"}}
                      size="small"
                      onClick={() => {
                        setSelectedQueue(queue);
                        setConfirmModalOpen(true);
                      }}
                    >
                      <DeleteOutline />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {loading && <TableRowSkeleton columns={4} />}
            </>
          </TableBody>
        </Table>
      </Paper>
    </MainContainer>
  );
};

export default Queues;
