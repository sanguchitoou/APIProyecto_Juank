const HTMLRecoveryEmail = (verificationCode) => {
  return `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <h2 style="color: #333;">Recuperación de Contraseña</h2>
        <p style="color: #555;">Hola,</p>
        <p style="color: #555;">Tu código de verificación para recuperar tu contraseña es:</p>
        <h1 style="color: #007BFF;">${verificationCode}</h1>
        <p style="color: #555;">Este código expirará en 15 minutos. Por favor, ingresa este código en la aplicación para completar tu recuperación de contraseña.</p>
        <p style="color: #555;">Si no solicitaste esta recuperación, por favor ignora este correo.</p>
    </div>
  `;
};

export default HTMLRecoveryEmail;