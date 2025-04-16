const button = document.querySelector('button');
const input = document.querySelector('input');
const clear = document.querySelector('.clear-btn');
const resultContainer = document.createElement('div');
resultContainer.classList.add('result-container');
document.body.appendChild(resultContainer);

button.addEventListener('click', () => {
    const val = input.value.trim();

    if (val) {
        getInfo(val);
    } else {
        displayError("Please enter a LeetCode username.");
    }
});

clear.addEventListener('click', () => {
    input.value = "";
    resultContainer.innerHTML = "";
});

async function getInfo(user) {
    const url = `https://alfa-leetcode-api.onrender.com/${user}/solved`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("User not found or API error.");
        }

        const data = await response.json();
        displayData(data, user);
    } catch (error) {
        displayError(error.message);
    }
}

function displayData(data, username) {
    resultContainer.innerHTML = ""; // Clear old data

    const header = document.createElement('h2');
    header.textContent = `LeetCode Stats for "${username}"`;
    resultContainer.appendChild(header);

    const easyDiv = document.createElement('p');
    easyDiv.textContent = `🟢 Easy: ${data.easySolved}`;

    const mediumDiv = document.createElement('p');
    mediumDiv.textContent = `🟠 Medium: ${data.mediumSolved}`;

    const hardDiv = document.createElement('p');
    hardDiv.textContent = `🔴 Hard: ${data.hardSolved}`;

    const totalDiv = document.createElement('p');
    totalDiv.textContent = `✅ Total Solved: ${data.solvedProblem}`;

    resultContainer.appendChild(easyDiv);
    resultContainer.appendChild(mediumDiv);
    resultContainer.appendChild(hardDiv);
    resultContainer.appendChild(totalDiv);
}

function displayError(message) {
    resultContainer.innerHTML = "";

    const errorMsg = document.createElement('p');
    errorMsg.textContent = `❌ ${message}`;
    errorMsg.style.color = "red";

    resultContainer.appendChild(errorMsg);
}
