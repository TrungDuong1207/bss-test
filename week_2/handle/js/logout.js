let btnLogout = document.getElementById("logout");

btnLogout.addEventListener("click", () => {
    localStorage.removeItem("user");
})