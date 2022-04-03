document.getElementById("signup").addEventListener("click", (e) => {
    e.preventDefault();
  const nametag = document.getElementById("name");
  const name = nametag.value;
  const emailtag = document.getElementById("email") ;
  const email = emailtag.value;
  const phonetag = document.getElementById("phone") ;
  const phone = phonetag.value;
  const passwordtag = document.getElementById("password") ;
  const password = passwordtag.value;
  let userdetails = {
    name: name,
    email: email,
    phone: phone,
    password: password,
  };
console.log("check me")
  axios
  .post("http://localhost:3000/signupUser", {params:{id:0}})
  .then((result) => {
    alert(result);
    window.location.replace('./login.html')
  });
});