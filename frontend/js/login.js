redirectIfLoggedIn(); // Go to dashboard if already logged in

// Password toggle (kept from your original)
const passwordToggle = document.getElementById('passwordToggle');
const passwordInput = document.getElementById('password');

passwordToggle.addEventListener('click', function () {
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    passwordToggle.classList.add('active');
  } else {
    passwordInput.type = 'password';
    passwordToggle.classList.remove('active');
  }
});

// ✅ CHANGED: single loginBtn click listener instead of form submit
document.getElementById('loginBtn').addEventListener('click', async () => {
  const email = document.getElementById('email').value.trim();
  const password = passwordInput.value;
  const errorMsg = document.getElementById('errorMsg');

  // Hide any previous error
  errorMsg.classList.add('hidden');

  if (!email || !password) {
    errorMsg.textContent = 'Please fill in all fields';
    errorMsg.classList.remove('hidden');
    return;
  }

  try {
    const response = await fetch('https://simpletechblog-production.up.railway.app/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      errorMsg.textContent = data.message;
      errorMsg.classList.remove('hidden');
      return;
    }

    // Store token AND user object (kept from your original)
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    // Show success animation then redirect (kept from your original)
    document.getElementById('successMessage').style.display = 'flex';
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 2000);

  } catch (error) {
    errorMsg.textContent = 'Could not connect to server. Is it running?';
    errorMsg.classList.remove('hidden');
  }
});