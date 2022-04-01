const login =document.getElementById("loginbutton")
login.addEventListener("click", (e)=> {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password= document.getElementById("email").value;

    const logincreds = {
        email: email,
        password: password
    };
    console.log(logincreds)
    axios
        .post("http://localhost:3000/login", logincreds)
        .then((token) =>{ 
            console.log(token.data.Accesstoken,"i am here supposed to print the ");

            localStorage.setItem("jwttoken",`${token.data.Accesstoken}`)
            window.location.replace('./chatapp.html')
         })
        .catch( (err)=> { console.log(err); });
});
const signuppage=document.getElementById("signupbutton");
signuppage.addEventListener("click",(e)=>{
    e.preventDefault()
    window.location.replace('./signupdest.html')
})
