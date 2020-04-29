// Create a new date instance dynamically with JS
const d = new Date();
const newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Personal API Key for OpenWeatherMap API
const apiKey = "66c2354315610ef35e7c8e5f5fe28b4d";
let webApi = "http://api.openweathermap.org/data/2.5/weather";

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', generateEntry);

/* Function called by event listener */
function generateEntry(e) {
    const zipCode = document.getElementById("zip").value;
    const url = `${webApi}?zip=${zipCode}&appid=${apiKey}`;
    const feelings = document.getElementById('feelings').value;

    // Calling functions
    getData(url)
        .then(function zipValid(temp) {
            const entry = {
                temperature: temp,
                feelings,
                date: newDate,
            }
            postData('/addEntry', entry);
        }
        
        // Alert user if promise is rejected due to invalid Zipcode
        , () => alert("Please enter a valid zip code!"))
        .then(function () {
            updateUI('/all')
        })
}

/* Function to GET Web API Data*/
const getData = async (url = '') => {
    const response = await fetch(url);
    try {
        const allData = await response.json();
        const temp = allData.main.temp;
        return temp;
    } catch (error) {
        console.log("error: ", error);
        throw error;
    }
}

/* Function to POST data */
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error: ", error)
    }
}

/* Function to GET Project Data */
const updateUI = async (url = '') => {
    const response = await fetch(url);
    try {
        const serverData = await response.json();

        // Updating UI 
        const entry = serverData.pop();
        const holder = document.createElement('div');
        const date = document.createElement('div');
        const temp = document.createElement('div');
        const content = document.createElement('div');
        date.innerHTML = `<strong>Date:</strong> ${entry.date}`;
        temp.innerHTML = `<strong>Temperature:</strong> ${entry.temperature}`;
        content.innerHTML = `<strong>Feelings:</strong> ${entry.feelings}`;
        holder.classList.add('entryHolder');
        holder.appendChild(date);
        holder.appendChild(temp);
        holder.appendChild(content);
        document.querySelector('.entry').appendChild(holder);
    } catch (error) {
        console.log("error", error);
    }
}