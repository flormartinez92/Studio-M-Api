const Favorite = require("../models/favorite.models");
const User = require("../models/user.models");
const Course = require("../models/course.models");

//agregar favoritos
const addFav = async (req, res) =>{
  const { userId, courseId} = req.params;

  try {
    const userFound = await User.findById(userId).exec();
    const courseFound = await Course.findById(courseId).exec();

    if(!userFound || !courseFound ) res.status(400).json( {message: "User or Course not fonund"} );
    
    let favorites = await Favorite.findOne({userId: userId});

    if(!favorites){
      favorites = new Favorite({userId: userId, courseId: courseId});
    }else{
      if(favorites.courseId.includes(courseId)){
        return res.status(400).json( {message: "Course already in favorites"} );
      }else{
        favorites.courseId.push(courseId);
      }
    }

    await favorites.save();
    return res.status(200).json(favorites);
  } catch (error) {
    console.error(error)
  }
}

//eliminar favoritos
const removeFav = async (req, res) =>{
  const { userId, courseId } = req.params;

  try {
    const userFound = await User.findById(userId).exec();
    const courseFound = await Course.findById(courseId).exec();
    if(!userFound || !courseFound) return res.status(400).json({message: "User or Course not found"});

    let favorites = await Favorite.findOne({userId: userId}).exec();
    if(!favorites) return res.status(400).json({message: "Error trying to remove course from favorites"});

    const updatedFavorite = favorites.courseId.filter((course_id) => !course_id.equals(courseFound._id));
    favorites.courseId = updatedFavorite;
    
    await favorites.save();
    return res.status(200).json(favorites);
  } catch (error) {
    console.error(error)
    res.status(500).json({error: error})
  }
}

//traer/mostrar favoritos
const showFav = async (req, res) =>{
  const { userId } =  req.params;

  try {
    const userFound = await User.findById(userId).exec();
    
    !userFound && res.status(400).json( {message: "User not fonund"} );
    
    let favorites = await Favorite.findOne({userId: userId});
    
    return res.status(200).json(favorites);
  } catch (error) {
    console.error(error)
  }
}

module.exports = {addFav, removeFav, showFav}