const Cart = require("../models/cart.models")

const add = async (req, res) => {
  const { courseId, userId } = req.params;

  try {
    if (!userId) res.status(400).json({ message: "User not found" });

    // await Cart.find

    return res.status(200).json(userId);
  } catch (error) {
      console.error(error);
      res.status(401).json(error);
  }
};

const remove = async (req, res) => {

};

const confirmBuy = async (req, res) => {

};

module.exports = { add, remove, confirmBuy };





  await Cart_buy.findOrCreate({
    where: {
      bookId,
      userId,
      cartId: lastCart.id,
    },
  });