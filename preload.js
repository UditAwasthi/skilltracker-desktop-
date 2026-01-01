const { contextBridge } = require("electron");

async function api(path, method="GET", body=null){
  const token = localStorage.getItem("token");
  const res = await fetch(`http://localhost:8000${path}`, {
    method,
    headers: {
      "Content-Type":"application/json",
      ...(token && {"Authorization":`Bearer ${token}`})
    },
    body: body ? JSON.stringify(body) : null
  });
  const data = await res.json().catch(()=>({}));
  return {status:res.status,data};
}

contextBridge.exposeInMainWorld("backend",{
  login:(p)=>api("/auth/login","POST",p),
  dashboard:()=>api("/user/dashboard"),
  skills:{
    get:()=>api("/skills"),
    add:(p)=>api("/skills","POST",p),
  },
  streak:()=>api("/user/streak"),
  logout:()=>localStorage.removeItem("token")
});
