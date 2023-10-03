const Cart = require("../models/cart.models");
const User = require("../models/user.models");
//LLAMAR AL MODELO COURSE

const add = async (req, res) => {
  const { courseId, userId } = req.params;

  try {
    const userFound = User.findById(userId).exec();
    const courseFound = Course.findById(courseId).exec();

    if(!userFound || !courseFound) res.status(400).json({ message: "User or course not found" });

    const cart = await Cart.findOne({user: userId}).exec();

    if(!cart) {
      cart = new Cart({user: userId, course: [courseFound._id]});
    } else{
      if(cart.course.includes(courseFound._id)){
        return res.status(400).json({massage: "Course already in the cart"});
      } else{
        cart.course.push(courseFound._id);
      }
    }

    await cart.save();
    return res.status(200).json(cart);
    
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

  // await Cart_buy.findOrCreate({
  //   where: {
  //     bookId,
  //     userId,
  //     cartId: lastCart.id,
  //   },
  // });