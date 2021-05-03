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
import { Link } from "react-router-dom";
import plusImage from "../Assets/Plus.svg";
import trashImage from "../Assets/Trash.svg";
import editImage from "../Assets/Edit.svg";
import api from "../Services/api";

const Repositories = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [showDescription, setShowDescription] = useState(false);

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
  }));

  function handleShowDescription() {
    setShowDescription(!showDescription);
  }

  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }
  const classes = useStyles();

  useEffect(() => {
    const token = localStorage.getItem("token");
    async function getData() {
      if (token) {
        api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
        //setAuthenticated(true);
        const result = await api.get("/api/repositories");
        console.log(result.data);
        setData(result.data);
      }
    }

    getData();

    setLoading(false);
  }, []);

  if (loading) {
    return <h1>Carregando</h1>;
  }

  return (
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
          <Link className={classes.link} to={`/note/${item.id}`}>
            <ListItemLink key={item.id} className={classes.item}>
              <Typography variant="h4" component="h2" className={classes.title}>
                {item.title}
              </Typography>
              <Button primary onClick={(event)=>{
                  event.preventDefault();
              }}>
                <img src={trashImage} className={classes.trash} />
              </Button>
              <Button primary onClick={(event)=>{
                  event.preventDefault();
              }}>
                <img src={editImage} className={classes.trash} />
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
    </div>
  );
};

export default Repositories;
