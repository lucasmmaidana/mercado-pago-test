import Cors from "cors";
import initMiddleware from "../../lib/init-middleware";

import {
  configureMercadoPagoSDK,
  createPaymentLink,
} from "../../lib/mercadopago-service";

const cors = initMiddleware(
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ["GET", "POST", "OPTIONS"],
  })
);

export default async function handler(req, res) {
  await cors(req, res);

  if (req.method === "POST") {
    // Process a POST request

    await configureMercadoPagoSDK();

    const result = await createPaymentLink(req.body);
    console.log("LINK CREADO");

    res.json({ ok: true, link: result.body.init_point || "error" });
  } else {
    res.json({ ok: true, message: "hola" });
  }
}
