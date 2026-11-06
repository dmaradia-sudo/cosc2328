// IC20 – COSC 2328 – Professor McCurry
// Implemented by: [Diego Maradiaga]

/*
REFLECTION

1. express.json() is middleware that parses incoming JSON request bodies and
   puts the result on req.body. Without it, req.body would be undefined in my
   POST route, so reading name and destination from it would throw an error.

2. 200 OK means the request succeeded. 201 Created
   means the request succeeded and a new resource was created

3. The missions array lives in memory, so it resets when the container
   restarts. To persist it I would need a database or a file on disk, plus a
   Docker volume so the data survives restarts.

4. Yes, both tabs would see the same list because the missions array is stored
   on the server and shared by all requests. Each tab would only see the
   other's new mission after reloading the list, since the page only fetches
   on load and after its own submit.
*/

const list = document.getElementById('mission-list');
const form = document.getElementById('mission-form');

async function loadMissions() {
const res  = await fetch('/ic20/missions');
const data = await res.json();
list.innerHTML = '';
data.forEach(m => {
const li = document.createElement('li');
li.innerHTML = `<p class="name">${m.name}</p><p class="dest">${m.destination}</p>`;
list.appendChild(li);
  });
}

form.addEventListener('submit', async (e) => {
e.preventDefault();
const name        = document.getElementById('mission-name').value.trim();
const destination = document.getElementById('mission-dest').value.trim();
await fetch('/ic20/missions', {
method:  'POST',
headers: { 'Content-Type': 'application/json' },
body:    JSON.stringify({ name, destination }),
  });
form.reset();
loadMissions();
});

loadMissions();