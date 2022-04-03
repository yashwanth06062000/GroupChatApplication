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
  const lsdata = JSON.parse(localStorage.getItem("messages"));
  console.log(lsdata)

  let lastid;
  if (lsdata==null) {
    lastid = 0;
  } else {
    lastid = lsdata[lsdata.length - 1].msgid;
  }
  let mergemsgs = [];
  axios
    .get(`http://localhost:3000/getmessages?id=${lastid}`)
    .then((messages) => {
      if (messages.data.length > 1) {
        if (lsdata) {
          mergemsgs = lsdata.concat(messages.data);
          console.log(mergemsgs,"in lin 41")
        } else {
          mergemsgs = messages.data;
        }
        if (mergemsgs.lenght > 1000) {
          let remove = mergemsgs.length - 1000;
          for (let i = 0; i < remove; i++) {
            mergemsgs.shift();
          }
        }
      } 
      else {
        mergemsgs = JSON.parse(localStorage.getItem("messages"));
      }
      localStorage.setItem("messages",JSON.stringify(mergemsgs));

      const msgcontainer = document.getElementById("msgs");
      msgcontainer.innerHTML = "";

      for (let i = 0; i < mergemsgs.length; i++) {
        const msgdiv = document.createElement("div");
        msgdiv.classList.add("msgdiv");
        const name = document.createElement("div");
        name.innerHTML = `<p>${mergemsgs[i].Username}:</p>`;
        msgdiv.appendChild(name);
        const msg = document.createElement("div");
        msg.innerHTML = `<p>${mergemsgs[i].message}</p>`;
        msgdiv.appendChild(msg);
        msgcontainer.appendChild(msgdiv);
      }
    });
});

function displaymsgs() {
  const lsdata = JSON.parse(localStorage.getItem("messages"))
 
 
  let lastid;
  if (lsdata==null) {

    lastid = 0;
  } else {
    lastid = lsdata[lsdata.length - 1].msgid;

  }
  let mergemsgs = [];
  axios
    .get(`http://localhost:3000/getmessages?id=${lastid}`)
    .then((messages) => {
      if (messages.data.length > 1) {
        if (lsdata) {
      
          mergemsgs = lsdata.concat(messages.data);
          console.log(mergemsgs,"in lin 94")
        }
         else {
          mergemsgs = messages.data;
        }
        if (mergemsgs.lenght > 1000) {
          let remove = mergemsgs.length - 1000;
          for (let i = 0; i < remove; i++) {
            mergemsgs.shift();
          }
        }
      } 
      else {
        mergemsgs =JSON.parse(localStorage.getItem("messages"))
      }
      localStorage.setItem("messages", JSON.stringify(mergemsgs));
      const msgcontainer = document.getElementById("msgs");
      msgcontainer.innerHTML = "";

      for (let i = 0; i < mergemsgs.length; i++) {
        const msgdiv = document.createElement("div");
        msgdiv.classList.add("msgdiv");
        const name = document.createElement("div");
        name.innerHTML = `<p>${mergemsgs[i].Username}:</p>`;
        msgdiv.appendChild(name);
        const msg = document.createElement("div");
        msg.innerHTML = `<p>${mergemsgs[i].message}</p>`;
        msgdiv.appendChild(msg);
        msgcontainer.appendChild(msgdiv);
      }
    });
}
setInterval(displaymsgs, 5000)
