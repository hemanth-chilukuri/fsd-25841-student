async function loadLogs(){

const res = await fetch("http://localhost:3000/logs");

const data = await res.json();

let rows = "";

data.forEach(log => {

rows += `
<tr>
<td>${log.action_type}</td>
<td>${log.description}</td>
<td>${log.action_time}</td>
</tr>
`;

});

document.querySelector("#logTable tbody").innerHTML = rows;

}


async function loadReport(){

const res = await fetch("http://localhost:3000/report");

const data = await res.json();

let rows = "";

data.forEach(r => {

rows += `
<tr>
<td>${r.activity_date}</td>
<td>${r.total_actions}</td>
</tr>
`;

});

document.querySelector("#reportTable tbody").innerHTML = rows;

}