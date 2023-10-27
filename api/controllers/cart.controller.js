const { Cart, User, Course } = require("../models");

// Agrear Curso al carrito de compra
const addCart = async (req, res) => {
  const { courseId, userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found");

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).send("Course not found");

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

// Eliminar de a un curso del carrito de compra
const removeCourse = async (req, res) => {
  const { courseId, userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found");

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).send("Course not found");

    let cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).send("Cart not found");

    const updatedCart = cart.courseId.filter(
      (course_id) => !course_id.equals(course._id)
    );
    cart.courseId = updatedCart;
    await cart.save();

    res.status(200).send(cart);
  } catch (error) {
    res.sendStatus(500);
  }
};

// Eliminar todo el carrito
const removeCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found");

    let cart = await Cart.findOneAndRemove({ userId });
    if (!cart) return res.status(404).send("Cart not found");

    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
};

// Ver los cursos que tengo en el carrito
const cartCourses = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).send("Cart not found");

    const courses = await Course.find({ _id: { $in: cart.courseId } });
    if (!courses) return res.status(404).send("Courses not found");

    res.status(200).send(courses);
  } catch (error) {
    res.sendStatus(500);
  }
};

// Confirmacion de Compra
const confirmBuyCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("user not found");

    const cart = await Cart.findOne({ userId });
    if (!cart) res.status(404).send("Cart not found");

    const coursesToBuy = cart.courseId;
    user.course.push(...coursesToBuy);
    await user.save();

    cart.deleteOne();

    return res.status(200).send("Purchase Confirmed");
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = {
  addCart,
  removeCourse,
  removeCart,
  cartCourses,
  confirmBuyCart,
};
