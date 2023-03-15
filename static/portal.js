var getParameters = window.location.href.split("?")[1];
const registrationErrorMsg = document.getElementById("registration-error");

if (getParameters.includes('error=taken')) {
	registrationErrorMsg.style.display = 'block';
	registrationErrorMsg.innerText = 'Username Taken';
}
else if (getParameters.includes('error=blank')) {
	registrationErrorMsg.style.display = 'block';
	registrationErrorMsg.innerText = 'You can\'t have a blank password/username.';
}
else if (getParameters.includes('error=match')) {
	registrationErrorMsg.style.display = 'block';
	registrationErrorMsg.innerText = 'Your passwords don\'t match.';
}
else if (getParameters.includes('error=invalid')) {
	registrationErrorMsg.style.display = 'block';
	registrationErrorMsg.innerText = 'Invalid username or password.';
}
else if (getParameters.includes('error=exist')) {
	registrationErrorMsg.style.display = 'block';
	registrationErrorMsg.innerText = 'Username does not exist.';
}