const { Coupon } = require("../models");

//crear un cupon
exports.createCoupon = async (req, res) => {
  const { couponCode, discountCoupon } = req.body;

  try {
    const coupon = await Coupon.findOne({
      couponCode: couponCode.toUpperCase(),
    });
    if (coupon) return res.status(400).send("Coupon is already created");

    const newCoupon = await Coupon.create({
      couponCode: couponCode.toUpperCase(),
      discountCoupon,
    });
    if (!newCoupon) return res.status(400).send("error when creating a coupon");

    res.status(201).send(newCoupon);
  } catch (error) {
    res.sendStatus(500);
  }
};

//actualizar un cupon
exports.updateCoupon = async (req, res) => {
  const { couponId } = req.params;
  const { couponCode, discountCoupon } = req.body;
  try {
    const couponToUpdate = await Coupon.findByIdAndUpdate(
      couponId,
      { couponCode: couponCode.toUpperCase(), discountCoupon },
      {
        new: true,
      }
    );
    if (!couponToUpdate) {
      return res.status(404).send("coupon not found");
    }
    await couponToUpdate.save();
    res.status(200).send("coupon updated successfully");
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.updateStatusCoupon = async (req, res) => {
  const { couponId } = req.params;
  const playload = req.body;
  try {
    const couponToUpdate = await Coupon.findByIdAndUpdate(couponId, playload, {
      new: true,
    });
    if (!couponToUpdate) {
      return res.status(404).send("coupon not found");
    }
    await couponToUpdate.save();
    res.status(200).send("coupon updated successfully");
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.allCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();
    if (!coupons) return res.status(404).send("Coupons not found");
    res.status(200).send(coupons);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

// ruta para un solo cupon
exports.oneCoupon = async (req, res) => {
  try {
    const { couponId } = req.params;

    const coupon = await Coupon.findById(couponId);
    if (!coupon) return res.status(404).send("Coupon not found");

    res.status(200).send(coupon);
  } catch (error) {
    console.error(error);
  }
};
