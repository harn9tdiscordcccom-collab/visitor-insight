const enc=new TextEncoder();
function b64(bytes){return btoa(String.fromCharCode(...new Uint8Array(bytes))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')}
async function sign(data,secret){const key=await crypto.subtle.importKey('raw',enc.encode(secret),{name:'HMAC',hash:'SHA-256'},false,['sign']);return b64(await crypto.subtle.sign('HMAC',key,enc.encode(data)))}
export async function onRequestPost({request,env}) {
 try{
  const {password}=await request.json();
  if(!env.ADMIN_PASSWORD||!env.AUTH_SECRET||password!==env.ADMIN_PASSWORD)return Response.json({error:'Incorrect password'},{status:401});
  const payload=b64(enc.encode(JSON.stringify({exp:Date.now()+8*60*60*1000})));
  const token=payload+'.'+await sign(payload,env.AUTH_SECRET);
  return new Response(JSON.stringify({ok:true}),{headers:{'Content-Type':'application/json','Set-Cookie':`vt_session=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=28800`}});
 }catch{return Response.json({error:'Login failed'},{status:400})}
}