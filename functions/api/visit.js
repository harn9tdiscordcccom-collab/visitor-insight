export async function onRequestPost({request,env}) {
  try {
    const body=await request.json();
    const allowed=['browser','os','device','screen','timezone','page'];
    for(const k of allowed) if(typeof body[k]!=='string') return new Response('Invalid data',{status:400});
    const clean=s=>String(s).slice(0,180);
    const cf=request.cf||{};
    const ip=request.headers.get('CF-Connecting-IP')||'Unavailable';
    await env.DB.prepare(`INSERT INTO visits (ip,city,region,country,device,os,browser,screen,timezone,page,visited_at)
      VALUES (?,?,?,?,?,?,?,?,?,?,?)`).bind(ip,clean(cf.city||''),clean(cf.region||''),clean(cf.country||''),clean(body.device),clean(body.os),clean(body.browser),clean(body.screen),clean(body.timezone),clean(body.page),new Date().toISOString()).run();
    return Response.json({ok:true});
  } catch(e) { return Response.json({error:'Could not save visit'},{status:500}); }
}
