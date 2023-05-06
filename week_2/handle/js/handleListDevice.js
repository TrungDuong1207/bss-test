// Giả lập dữ liệu của bảng
const deviceList = [
    {
        name: "TV",
        macAddress: "01:23:45:67:89:ab",
        ip: "192.168.0.1",
        createDate: "4/5/2023",
        consumption: 50
    },
    {
        name: "Device 2",
        macAddress: "ab:cd:ef:01:23:45",
        ip: "192.168.0.2",
        createDate: "4/5/2023",
        consumption: 80
    },
    {
        name: "Device 3",
        macAddress: "12:34:56:78:9a:bc",
        ip: "192.168.0.3",
        createDate: "4/5/2023",
        consumption: 120
    }
];

let dataSets = [];
let labels = [];
let backgroundColor = [];

// random color
function randomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

deviceList.forEach((item) => {
    labels.push(item.name);
    dataSets.push(item.consumption);
    backgroundColor.push(randomColor());
})

let dataDevice = {
    labels: labels,
    datasets: [{
        label: 'My First Dataset',
        data: dataSets,
        backgroundColor: backgroundColor,
        hoverOffset: 3
    }]
}

// Hiển thị biểu đồ

let ctx = document.getElementById('device-chart').getContext('2d');
let myChart = new Chart(ctx, {
    type: 'doughnut',
    data: dataDevice
});

// Hiển thị dữ liệu của bảng
function renderDeviceList() {
    const tbody = $(".device-list tbody");
    if (localStorage.getItem("devices") != null) {
        let devi = JSON.parse(localStorage.getItem("devices"))
        tbody.empty();
        for (const device of devi) {
            const tr = $("<tr></tr>");
            tr.append($(`<td>${device.name}</td>`));
            tr.append($(`<td>${device.macAddress}</td>`));
            tr.append($(`<td>${device.ip}</td>`));
            tr.append($(`<td>${device.createDate}</td>`));
            tr.append($(`<td>${device.consumption}</td>`));
            tbody.append(tr);
        }
    } else {
        tbody.empty();
        for (const device of deviceList) {
            const tr = $("<tr></tr>");
            tr.append($(`<td>${device.name}</td>`));
            tr.append($(`<td>${device.macAddress}</td>`));
            tr.append($(`<td>${device.ip}</td>`));
            tr.append($(`<td>${device.createDate}</td>`));
            tr.append($(`<td>${device.consumption}</td>`));
            tbody.append(tr);
        }
    }


}

window.onload = () => {
    renderDeviceList();
    if (localStorage.getItem("dataDevice") !== null) {

        dataDevice = JSON.parse(localStorage.getItem("dataDevice"));
        myChart.destroy();
        myChart = new Chart(ctx, {
            type: 'doughnut',
            data: dataDevice
        });
    }
}

// add devices

$('#add-device-form').submit(function (event) {
    event.preventDefault();
    
    let name = $('#name').val();
    let ip = $('#ip').val();
    let power = $('#power').val();
    let macAddress = "01:23:45:67:89:ab";
    let createDate = Date.now();
    let validate = true;

    if (name.trim().length === 0) {
        $('#errorName').text("Name couldn't be blank");
        $("#name").css("border-color", "red");
        validate = false;
    } else {
        $('#errorName').text("");
        $("#name").css("border-color", "");
    }

    if (ip.trim().length === 0) {
        $('#errorIp').text("ip address couldn't be blank");
        $("#ip").css("border-color", "red");
        validate = false;
    } else {
        $("#ip").css("border-color", "");
        $('#errorIp').text("");
    }

    if (power < 0 || power.trim().length === 0) {
        $('#errorPower').text("power required and greater than or equal to 0");
        $("#power").css("border-color", "red");
        validate = false;
    } else {
        $('#errorPower').text("");
        $("#power").css("border-color", "");
    }

    if (validate === false) {
        return;
    }

    let newDevice = {
        name: name,
        macAddress: macAddress,
        ip: ip,
        createDate: new Date(createDate).toLocaleDateString(),
        consumption: power
    }
    // Add new row to table
    deviceList.push(newDevice);



    //Update chart data
    labels.push(name);
    dataSets.push(power);
    backgroundColor.push(randomColor())
    myChart.update();

    save();
    renderDeviceList();
    // Reset form
    $('#name').val('');
    $('#ip').val('');
    $('#power').val('');
});




// const chartData = deviceList.map((device) => ({ x: device.name, y: device.power }));

function save() {
    localStorage.removeItem("devices");
    localStorage.setItem("devices", JSON.stringify(deviceList));
    localStorage.setItem("dataDevice", JSON.stringify(dataDevice));

}