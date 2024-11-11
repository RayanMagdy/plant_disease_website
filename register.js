const name = document.getElementById("name");
const username = document.getElementById("username");
const password = document.getElementById("password");

const submit = document.getElementById("submit");


submit.addEventListener("click", (e) => {
    e.preventDefault();
    const data = {
        name: name.value,
        username: username.value,
        password: password.value,
    };
    console.log(data);
    axios
        .post("http://localhost:5000/register", data)
        .then((res) => {
            console.log(res.data);
            if (res.data.message) {
                alert(res.data.message);
            }
        })
        .catch((err) => {
            console.log(err);
        });
})