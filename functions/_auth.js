const enc=new TextEncoder();
function unb64(s){s=s.replace(/-/g,'+').replace(/_/g,'/');return Uint8Array.from(atob(s),c=>c.charCodeAt(0))}
async function sign(data,secret){const key=await crypto.subtle.importKey('raw',enc.encode(secret),{name:'HMAC',hash:'SHA-256'},false,['sign']);const sig=await crypto.subtle.sign('HMAC',key,enc.encode(data));return btoa(String.fromCharCode(...new Uint8Array(sig))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')}
export async function authorized(request,env){
 if(!env.AUTH_SECRET)return false;
 const cookie=request.headers.get('Cookie')||'';const m=cookie.match(/(?:^|;\s*)vt_session=([^;]+)/);if(!m)return false;
 const parts=m[1].split('.');if(parts.length!==2)return false;
 if(await sign(parts[0],env.AUTH_SECRET)!==parts[1])return false;
 try{return JSON.parse(new TextDecoder().decode(unb64(parts[0]))).exp>Date.now()}catch{return false}
}
