export async function onRequestGet({ request, env }) {
  const id=new URL(request.url).searchParams.get("session_id");
  if(!env.STRIPE_SECRET_KEY||!id||!id.startsWith("cs_"))return reply({paid:false},400);
  const r=await fetch("https://api.stripe.com/v1/checkout/sessions/"+encodeURIComponent(id),{headers:{Authorization:"Bearer "+env.STRIPE_SECRET_KEY}});
  const d=await r.json();
  const paid=!!(r.ok&&d.payment_status==="paid"&&d.mode==="payment");
  return reply({paid},paid?200:402);
}
function reply(x,status){return new Response(JSON.stringify(x),{status,headers:{"Content-Type":"application/json","Cache-Control":"no-store"}})}
