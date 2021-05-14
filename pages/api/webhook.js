import axios from "axios";
import Cors from "cors";
import initMiddleware from "../../lib/init-middleware";

const cors = initMiddleware(
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ["GET", "POST", "OPTIONS"],
  })
);

export default async function handler(req, res) {
  await cors(req, res);

  if (req.method === "POST") {
    /* let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      console.log(body, "webhook response");
      res.end("ok");
    }); */
    console.log("Cuerpo del POST ", req.body);
    const payment = await axios.get(
      `https://api.mercadopago.com/v1/payments/${req.body.data.id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.mercadoPagoAccessToken}`,
        },
      }
    );
    console.log("Payment information: ", payment);
  }
  return res.status(200);
}
