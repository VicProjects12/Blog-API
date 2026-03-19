redirectIfLoggedIn(); // Go to dashboard if already logged in

document.getElementById('registerBtn').addEventListener('click', async () => {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const errorMsg = document.getElementById('errorMsg');

  // Hide any previous error
  errorMsg.classList.add('hidden');

  if (!name || !email || !password || !confirmPassword) {
    errorMsg.textContent = 'Please fill in all fields';
    errorMsg.classList.remove('hidden');
    return;
  }

  // ✅ KEPT: passwords match check from your original
  if (password !== confirmPassword) {
    errorMsg.textContent = 'Passwords do not match';
    errorMsg.classList.remove('hidden');
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      errorMsg.textContent = data.message;
      errorMsg.classList.remove('hidden');
      return;
    }

    // ✅ CHANGED: redirect to login.html instead of dashboard (week3 pattern)
    window.location.href = 'login.html';

  } catch (error) {
    errorMsg.textContent = 'Could not connect to server. Is it running?';
    errorMsg.classList.remove('hidden');
  }
});