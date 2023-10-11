const Cart = require("../models/cart.models");
const User = require("../models/user.models");
const Course = require("../models/course.models");

// Agrear Curso al carrito de compra
const add = async (req, res) => {
  const { courseId, userId } = req.params;

  try {
    const userFound = await User.findById(userId).exec();
    console.log("USER NOT FOUND", userFound);
    const courseFound = await Course.findById(courseId).exec();
    console.log();

    if(!userFound || !courseFound) res.status(400).json({ message: "User or course not found" });
    
    let cart = await Cart.findOne({user: userId}).exec();

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

// Eliminar producto de carrito de compra
const remove = async (req, res) => {
  const { courseId, userId } = req.params;
  
  try {
    const userFound = await User.findById(userId).exec();
    const courseFound = await Course.findById(courseId).exec();

    if(!userFound || !courseFound) res.status(400).json({ message: "User or course not found" });

    const cart = await Cart.findOne({user: userId}).exec();

    if(!cart) res.status(404).json({ message: "error trying to remove course"});
    
    const updatedCourse = cart.course.filter((course_id) => !course_id.equals(courseFound._id));
    cart.course = updatedCourse;
    await cart.save();

    return res.status(200).json(cart);

  } catch (error) {
    console.error(error);
    res.status(401).json(error);
  }
};

// Confirmacion de Compra
const confirmBuy = async (req, res) => {
  const { userId } = req.params;

  try {
    const userFound = await User.findById(userId).exec();

    if(!userFound) res.status(400).json({ message: "User not found" });

    const cart = await Cart.findOne({user: userId}).exec();

    if(!cart) res.status(404).json({ message: "Cart not found"});

    const coursesBought = cart.course;
    userFound.course.push(...coursesBought);
    await userFound.save();

    cart.course = [];
    cart.price = 0;
    await cart.save();

    return res.status(200).json({ message: "Purchase Confirmed" });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { add, remove, confirmBuy };