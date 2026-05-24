import { clickpesaConfig } from '../../firebase.js';
// Client-side helper. Calls a server proxy (Netlify function) that holds the ClickPesa secret.
// Endpoint contract (you implement in /netlify/functions/clickpesa.js):
//   POST { action:'create', amount, currency:'TZS', phone, reference } -> { paymentUrl, orderReference, status }
//   POST { action:'status', orderReference } -> { status, txRef }
export async function createPayment({ amount, phone, reference }){
  const r = await fetch(clickpesaConfig.apiEndpoint,{
    method:'POST',headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ action:'create', amount, currency:'TZS', phone, reference })
  });
  if(!r.ok) throw new Error('Payment initiation failed');
  return r.json();
}
export async function checkPayment(orderReference){
  const r = await fetch(clickpesaConfig.apiEndpoint,{
    method:'POST',headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ action:'status', orderReference })
  });
  return r.json();
}
