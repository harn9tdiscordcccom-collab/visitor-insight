import {authorized} from '../_auth.js';
export async function onRequestGet({request,env}) {
 if(!await authorized(request,env))return Response.json({error:'Please sign in'},{status:401});
 const {results}=await env.DB.prepare('SELECT * FROM visits ORDER BY id DESC LIMIT 500').all();
 return Response.json({visitors:results||[]});
}
export async function onRequestDelete({request,env}) {
 if(!await authorized(request,env))return Response.json({error:'Please sign in'},{status:401});
 await env.DB.prepare('DELETE FROM visits').run();
 return Response.json({ok:true});
}
