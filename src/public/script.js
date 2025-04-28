const user = localStorage.getItem('user');
if (!user) location.href = 'index.html';

async function loadNotes() {
    const important = document.getElementById('importantFilter').checked;
    const res = await fetch(`/notes/${user}?important=${important}`);
    const notes = await res.json();
    const container = document.getElementById('notes');
    container.innerHTML = '';
    notes.forEach((n, i) => {
        const div = document.createElement('div');
        div.className = 'note';
        div.innerHTML = `
            <strong>${n.title}</strong> (${new Date(n.created).toLocaleString()})<br>
            ${n.text}<br>
            <button onclick="deleteNote(${i})">Smazat</button>
            <button onclick="toggleImportant(${i})">${n.important ? 'Odebrat důležitost' : 'Označit jako důležité'}</button>
        `;
        container.appendChild(div);
    });
}

document.getElementById('noteForm').onsubmit = async e => {
    e.preventDefault();
    const form = new FormData(e.target);
    await fetch(`/notes/${user}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            title: form.get('title'),
            text: form.get('text')
        })
    });
    e.target.reset();
    loadNotes();
};

function deleteNote(i) {
    fetch(`/notes/${user}/${i}`, { method: 'DELETE' }).then(loadNotes);
}

function toggleImportant(i) {
    fetch(`/notes/${user}/${i}/toggle-important`, { method: 'PUT' }).then(loadNotes);
}

document.getElementById('deleteAccountForm').onsubmit = async e => {
    e.preventDefault();
    if (!confirm("Opravdu chcete zrušit svůj účet? Tato akce je nevratná.")) return;

    const form = new FormData(e.target);
    const password = form.get('password');

    const res = await fetch('/auth/account', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: user,
            password
        })
    });

    const data = await res.json();
    if (data.success) {
        alert("Účet byl zrušen.");
        localStorage.removeItem('user');
        location.href = 'index.html';
    } else {
        document.getElementById('deleteMessage').innerText = data.message || "Něco se pokazilo.";
    }
};


function logout() {
    localStorage.removeItem('user');
    location.href = 'index.html';
}

document.getElementById('importantFilter').onchange = loadNotes;

loadNotes();