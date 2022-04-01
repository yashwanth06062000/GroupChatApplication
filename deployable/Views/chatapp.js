const sendmsg = document.getElementById("sdmsg");
sendmsg.addEventListener("click", (e) => {
  e.preventDefault();
  const message = document.getElementById("msginput").value;
  const token = localStorage.getItem("jwttoken");
  let msgdetails = {
    token: token,
    message: message,
  };
  console.log("i am in 9 chatapp.js", msgdetails);

  axios
    .post("http://localhost:3000/sendmsg", msgdetails, {
      headers: { Authorization: token },
    })
    .then(() => {
      document.getElementById("msginput").value = "";
      // nothing
    });
});
window.addEventListener("DOMContentLoaded", () => {
  axios.get("http://localhost:3000/getmessages").then((messages) => {
    console.log(messages.data);
    const msgcontainer = document.getElementById("msgs");
    for (let i = 0; i < messages.data.length; i++) {
      const msgdiv = document.createElement("div");
      msgdiv.classList.add("msgdiv")
      const name = document.createElement("div");
      name.innerHTML = `<p>${messages.data[i].Username}:</p>`;
      msgdiv.appendChild(name);
      const msg = document.createElement("div");
      msg.innerHTML = `<p>${messages.data[i].message}</p>`;
      msgdiv.appendChild(msg);
      msgcontainer.appendChild(msgdiv);
    }
  });
});
