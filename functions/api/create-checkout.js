export async function onRequestPost({ request, env }) {
  if (!env.STRIPE_SECRET_KEY) return reply({error:"Checkout is not configured."},503);
  const origin=new URL(request.url).origin;
  const form=new URLSearchParams();
  form.set("mode","payment");
  form.set("line_items[0][price]","price_1UKKQJQJk2YBhbdmemMY6kjq");
  form.set("line_items[0][quantity]","1");
  form.set("success_url",origin+"/success.html?session_id={CHECKOUT_SESSION_ID}");
  form.set("cancel_url",origin+"/?checkout=cancelled");
  form.set("allow_promotion_codes","true");
  const r=await fetch("https://api.stripe.com/v1/checkout/sessions",{method:"POST",headers:{Authorization:"Bearer "+env.STRIPE_SECRET_KEY,"Content-Type":"application/x-www-form-urlencoded"},body:form.toString()});
  const d=await r.json();
  if(!r.ok||!d.url)return reply({error:"Unable to start checkout."},502);
  return reply({url:d.url},200);
}
function reply(x,status){return new Response(JSON.stringify(x),{status,headers:{"Content-Type":"application/json","Cache-Control":"no-store"}})}
