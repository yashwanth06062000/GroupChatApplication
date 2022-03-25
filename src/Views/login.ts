import axios from "axios";

const login=document.getElementById("login")!;

login.addEventListener("click",(e)=>{
    const emailtag=document.getElementById("email") as HTMLInputElement;
    const email=emailtag.value;
    const passwordtag=document.getElementById("email") as HTMLInputElement;
    const password=passwordtag.value;
    let logincreds={
        email:email,
        password:password
    }
    axios
    .post("/login",logincreds)
    .then((token)=>{console.log(token)})
    .catch(err=>{console.log(err)})

})