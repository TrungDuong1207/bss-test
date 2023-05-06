// random data logs
const logs = [];
const devices = ["A", " B", "C", " D", "E", "G", "H", "L", "T"];
const actions = ["Action 1", "Action 2", "Action 3", "Action 4", "Action 5"];
for (let i = 0; i < 100; i++) {
    logs.push({
        deviceID: i,
        name: devices[Math.floor(Math.random() * 9)] + devices[Math.floor(Math.random() * 9)],
        action: actions[Math.floor(Math.random() * 5)],
        date: new Date().toISOString()
    });
}

const pagination = document.getElementById("pagination");
const searchInput = document.getElementById("search");

const itemsPerPage = 10;
let currentPage = 1;

// Render logs based on current page and search query
function renderLogs() {
    let filteredLogs = logs;
    const searchQuery = searchInput.value.trim().toLowerCase();
    if (searchQuery !== "") {
        filteredLogs = logs.filter(log => log.name.toLowerCase().includes(searchQuery));
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const logsOnPage = filteredLogs.slice(startIndex, endIndex);
    let html = "";
    logsOnPage.forEach((log) => {
        html += '<tr>';
        html += `<td>${log.deviceID} </td>`;
        html += `<td>${log.name}</td>`;
        html += `<td>${log.action}</td>`;
        html += `<td>${log.date}</td>`;
        html += '</tr>';
    })

    document.getElementById('logs-list').innerHTML = html;
    searchInput.value = "";

    // Render pagination
    const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
    pagination.innerHTML = "";

    // Render Prev button
    let prevButton = document.createElement("button");
    prevButton.innerText = "Prev";
    prevButton.id = "prev";
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener("click", () => {
        currentPage--;
        renderLogs();
    });
    prevButton.classList.add("prev-btn");
    pagination.appendChild(prevButton);


    // Render page buttons
    for (let i = 1; i <= totalPages; i++) {
        let button = document.createElement("button");
        button.innerText = i;
        button.addEventListener("click", () => {
            currentPage = i;
            renderLogs();
        });
        if (i === currentPage) {
            button.classList.add("act");
        }
        button.classList.add("page-btn")
        pagination.appendChild(button);
    }

    // Render Next button
    let nextButton = document.createElement("button");
    nextButton.innerText = "Next";
    nextButton.id = "next";
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener("click", () => {
        currentPage++;
        renderLogs();
    });
    nextButton.classList.add("prev-btn");
    pagination.appendChild(nextButton);
}

// Render initial logs and pagination
renderLogs();

// click search
const searchButton = document.querySelector('.btn-search');
searchButton.addEventListener('click', () => {
    currentPage = 1;
    renderLogs();
});
