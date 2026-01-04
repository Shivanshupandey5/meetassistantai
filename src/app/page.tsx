"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client"; //import the auth client

import { Button } from "@/components/ui/button";
import { name } from "drizzle-orm";
import { Input } from "@/components/ui/input";
export default function Home() {

  const {data: session} = authClient.useSession();

  const[name,setName] = useState("");
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");

const onSubmit = () =>{
  authClient.signUp.email({
    email,
    name,
    password,
  },{
    onError: ()=>{
      window.alert("something went wrong");
    },
    onSuccess:()=>{
      window.alert("Success");
    }
  });
}

const onLogin = () =>{
  authClient.signIn.email({
    email,
    password,
  },{
    onError: ()=>{
      window.alert("something went wrong");
    },
    onSuccess:()=>{
      window.alert("Success");
    }
  });
}

if(session){
  return(
    <div className="flex flex-col p-4 gap-y-4">
      <p>Logged in as {session.user.name}</p>
      <button onClick={()=> authClient.signOut()}>
        Sign out
      </button>
    </div>
  );
}

return(
  <div className="flex flex-col gap-y-10">

    <div className="p-4 flex flex-col gap-y-4">
      <Input 
          placeholder="name" 
          value={name} 
          onChange={(e)=>setName(e.target.value)}
          />
      <Input 
          placeholder="email" 
          value={email} 
          onChange={(e)=>setEmail(e.target.value)}
          />
      <Input 
          placeholder="password" 
          type="password" 
          value={password} 
          onChange={(e)=>setPassword(e.target.value)}
          />

      <button className="p-4 flex flex-col gap-y-4 black" onClick={onSubmit}>
        Create User
      </button>
        </div>

    <div className="p-4 flex flex-col gap-y-4">
      <Input 
          placeholder="email" 
          value={email} 
          onChange={(e)=>setEmail(e.target.value)}
          />
      <Input 
          placeholder="password" 
          type="password" 
          value={password} 
          onChange={(e)=>setPassword(e.target.value)}
          />

      <button className="p-4 flex flex-col gap-y-4 black" onClick={onLogin}>
        Login User
      </button>
    </div>
  </div>
  );
}
