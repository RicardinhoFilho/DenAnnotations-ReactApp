import React, { useState } from "react";
import {
  Card,
  Typography,
  TextField,
  Button,
  makeStyles,
} from "@material-ui/core";
import api from "../Services/api";
import Header from "../Components/Header";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "40%",
    margin: "auto",
    marginTop: "2rem",
  },
  input: {
    width: "100%",
    margin: "auto",
    marginTop: "0.8em",
    marginBottom: "0.8em",
  },
  button: {
    marginTop: "1em",
  },
  negativeFeedback: {
    color: "#ff6961",
  },
}));

const UpdateAccount = () => {
  const styles = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [checkNewPassword, setCheckNewPassword] = useState();
  const [error, setError] = useState(false);
  const [checkPassword, setCheckPassword] = useState();
  const [checkPasswordError, setCheckPasswordError] = useState(false);

  const handleUpdateUser= async () => {
    try {
      const result = await api.patch("/api/user/update", { email, password, newPassword });

      console.log(result);
      window.location.href = "http://localhost:3000/login";
    } catch {
      setError(true);
    }
  };

  const classes = useStyles();

  return (
    <>
      <Header />
      <form
        className={styles.root}
        onSubmit={(event) => {
          handleUpdateUser();
          event.preventDefault();
          //
        }}
      >
        <TextField
          className={styles.input}
          margin="normal"
          label="Usuário"
          value={email}
          required
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <br />
        <TextField
          className={styles.input}
          type="password"
          margin="normal"
          label="Senha"
          value={password}
          required
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        
        <br />
        <TextField
          className={styles.input}
          type="password"
          margin="normal"
          label="Nova Senha"
          value={newPassword}
          required
          onChange={(event) => {
            setNewPassword(event.target.value);
          }}
          onBlur={() => {
            if (checkPassword !== password) {
              setCheckPasswordError(true);
            } else {
              setCheckPasswordError(false);
            }
          }}
          error={checkPasswordError}
        />
        <br/>
        <TextField
          className={styles.input}
          type="password"
          margin="normal"
          label="Confirmar Nova Senha"
          value={checkNewPassword}
          required
          onChange={(event) => {
            setCheckNewPassword(event.target.value);
          }}
          onBlur={()=>{
              if(checkNewPassword !== newPassword){
                  setCheckPasswordError(true)
              }else{
                setCheckPasswordError(false)
              }
          }}
          error={checkPasswordError}
        />
        <br/>
        {error ? (
          <Typography className={styles.negativeFeedback}>
            Dados Inválidos!
          </Typography>
        ) : (
          ""
        )}
        {checkPasswordError ? (
          <Typography className={styles.negativeFeedback}>
            Senhas não coincidem!
          </Typography>
        ) : (
          ""
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={styles.button}
        >
          Cadastrar
        </Button>
      </form>
    </>
  );
};

export default UpdateAccount;
