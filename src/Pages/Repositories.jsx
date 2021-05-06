import React, { useState, useEffect } from "react";
import {
  makeStyles,
  List,
  ListItemText,
  ListItem,
  Typography,
  Button,
  Switch,
  FormControlLabel,
} from "@material-ui/core";

import AddRepository from "../Components/Repositories/AddRepository";
import DeleteRepository from "../Components/Repositories/DeleteRepository";
import UpdateRepository from "../Components/Repositories/UpdateRepository";

import Header from "../Components/Header";
import { Link, useHistory } from "react-router-dom";
import plusImage from "../Assets/Plus.svg";
import trashImage from "../Assets/Trash.svg";
import editImage from "../Assets/Edit.svg";
import loginImage from "../Assets/login.jpg";

import Loading from "../Components/Loading"

import api from "../Services/api";

const Repositories = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [showDescription, setShowDescription] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [rep, setRep] = useState([]);

  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      maxWidth: 800,
      backgroundColor: theme.palette.background.paper,
      margin: "auto",
      marginTop: "1em",
    },
    item: {
      border: "solid 1.2px",
      marginTop: "0.6em",
      backgroundColor: "#e5e4e2",
      borderColor: "#d3d3d3",
    },
    title: {
      width: "100%",
      marginBottom: "1em",
    },
    plus: {
      backgroundColor: "#3f51b5",
    },
    link: {
      textDecoration: "none",
      color: "black",
    },
    firstButtons: {
      display: "flex",
      justifyContent: "space-around",
    },
    repImage:{
      width:"200px",
      height:"100px"
    },
    
  }));

  function handleShowDescription() {
    setShowDescription(!showDescription);
  }
  function handleModalDelete(id, title, description) {
    setRep({ id: [id], title: [title], description: [description] });
    setModalDelete(true);
  }

  function handleModalUpdate(id, title, description) {
    setRep({ id: [id], title: [title], description: [description] });
    setModalUpdate(true);
  }

  function handleModalAddOpen() {
    setModalAdd(true);
  }

  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }
  const classes = useStyles();
  const history = useHistory();
  useEffect(() => {
    const token = localStorage.getItem("token");
    async function getData() {
      if (token) {
        try {
          api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
          const result = await api.get("/api/repositories");
         
          setData(result.data);
        } catch {
          history.push("/login");
        }
      }else{
        history.push("/login");
      }
    }

    getData();

    setLoading(false);
  }, []);

  if (loading) {

    <Loading/>
  }

  return (
    <>
      <Header />
      <div className={classes.root}>
        <Typography
          variant="h5"
          component="h2"
          className={classes.title}
          align="center"
        >
          Total Repositórios: {data.length}
        </Typography>

        <div className={classes.firstButtons}>
          <FormControlLabel
            label="Adicionar"
            onClick={() => handleModalAddOpen()}
            control={
              <Button primary>
                <img src={plusImage} className={classes.plus} />
              </Button>
            }
          />
          <FormControlLabel
            label={"Descrições"}
            control={
              <Switch
                onChange={handleShowDescription}
                name="checkedB"
                color="primary"
              />
            }
          />
        </div>
        <List className={classes.list}>
          {data.map((item) => (
            <Link className={classes.link} to={`/notes/${item.id}`}>
              <ListItemLink key={item.id} className={classes.item}>
               
                <Typography
                  variant="h4"
                  component="h2"
                  className={classes.title}
                >
                  {item.title}
                </Typography>
                <Button
                  primary
                  onClick={(event) => {
                    handleModalDelete(item.id, item.title, item.description);
                    event.preventDefault();
                  }}
                >
                  <img src={trashImage} className={classes.trash} />
                </Button>
                <Button
                  primary
                  onClick={(event) => {
                    handleModalUpdate(item.id, item.title, item.description);
                    event.preventDefault();
                  }}
                >
                  <img src={editImage} className={classes.edit} />
                </Button>
              </ListItemLink>
              {showDescription ? (
                <Typography variant="spam">
                  {("\n", item.description)}{" "}
                </Typography>
              ) : (
                ""
              )}
            </Link>
          ))}
        </List>
        <AddRepository option={modalAdd} setModalAdd={setModalAdd} />
        <DeleteRepository
          option={modalDelete}
          rep={rep}
          setModalDelete={setModalDelete}
        />
        <UpdateRepository
          option={modalUpdate}
          rep={rep}
          setModalUpdate={setModalUpdate}
        />
      </div>
    </>
  );
};

export default Repositories;
