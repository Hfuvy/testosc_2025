const form = document.getElementById("employee-form");
const listContainer = document.getElementById("employee-list");
let employees = JSON.parse(localStorage.getItem("employees")) || [];

// Fonction pour afficher les employes
function displayEmployees() {
  listContainer.innerHTML = "";

  employees.forEach((emp, index) => {
    const div = document.createElement("div");
    div.className = "employee";
    div.innerHTML = `
      <div class="employee-info">
        <strong>${emp.firstname} ${emp.lastname}</strong><br>
        ${emp.email}<br>
        ${emp.position}
      </div>
      <button onclick="deleteEmployees(${index})">Supprimer</button>
    `;
    listContainer.appendChild(div);
  });
}

// Fonction pour supprimer un employe
function deleteEmployees(index) {
  if (confirm("Êtes-vous sûr de vouloir supprimer cet employé ?")) {
    employees.splice(index, 1);
    localStorage.setItem("employees", JSON.stringify(employees));
    displayEmployees();
  }
}

// Logique pour ajouter un employe
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const lastname = document.getElementById("lastname").value.trim();
  const firstname = document.getElementById("firstname").value.trim();
  const email = document.getElementById("email").value.trim();
  const position = document.getElementById("position").value.trim();

  if (!lastname || !firstname || !position || !email || !validateEmail(email)) {
    alert("Veuillez remplir correctement tous les champs !");
    return;
  }

  employees.push({ lastname, firstname, email, position });
  localStorage.setItem("employees", JSON.stringify(employees));
  displayEmployees();
  form.reset();
});

// Validation de l'email
function validateEmail(email) {
  const re = /^\S+@\S+\.\S+$/;
  return re.test(email);
}

// Afficher les employes au chargement de la page
displayEmployees();