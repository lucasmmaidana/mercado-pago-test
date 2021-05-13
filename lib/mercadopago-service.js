import { configure, preferences } from "mercadopago";

export function configureMercadoPagoSDK() {
  configure({
    access_token: process.env.mercadoPagoAccessToken,
  });
}

const createPreferenceLink = async (data) => preferences.create(data);

export const createPaymentLink = async (data) => {
  try {
    const response = await createPreferenceLink(data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
