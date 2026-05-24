// Netlify serverless function that proxies ClickPesa requests.
// IMPORTANT: set environment variables in Netlify dashboard:
//   CLICKPESA_API_KEY, CLICKPESA_SECRET_KEY, CLICKPESA_MERCHANT_ID
// API reference: https://docs.clickpesa.com/
exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method not allowed" };
  let payload;
  try { payload = JSON.parse(event.body || "{}"); }
  catch { return { statusCode: 400, body: "Invalid JSON" }; }

  const API = "https://api.clickpesa.com";
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.CLICKPESA_API_KEY || ""}`
  };

  try {
    if (payload.action === "create") {
      const r = await fetch(`${API}/third-parties/payments/preview-ussd-push-request`, {
        method: "POST", headers,
        body: JSON.stringify({
          amount: String(payload.amount),
          currency: payload.currency || "TZS",
          orderReference: payload.reference,
          phoneNumber: payload.phone,
          checksum: ""
        })
      });
      const data = await r.json();
      return { statusCode: 200, body: JSON.stringify({
        paymentUrl: data.paymentUrl || "",
        orderReference: payload.reference,
        status: data.status || "pending",
        raw: data
      }) };
    }
    if (payload.action === "status") {
      const r = await fetch(`${API}/third-parties/payments/${payload.orderReference}`, { headers });
      const data = await r.json();
      return { statusCode: 200, body: JSON.stringify({ status: data.status || "unknown", raw: data }) };
    }
    return { statusCode: 400, body: "Unknown action" };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
