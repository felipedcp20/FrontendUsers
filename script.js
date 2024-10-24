// Listar Usuarios
function listarUsuarios() {
    fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(data => {
            const userList = document.getElementById('userList');
            userList.innerHTML = '';
            data.forEach(user => {
                const li = document.createElement('li');
                li.className = 'list-group-item';
                li.textContent = `ID: ${user.id}, Nombre: ${user.name}, Email: ${user.email}`;
                userList.appendChild(li);
            });
        });
}

// Crear Usuario
document.getElementById('createUserForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
    })
    .then(response => response.json())
    .then(user => {
        alert(`Usuario creado: ID: ${user.id}, Nombre: ${user.name}, Email: ${user.email}`);
        this.reset();
    });
});

// Obtener Usuario por ID
document.getElementById('getUserForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const userId = document.getElementById('userId').value;
    fetch(`http://localhost:3000/users/${userId}`)
        .then(response => response.json())
        .then(user => {
            const userDetails = document.getElementById('userDetails');
            userDetails.textContent = `ID: ${user.id}, Nombre: ${user.name}, Email: ${user.email}`;
        })
        .catch(() => {
            document.getElementById('userDetails').textContent = 'Usuario no encontrado';
        });
});

// Eliminar Usuario por ID
document.getElementById('deleteUserForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const userId = document.getElementById('deleteUserId').value;
    fetch(`http://localhost:3000/users/${userId}`, { method: 'DELETE' })
        .then(() => {
            document.getElementById('deleteConfirmation').textContent = 'Usuario eliminado';
        })
        .catch(() => {
            document.getElementById('deleteConfirmation').textContent = 'Error al eliminar usuario';
        });
});