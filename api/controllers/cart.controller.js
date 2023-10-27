const { Cart, User, Course } = require("../models");

// Agrear Curso al carrito de compra
const addCart = async (req, res) => {
  const { courseId, userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) res.status(404).send("User not found");

    const course = await Course.findById(courseId);
    if (!course) res.status(404).send("Course not found");

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, courseId: [course._id] });
    } else {
      if (!cart.courseId.includes(course._id)) {
        cart.courseId.push(course._id);
      } else {
        return res.status(409).send("Course already in the cart");
      }
    }

    await cart.save();
    res.status(200).send(cart);
  } catch (error) {
    res.sendStatus(500);
  }
};

// Eliminar producto de carrito de compra
const removeCart = async (req, res) => {
  const { courseId, userId } = req.params;

  try {
    const userFound = await User.findById(userId).exec();
    const courseFound = await Course.findById(courseId).exec();

    if (!userFound || !courseFound)
      res.status(400).json({ message: "User or course not found" });

    const cart = await Cart.findOne({ user: userId }).exec();

    if (!cart)
      res.status(404).json({ message: "error trying to remove course" });

    const updatedCourse = cart.course.filter(
      (course_id) => !course_id.equals(courseFound._id)
    );
    cart.course = updatedCourse;
    await cart.save();

    return res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(401).json(error);
  }
};

// Confirmacion de Compra
const confirmBuyCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const userFound = await User.findById(userId).exec();

    if (!userFound) res.status(400).json({ message: "User not found" });

    const cart = await Cart.findOne({ user: userId }).exec();

    if (!cart) res.status(404).json({ message: "Cart not found" });

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

module.exports = { addCart, removeCart, confirmBuyCart };
