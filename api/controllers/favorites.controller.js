const { User, Course, Favorite } = require("../models");

//agregar favoritos
const addFav = async (req, res) => {
  const { userId, courseId } = req.params;

  try {
    const userFound = await User.findById(userId).exec();
    const courseFound = await Course.findById(courseId).exec();

    !userFound && res.status(400).json({ message: "User not fonund" });
    !courseFound && res.status(400).json({ message: "Course not fonund" });

    let favorites = await Favorite.findOne({ userId: userId });

    if (!favorites) {
      favorites = new Favorite({ userId: userId, courseId: courseId });
    } else {
      if (favorites.courseId.includes(courseId)) {
        return res.status(400).json({ message: "Course already in favorites" });
      } else {
        favorites.courseId.push(courseId);
      }
    }

    await favorites.save();
    return res.status(200).json(favorites);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

//eliminar favoritos
const removeFav = async (req, res) => {
  const { userId, courseId } = req.params;

  try {
    const userFound = await User.findById(userId).exec();
    const courseFound = await Course.findById(courseId).exec();

    !userFound && res.status(400).json({ message: "User not fonund" });
    !courseFound && res.status(400).json({ message: "Course not fonund" });

    let favorites = await Favorite.findOne({ userId: userId }).exec();
    if (!favorites)
      return res
        .status(400)
        .json({ message: "Error trying to remove course from favorites" });

    const updatedFavorite = favorites.courseId.filter(
      (course_id) => !course_id.equals(courseFound._id)
    );
    favorites.courseId = updatedFavorite;

    await favorites.save();
    return res.status(200).json(favorites);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

//traer/mostrar favoritos
const showFav = async (req, res) => {
  const { userId } = req.params;

  try {
    const userFound = await User.findById(userId).exec();

    !userFound && res.status(400).json({ message: "User not fonund" });

    let favorites = await Favorite.findOne({ userId: userId });

    return res.status(200).json(favorites);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

module.exports = { addFav, removeFav, showFav };
