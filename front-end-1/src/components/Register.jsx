import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import userService from "../services/user.service";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import SendIcon from "@mui/icons-material/Send";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import SaveIcon from "@mui/icons-material/Save";

//process to verify RUT
const rutRegex = /^\d{1,2}\.\d{3}\.\d{3}-[0-9kK]$/;
const isValidRut = (rut) => {
    let cleanRut = rut.replace(/\./g, '').replace('-', '');
    let body = cleanRut.slice(0, -1);
    let verifier = cleanRut.slice(-1).toLowerCase();
  
    let sum = 0;
    let multiplier = 2;
  
    for (let i = body.length - 1; i >= 0; i--) {
      sum += body[i] * multiplier;
      multiplier = multiplier < 7 ? multiplier + 1 : 2;
    }
  
    let expectedVerifier = 11 - (sum % 11);
    expectedVerifier = expectedVerifier === 10 ? 'k' : expectedVerifier === 11 ? '0' : expectedVerifier.toString();
  
    return verifier === expectedVerifier;
  };

const Register = () => {

    const [rut, setRut] = useState("");
    const [name, setName] = useState("");
    const [salary, setSalary] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [feedbackMessage, setFeedbackMessage] = useState("");

    const [rutError, setRutError] = useState("");
    const [nameError, setNameError] = useState("");
    const [salaryError, setSalaryError] = useState("");
    const [birthdateError, setBirthdateError] = useState("");

    const navigate = useNavigate();
    

    const handleRutChange = (e) => {
        const value = e.target.value;
        setRut(value);
      
        if (!rutRegex.test(value)) {
          setRutError("El RUT debe tener el formato 12.345.678-9");
        } else if (!isValidRut(value)) {
          setRutError("El RUT ingresado no es válido.");
        } else {
          setRutError("");
        }
      };

    const saveUser = (e) => {
        let hasError = false;

        //validate rut
        if (!rut) {
            setRutError("Rut es requerido.");
            hasError = true;
        } else {
            setRutError("");
        }

        //validate name
        if (!name) {
            setNameError("Nombre es requerido.");
            hasError = true;
        } else {
            setNameError("");
        }

        //validate salary
        if (!salary) {
            setSalaryError("Salario es requerido.");
            hasError = true;
        } else {
            setSalaryError("");
        }

        //validate birthdate
        if (!birthdate) {
            setBirthdateError("Fecha de nacimiento es requerida.");
            hasError = true;
        } else {
            setBirthdateError("");
        }

        if (hasError) return;

        const formattedBirthdate = birthdate.split('-').reverse().join('-');
        const newUser = {
            rut,
            name,
            salary,
            birthdate: formattedBirthdate
        };

        userService.register(newUser).then((response) => { 
            console.log("Usuario ha sido añadido.", response.data);
            setFeedbackMessage("Usuario ha sido registrado exitosamente, volviendo.");
            setTimeout(() => {
                navigate('/client');
            }, 2000);
        }).catch((error) => {
            setFeedbackMessage("Error: Ha ocurrido un problema al intentar registrar el usuario");
            console.log("Ha ocurrido un error al intentar crear nuevo usuario.", error); 
        });
    };


    return (
        <div>
        <h1>Registro</h1>

        {feedbackMessage && (
            <Typography color={feedbackMessage.startsWith("Error") ? "error" : "primary"}>
            {feedbackMessage}
            </Typography>
        )}

        <FormControl fullWidth sx={{mb: 2}}>
            <TextField
            id = "rut"
            label = "Rut"
            type = "text"
            value = {rut}
            variant="outlined"
            onChange={handleRutChange}
            helperText = {rutError ||"Ej. 12.345.678-9"}
            error = {!!rutError}
            required
            />
        </FormControl>

        <FormControl fullWidth sx={{mb: 2}}>
            <TextField
            id = "name"
            label = "Nombre"
            type = "text"
            value = {name}
            variant="outlined"
            onChange = {(e) => setName(e.target.value)}
            helperText = {nameError || "Ej. Juan Perez"}
            error = {!!nameError}
            required
            />
        </FormControl>

        <FormControl fullWidth sx={{mb: 2}}>
            <TextField
            id = "salary"
            label = "Salario"
            type = "number"
            value = {salary}
            variant="outlined"
            onChange = {(e) => setSalary(e.target.value)}
            helperText = "Ej. 500000"
            error = {salaryError || "Ej. 500000"}
            required
            />
        </FormControl>

        <FormControl fullWidth sx={{mb: 2}}>
            <TextField
            id = "birthdate"
            label = "Fecha de nacimiento"
            type = "date"
            value = {birthdate}
            variant="outlined"
            onChange = {(e) => setBirthdate(e.target.value)}
            helperText={birthdateError || ""}
            error = {!!birthdateError}
            required
            />
        </FormControl>

        <p>
        <button
            variant="contained"
            color="primary"
            onClick={saveUser}
            fullWidth
            sx={{ mt: 2 }}
            disabled={!rut ||!!rutError || !name || !salary || !birthdate}
        >
            Registrar
            </button>
        </p>
        </div>
    );
}

export default Register;