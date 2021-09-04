const UserModel = require("../models/user_model");
const ObjectID = require("mongoose").Types.ObjectId;
const stripe = require("stripe")(
  "sk_test_51IQafJDRHvU06AUoyvDxQUsVuvq58MJCDXzx5VZw4OqtkHCpAuXaOR9TJzwdCf56bEeuLqTGsUd5CX7MQvLJfo9w00QPnJOnbT"
);
//const { uuid } = require('uuid');
const { v4: uuidv4 } = require("uuid");

// Liste de tous les utlisateurs
module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

//Détails de l'utlisateur
module.exports.userInfo = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown : " + err);
  }).select("-password");
};

// Mise à jour de l'utlisateur
module.exports.updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          role: req.body.role,
          pseudo: req.body.pseudo,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

//Suppression d'un utlisateur
module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted. " });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.paymentReservation = (req, res) => {
  const { post, token } = req.body;
  console.log("post", post);
  console.log("prix", post.prix);
  const idempontencyKey = uuidv4();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        post._id,
        {
          amount: post.prix * 100,
          currency: "eur",
          customer: customer.id,
          receipt_email: token.email,
          description: `Valeur du post.titre`,
          shipping: {
            name: token.card.name,
            address: {
              country: token.card.adress_country,
            },
          },
        },
        { idempontencyKey }
      );
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
};
