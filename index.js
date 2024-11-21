const resultHolder = document.getElementById('result-holder');
const form = document.getElementById('predict_form');
const plantImage = document.getElementById('plantImage');

plantImage.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const preview = URL.createObjectURL(file);
    document.getElementById('heroImg').setAttribute('src', preview);
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (plantImage.files.length === 0) {
        alert('Please select an image.');
        return;
    }

    const formData = new FormData();
    formData.append('image', plantImage.files[0]);
    formData.append('user_id', JSON.parse(localStorage.getItem('user')).id);

    try {
        const response = await axios.post('http://91.108.120.107:5001/predict', formData);
        const data = response.data;
        resultHolder.innerHTML = `
            <style>
                #result-holder h3, #result-holder h5, #result-holder span {
                    display: block;
                    margin: 10px 0;
                    font-weight: bold;
                    font-size: 1.2em;
                }
                #result-holder h3 {
                    font-size: 1.5em;
                }
                #result-holder span {
                    font-size: 1em;
                }
                #result-holder span:first-child {
                    color: #008000;
                }
                #result-holder span:nth-child(2) {
                    color: #ffd700;
                }
                #result-holder span:nth-child(3) {
                    color: #ff0000;
                }
            </style>
            <h3>type: ${data.prediction}</h3>

            <h5>Percentages</h5>
            <span>Healthy Percent: ${data.percentages.healthy}</span>
            <span>Powdery Percent: ${data.percentages.powdery}</span>
            <span>Rust Percent: ${data.percentages.rust}</span>
            
        `
    } catch (error) {
        console.error(error);
        resultHolder.textContent = "Error in processing the request.";
    }
});

const logout = document.getElementById('logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.href = 'login.html';
});

