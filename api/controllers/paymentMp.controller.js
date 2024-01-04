const mercadopago = require("mercadopago");
const { Order, Cart } = require("../models");
const { MercadoPagoConfig, Preference } = require("mercadopago");

exports.createOrder = async (req, res) => {
  //orderId title price
  const { cartCourses, orderId } = req.body;
  try {


    const orderResponse = await Order.findById(orderId);
    // console.log(orderResponse);
    if (!orderResponse) {
      // no se encontro la orden
      return res.sendStatus(500);
    }

    // Obtén todos los items del carrito asociados a la orden
    const cartItems = await Cart.findOne({ userId: orderResponse.userId });

    // Calcula el total amount sumando los precios de los items del carrito
    const totalAmount = cartItems.totalAmount;
    // Obtén descuento del carrito asociados a la orden
    const totalDiscount = cartItems.discount;

    // Si hay un descuento, réstalo del totalAmount
    // const totalDiscount = cartItems.totalDiscount || 0;
    // const discountedTotalAmount = totalAmount + totalDiscount;

    const client = new MercadoPagoConfig({
      accessToken: process.env.ACCESS_TOKEN_MP,
    });

    try {

      const courses = [];
      cartCourses.forEach(element => {
        //manejando decuentos
        const price = parseFloat(element.coursePrice);
        const discount = (price * totalDiscount) / 100;
        const finalDiscount = price - discount; 
        const order = {
          id: element._id,
          title: element.courseLongTitle,
          quantity: 1,
          unit_price: totalDiscount ? finalDiscount : price
        };
        courses.push(order);
      });




      const preference = new Preference(client);
      // const priceNumber = parseFloat(price);
      //decuento
      // const discount = (priceNumber * totalDiscount) / 100;
      // const finalDiscount =  priceNumber - discount
      // unit_price: totalDiscount ? finalDiscount : priceNumber,

      // console.log("--------------------------------", finalDiscount);
      const result = await preference.create({
        body: {
          items: courses,
          back_urls: {
            success: "http://localhost:3000/success",
            failure: "http://localhost:3000/failure",
            pending: "http://localhost:3000/pending",
          },
          auto_return: "approved",
        },
      });
      console.log(result);
      orderResponse.mpPreferenceID = result.id;
      await orderResponse.save();
      res.send(orderResponse).status(200);
    } catch (error) {
      console.error("Error creating preference:", error);
      res.status(500).send("Internal Server Error");
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
