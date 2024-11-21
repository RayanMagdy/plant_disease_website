const getComppleteImageUrl = (image) => {
    return `http://91.108.120.107:5001/images/${image}`
}

const getUserPredictions = async () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        
        const response = await axios.get(`http://91.108.120.107:5001/users/${user.id}/predictions`);
        const data = response.data;
        const predictionsContainer = document.getElementById('predictions');
        predictionsContainer.innerHTML = '';
        data.forEach(prediction => {
            const predItem = document.createElement('div');
            predItem.classList.add('preditem');

            const image = document.createElement('img');
            image.src = getComppleteImageUrl(prediction.image);

            const predData = document.createElement('div');
            predData.classList.add('pred-data');

            const label = document.createElement('span');
            label.classList.add('label');
            label.textContent = prediction.label;

            const percentages = document.createElement('div');
            percentages.classList.add('percentages');

            const healthyPercent = document.createElement('span');
            healthyPercent.classList.add('percentage');
            healthyPercent.textContent = `Healthy: ${prediction.healthy_percent}%`;

            const powderyPercent = document.createElement('span');
            powderyPercent.classList.add('percentage');
            powderyPercent.textContent = `Powdery: ${prediction.powdery_percent}%`;

            const rustPercent = document.createElement('span');
            rustPercent.classList.add('percentage');
            rustPercent.textContent = `Rust: ${prediction.rust_percent}%`;

            const createdAt = document.createElement('span');
            createdAt.classList.add('created-at');
            createdAt.textContent = `Created at: ${new Date(prediction.created_at).toLocaleString()}`;

            percentages.appendChild(healthyPercent);
            percentages.appendChild(powderyPercent);
            percentages.appendChild(rustPercent);

            predData.appendChild(label);
            predData.appendChild(percentages);
            predData.appendChild(createdAt);

            predItem.appendChild(image);
            predItem.appendChild(predData);

            predictionsContainer.appendChild(predItem);
        });
    } catch (error) {
        console.error(error);
    }
}

document.addEventListener('DOMContentLoaded', getUserPredictions);