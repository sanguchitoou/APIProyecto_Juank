//Importamos EL PRIMER PAQUETE que nos ayudará a evitar ataques DDOS
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, //Máximo de solicitudes HTTP cada 5 minutos
  max: 300, //Máximo de solicitudes HTTP
  message: {
    status: 429,
    error: "Too many request",
  },
});

export default limiter;
