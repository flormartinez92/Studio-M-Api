const mercadopago = require("mercadopago");
const { Order, Cart } = require("../models");
const { MercadoPagoConfig, Preference } = require("mercadopago");
const { findOne } = require("../models/user.models");
const client = new MercadoPagoConfig({
  accessToken: process.env.ACCESS_TOKEN_MP,
});

exports.createOrder = async (req, res) => {
  const { quantity, id, title, price } = req.body;
  console.log({ quantity, id, title, price });
  try {
    const preference = new Preference(client);

    const response = await preference.create({
      body: {
        items: [
          {
            id,
            title: title,
            currency_id: "ARS",
            category_id: "art",
            quantity: quantity,
            unit_price: price,
          },
        ],
        back_urls: {
          /* http://localhost:3000/trolley/purchase-completed */
          success: "http://localhost:3000/trolley/purchase-completed",
          failure: "http://localhost:3000/",
          pending: "http://localhost:3000/loading",
        },
        auto_return: "approved",

        /* payment_methods: {
          excluded_payment_methods: [],
          excluded_payment_types: [],
          installments: 1,
        },
        notification_url: "https://www.your-site.com/ipn", */
      },
    });

    res.send(response);
  } catch (error) {
    console.error("Error al crear preferencia:", error);
    res.status(500).send("Error al crear preferencia");
  }
};
exports.feedbackMp = async (req, res) => {
  //asdasd
  res.send(req.query);
};

exports.updateStatus = async (req, res) => {
  try {
    const { mpPreferenceID, mpStatus } = req.body;
    const updateOrder = await Order.findOneAndUpdate(
      {
        $where: { mpPreferenceID },
      },
      { mpStatus },
      { new: true }
    );
    res.send(updateOrder);
  } catch (error) {
    res.sendStatus(500);
  }
};
/* exports.createOrder = async (req, res) => {
  const { cartCourses, orderId } = req.body;
  console.log("HOLAAA");

  try {
    //Busca el modelo de la orden actual en la DB
    const orderResponse = await Order.findById(orderId);
    !orderResponse && res.sendStatus(500);

    // Obtén todos los items del carrito asociados a la orden
    const cartItems = await Cart.findOne({ userId: orderResponse.userId });
    //console.log("========CART", cartItems);

    // Obtén descuento del carrito asociados a la orden (de haberlo aplicado)
    const totalDiscount = cartItems.discount;

    console.log(
      "DESCEUNTO-------------------------------------",
      totalDiscount
    );
    console.log(
      "PRECIO-------------------------------------",
      cartItems.totalDiscount
    );
    console.log(
      "PRECIO2-------------------------------------",
      cartItems.totalAmount
    );

    //Genera configuracion de Mercado Pago
    const client = new MercadoPagoConfig({
      accessToken: process.env.ACCESS_TOKEN_MP,
    });

    try {
      //Se crea un arreglo para guardar las ordenes creadas en base a la cantidad de cursos en el carrito
      const courses = [];
      cartCourses.forEach((element) => {
        //Manejando decuentos
        const price = parseFloat(element.coursePrice);
        const discount = (price * totalDiscount) / 100;
        const finalDiscount = price - discount;
        const order = {
          id: element._id,
          title: element.courseLongTitle,
          quantity: 1,
          unit_price: totalDiscount ? finalDiscount : price,
        };
        courses.push(order);
      });

      //Preferencias y creacion para Mercado Pago
      //console.log(courses);
      const preference = new Preference(client);
      const result = await preference.create({
        body: {
          items: courses,
          back_urls: {
            success: "http://localhost:3000/trolley/purchase-completed",
            failure: "http://localhost:3000/",
            pending: "http://localhost:3000/loading",
          },
          auto_return: "approved",
        },
      });

      orderResponse.mpPreferenceID = result.id;

      // await orderResponse.updateOne( result.id);
      await orderResponse.save();
      res
        .send({
          ...orderResponse._doc,
          linkPayment: result.sandbox_init_point,
        })
        .status(200);
    } catch (error) {
      console.error("Error creating preference:", error);
      res.status(500).send("Internal Server Error");
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

exports.updateOrder = async (req, res) => {
  const { userId } = req.body;

  try {
    const order = await Order.findOne({ userId });
    !order && res.status(404).send("No Se Encontro Orden");

    res.status(200).send(order);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
 */
