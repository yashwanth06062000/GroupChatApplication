import axios from "axios";
const signup = document.getElementById("signup")!;
signup.addEventListener("click", (e) => {
  const nametag = document.getElementById("name") as HTMLInputElement;
  const name = nametag.value;
  const emailtag = document.getElementById("email") as HTMLInputElement;
  const email = emailtag.value;
  const phonetag = document.getElementById("phone") as HTMLInputElement;
  const phone = phonetag.value;
  const passwordtag = document.getElementById("password") as HTMLInputElement;
  const password = passwordtag.value;
  let userdetails = {
    name: name,
    email: email,
    phone: phone,
    password: password,
  };
  axios.post("/signupUser", userdetails).then((result) => {
    alert(result);
  });
});
