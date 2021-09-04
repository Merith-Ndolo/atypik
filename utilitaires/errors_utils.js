module.exports.signUpErrors = (err) => {
  let errors = { pseudo: "", email: "", password: "", tel: "" };

  if (err.message.includes("pseudo"))
    errors.pseudo = "Pseudo incorrect ou déjà pris";

  if (err.message.includes("email")) errors.email = "Email incorrect";

  if (err.message.includes("tel")) errors.tel = "Numero de téléphone incorrect";

  if (err.message.includes("password"))
    errors.password = "Le mot de passe doit faire au moins 8 caractères ";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
    errors.pseudo = "Ce pseudo est déjà pris";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
    errors.email = "Cet email est déjà enregistré";

  return errors;
};

module.exports.uploadErrors = (err) => {
  let errors = { format: "", maxSize: "" };

  if (err.message.includes("invalid file"))
    errors.format = "Format incompatabile";

  if (err.message.includes("max size"))
    errors.maxSize = "Le fichier dépasse 500ko";

  return errors;
};

module.exports.signInErrors = (err) => {
  let errors = { email: "", password: "", role: "", validation: "" };

  if (err.message.includes("email")) errors.email = "Email inconnu";

  if (err.message.includes("password"))
    errors.password = "Le mot de passe ne correspond pas";

  return errors;
};

module.exports.signInAdminErrors = (err) => {
  let errors = { role: "", password: "", email: "", validation: "" };

  errors.email = "Identifinants incorrects";

  return errors;
};

module.exports.roleErrors = (err) => {
  let errors = { role: "", password: "", email: "", validation: "" };

  errors.role = "Vous n'avez pas de compte client";
  errors.password = "";
  errors.email = "";
  errors.validation = "";

  return errors;
};

module.exports.roleproErrors = (err) => {
  let errors = { role: "", password: "", email: "", validation: "" };

  errors.role = "Vous n'avez pas de compte propriétaire";
  errors.password = "";
  errors.email = "";
  errors.validation = "";

  return errors;
};

module.exports.validationErrors = (err) => {
  let errors = { role: "", password: "", email: "", validation: "" };

  errors.validation = "Vous devez valider votre inscription";
  errors.role = "";
  errors.password = "";
  errors.email = "";

  return errors;
};

module.exports.resetErrors = (err) => {
  let errors = { password: "" };

  if (err.message.includes("password"))
    errors.password = "Le mot de passe doit faire au moins 8 caractères ";

  return errors;
};

module.exports.forgotErrors = (err) => {
  let errors = { email: "" };

  errors.email = "Email inconnu";

  return errors;
};
