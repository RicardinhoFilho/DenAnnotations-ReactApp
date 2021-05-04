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

const SingUp = () => {
  const styles = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [checkPassword, setCheckPassword] = useState();
  const [checkPasswordError, setCheckPasswordError] = useState(false);

  const handleLogUp = async () => {
    try {
      const result = await api.post("/api/user/logup", { email, password });

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
          handleLogUp();
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
          label="Confirmar Senha"
          value={checkPassword}
          required
          onChange={(event) => {
            setCheckPassword(event.target.value);
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
        <br />
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

export default SingUp;
