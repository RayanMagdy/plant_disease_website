const username = document.getElementById("username");
const password = document.getElementById("password");

const submit = document.getElementById("submit");

const saveUser = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
};

submit.addEventListener("click", async (e) => {
    e.preventDefault();
    const data = {
        username: username.value,
        password: password.value,
    };
    try {
        const res = await axios.post("http://localhost:5000/login", data);
        console.log(res.data);
        if (res.data.message) {
            saveUser(res.data.user);
            window.location.href = "index.html";
        }
    } catch (err) {
        console.log(err);
    }
});

