import axios from "axios";
import Cors from "cors";
import initMiddleware from "../../lib/init-middleware";

const cors = initMiddleware(
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ["GET", "POST", "OPTIONS"],
  })
);

export default function handler(req, res) {
  await cors(req, res);

  if (req.method === "POST") {
    console.log("Body: ", req.body);
    if (req.body.action === "payment.created") {
      async () => {
        const payment = await axios.get(
          `https://api.mercadopago.com/v1/payments/${req.body.data.id}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.mercadoPagoAccessToken}`,
            },
          }
        );
        console.log("Payment information: ", payment);
      };
    }
  }
  return res.status(200);
}
