import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/user.service";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";

const Login = () => {
    const [rut, setRut] = useState("");
    const [name, setName] = useState("");
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [rutError, setRutError] = useState("");
    const [nameError, setNameError] = useState("");

    const navigate = useNavigate();

    const handleRutChange = (e) => {
        const value = e.target.value;
        setRut(value);
        
        // Aquí puedes incluir validación para el formato RUT, similar a Register.jsx
        if (!value) {
            setRutError("El RUT es requerido.");
        } else {
            setRutError("");
        }
    };

    const handleNameChange = (e) => {
        const value = e.target.value;
        setName(value);

        if (!value) {
            setNameError("El nombre es requerido.");
        } else {
            setNameError("");
        }
    };

    const loginUser = (e) => {
        e.preventDefault();

        // Verifica si hay errores en los campos
        if (!rut || rutError || !name || nameError) {
            setFeedbackMessage("Error: Por favor ingrese un RUT y nombre válidos.");
            return;
        }

        const userCredentials = { rut, name };

        userService.login(userCredentials)
        .then((response) => {
            console.log("Response del servidor:", response);

          if (response.status === 200 && response.data) {
              setFeedbackMessage("Login exitoso");
              navigate('/client/logged');
          } else {
              setFeedbackMessage("Error: RUT o nombre incorrecto");
          }
        })
        .catch((error) => {
            setFeedbackMessage("Error: RUT o nombre incorrecto");
            console.log("Error de inicio de sesión:", error);
        });
};

    return (
        <Box>
            <h1>Iniciar Sesión</h1>

            {feedbackMessage && (
                <Typography color={feedbackMessage.startsWith("Error") ? "error" : "primary"}>
                    {feedbackMessage}
                </Typography>
            )}

            <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                    id="rut"
                    label="Rut"
                    type="text"
                    value={rut}
                    variant="outlined"
                    onChange={handleRutChange}
                    helperText={rutError || "Ej. 12.345.678-9"}
                    error={!!rutError}
                    required
                />
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                    id="name"
                    label="Nombre"
                    type="text"
                    value={name}
                    variant="outlined"
                    onChange={handleNameChange}
                    helperText={nameError || "Ej. Juan Perez"}
                    error={!!nameError}
                    required
                />
            </FormControl>

            <Button
                variant="contained"
                color="primary"
                onClick={loginUser}
            >
                Iniciar Sesión
            </Button>
        </Box>
    );
}

export default Login;
