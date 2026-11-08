/*
Reflection
1. require('dotenv').config() reads the .env file and puts its values into process.env.
   It runs once in app.js at startup. process.env is shared by the whole app, so
   hw9-routes.js can use it without calling dotenv again.

2. A <form> reloads the page by default, which is why IC20 needed e.preventDefault().
   A plain <button> outside a form does nothing on its own except fire a click, and
   fetch() sends the data in the background, so the page never reloads.

3. The case list would be empty again, because the array only lives in memory and
   memory is wiped when the container restarts. To keep the data, you'd need to save
   it somewhere permanent, like a SQLite database.

4. The browser gets the 400 as the response from the fetch() POST call. response.ok
   is true for 200-299 and false for 400, so we can check it to tell
   success from error.
*/

// HW9 – COSC 2328 – Professor McCurry
// Implemented by: [Diego Maradiaga]

async function loadCredentials() {
  const response = await fetch('/hw9/credentials');
  const data = await response.json();

  const dl = document.getElementById('credentials');
  dl.innerHTML = '';

  Object.entries(data).forEach(([key, value]) => {
    const dt = document.createElement('dt');
    dt.textContent = key;
    const dd = document.createElement('dd');
    dd.textContent = value;
    dl.append(dt, dd);
  });
}

async function loadCases() {
  const response = await fetch('/hw9/cases');
  const data = await response.json();

  const list = document.getElementById('case-list');
  list.innerHTML = '';

  if (data.length === 0) {
    const li = document.createElement('li');
    li.className = 'empty-msg';
    li.textContent = 'No cases filed yet.';
    list.appendChild(li);
    return;
  }

  data.forEach(c => {
    const li = document.createElement('li');
    [
      ['case-id',       'Case #' + c.id],
      ['case-suspect',  c.suspect],
      ['case-location', c.location],
      ['case-notes',    c.notes],
      ['case-ts',       c.timestamp]
    ].forEach(([cls, text]) => {
      const div = document.createElement('div');
      div.className = cls;
      div.textContent = text;
      li.appendChild(div);
    });
    list.appendChild(li);
  });
}

document.getElementById('log-btn').addEventListener('click', async () => {
  const suspect  = document.getElementById('suspect').value;
  const location = document.getElementById('location').value;
  const notes    = document.getElementById('notes').value;
  const status   = document.getElementById('log-status');

  const response = await fetch('/hw9/cases', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ suspect, location, notes })
  });

  if (!response.ok) {
    const err = await response.json();
    status.textContent = err.error;
    return;
  }

  document.getElementById('suspect').value  = '';
  document.getElementById('location').value = '';
  document.getElementById('notes').value    = '';
  status.textContent = '';
  loadCases();
});

loadCredentials();
loadCases();