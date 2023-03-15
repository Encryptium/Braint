const createButton = document.getElementById("create-btn");
var createTaskPanel = document.createElement("div");
createTaskPanel.classList.add("create-task-panel");
// createTaskPanel.tabIndex = 0;

createTaskPanel.innerHTML = 
`
<h2>Create Task</h2>
<br>

<form id="create-task-form">
	<input type="text" name="task-name" placeholder="Task Name" required>
	
	<br>
	<br>

	<!-- Repeat function force enabled because of issues. All tasks will repeat every week automatically. Option to disable may be added in future versions. -->
	<!-- <input type="checkbox" name="repeat" checked> Repeat Every Week -->
	
	<br>
	<br>
	
	<table id="create-task-table">
		<tr>
			<td>Monday</td>
			<td>Tuesday</td>
			<td>Wedesday</td>
			<td>Thursday</td>
			<td>Friday</td>
			<td>Saturday</td>
			<td>Sunday</td>
		</tr>
	
		<tr>
			<td><span class="checkbox-container"><input type="checkbox" name="monday"><span class="checkmark"></span></span></td>
			<td><span class="checkbox-container"><input type="checkbox" name="tuesday"><span class="checkmark"></span></span></td>
			<td><span class="checkbox-container"><input type="checkbox" name="wednesday"><span class="checkmark"></span></span></td>
			<td><span class="checkbox-container"><input type="checkbox" name="thursday"><span class="checkmark"></span></span></td>
			<td><span class="checkbox-container"><input type="checkbox" name="friday"><span class="checkmark"></span></span></td>
			<td><span class="checkbox-container"><input type="checkbox" name="saturday"><span class="checkmark"></span></span></td>
			<td><span class="checkbox-container"><input type="checkbox" name="sunday"><span class="checkmark"></span></span></td>
		</tr>
	</table>

	<br>
	
	<input type="submit" value="Save">
</form>
`;

document.body.appendChild(createTaskPanel);

// Show create task panel when activated
createButton.addEventListener('click', e => {
	e.preventDefault();
	createTaskPanel.classList.add("show");
});


// Send new task to server when save button is clicked
document.getElementById("create-task-form").addEventListener('submit', e => {
	e.preventDefault();
	
	var form = document.getElementById("create-task-form");
	var formData = new FormData(form);
	
	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      displayMessage(JSON.parse(xhr.responseText).message);
    }
  };

	xhr.open('POST', '/api/v1/save', true);
	xhr.send(formData);

	createTaskPanel.classList.remove("show");
	form.reset();
	
	// Wait 1 second before requesting new data to give enough time to process the submitted task
	setTimeout(() => {
		refreshContent();
	}, 1000);
});


// Dark mode implementation w/ Unlight
const unlight = new Unlight({
	classes: {
		"*": "darkmode", // assigns .darkmode class to all elements
		"h1, h2": "darkmode-text",
		p: "darkmode-text",
		"a li": "darkmode-text",
		a: "darkmode-text",
		input: "darkmode-input",
		td: "darkmode-text",
		"#navbar": "darkmode-navbar",
		"#create-task-panel": "darkmode-task-panel",
		"td ul li": "dark-text",
		".task": "darkmode-task",
		".display-task": "darkmode-calendar-event"
	},

	// Organizes persistence so the theme is saved in the browser
	persistent: true,
	persistenceIdentifier: "dark"
});


if (unlight.isActive) {
	unlight.activate();
} else {
	unlight.deactivate();
}


setInterval(() => {
	refreshTheme();
},10);


function refreshTheme() {
	if (unlight.isActive) {
		unlight.activate();
	} else {
		unlight.deactivate();
	}
}

const activateDarkModeButton = document.getElementById("activate-darkmode");

if (unlight.isActive) {
	activateDarkModeButton.innerHTML = '<li>Light Mode</li>';
} else {
	activateDarkModeButton.innerHTML = '<li>Dark Mode</li>';
}
	
activateDarkModeButton.addEventListener('click', () => {
	if (unlight.isActive) {
		unlight.deactivate();
		activateDarkModeButton.innerHTML = '<li>Dark Mode</li>';
	} else {
		unlight.activate();
		activateDarkModeButton.innerHTML = '<li>Light Mode</li>';
	}
});

// expand and collapse completed tasks
const completedTitle = document.getElementById("completed");
const completedTasks = document.getElementById("completed-tasks");
const completedDropdownArrow = document.getElementById("completed-dropdown-arrow");

completedTitle.addEventListener("click", () => {
	if (completedTasks.style.visibility == 'hidden') {
		completedTasks.style.visibility = 'visible';
		completedDropdownArrow.classList.remove("fa-caret-down");
		completedDropdownArrow.classList.add("fa-caret-up");
	} else {
		completedTasks.style.visibility = 'hidden';
		completedDropdownArrow.classList.remove("fa-caret-up");
		completedDropdownArrow.classList.add("fa-caret-down");
	}
});

// register service worker
window.addEventListener("load", () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js");
  }
});