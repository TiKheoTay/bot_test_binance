let users = []; // List of users
let currentUser = null;

// Register user
document.getElementById("register-btn").addEventListener("click", () => {
    const username = document.getElementById("reg-username").value;
    const password = document.getElementById("reg-password").value;

    if (!username || !password) {
        alert("Please fill all fields!");
        return;
    }

    const userExists = users.some(user => user.username === username);
    if (userExists) {
        alert("Username already exists!");
        return;
    }

    users.push({ username, password, role: "user" });
    alert("User registered successfully!");
});

// Login user
document.getElementById("login-btn").addEventListener("click", () => {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        currentUser = user;
        document.getElementById("auth-section").classList.add("d-none");
        document.getElementById("dashboard-section").classList.remove("d-none");
        document.getElementById("current-user").innerText = user.username;
        renderUserTable();
    } else {
        alert("Invalid credentials!");
    }
});

// Logout user
document.getElementById("logout-btn").addEventListener("click", () => {
    currentUser = null;
    document.getElementById("auth-section").classList.remove("d-none");
    document.getElementById("dashboard-section").classList.add("d-none");
});

// Render user table
function renderUserTable() {
    const table = document.getElementById("user-table");
    table.innerHTML = "";

    users.forEach(user => {
        const row = document.createElement("tr");
        row.innerHTML = `
      <td>${user.username}</td>
      <td>${user.role}</td>
      <td>
        <button class="btn btn-sm btn-warning" onclick="editUser('${user.username}')">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteUser('${user.username}')">Delete</button>
      </td>
    `;
        table.appendChild(row);
    });
}

// Edit user
function editUser(username) {
    const newRole = prompt("Enter new role (user/admin):");
    if (newRole === "user" || newRole === "admin") {
        users = users.map(user => user.username === username ? { ...user, role: newRole } : user);
        renderUserTable();
    } else {
        alert("Invalid role!");
    }
}

// Delete user
function deleteUser(username) {
    if (confirm("Are you sure you want to delete this user?")) {
        users = users.filter(user => user.username !== username);
        renderUserTable();
    }
}
z