const splash_section = document.getElementById("splash");

const login_section = document.getElementById("login");
const login_email_input = document.getElementById("login-email-input");
const login_password_input = document.getElementById("login-password-input");
const login_login_btn = document.getElementById("login-login-btn");
const login_error_message = document.getElementById("login-error-message");

const dashboard_section = document.getElementById("dashboard");
const dashboard_user_email = document.getElementById("dashboard-user-email");
const dashboard_word_input = document.getElementById("dashboard-word-input");
const dashboard_insert_message = document.getElementById("dashboard-insert-message");
const dashboard_error_message = document.getElementById("dashboard-error-message");
const dashboard_insert_btn = document.getElementById("dashboard-insert-btn");
const dashboard_logout_btn = document.getElementById("dashboard-logout-btn");

let searching = false;

setTimeout(() => (function() {
    const user = window.auth.currentUser;
    
    if (user) {
        dashboard_user_email.innerText = user.email;
        visible_dashboard_section(true);
    } else {
        visible_dashboard_section(false);
        visible_login_section(true);
    }

    visible_splash_section(false);

    setTimeout(() => dashboard_word_input.focus(), 500);
})(), 1000);

login_login_btn.addEventListener('click', async function() {
    const login_email = login_email_input.value;
    const login_password = login_password_input.value;

    login_error_message.innerText = "";

    const d = await window.signIn(login_email, login_password);

    if (d?.error) login_error_message.innerText = d.error;
    else {
        visible_splash_section(true);
        visible_login_section(false);
        visible_dashboard_section(true);
        setTimeout(() => visible_splash_section(false), 1000);
        setTimeout(() => dashboard_word_input.focus(), 1500);
    }
});

dashboard_logout_btn.addEventListener('click', async function() {
    visible_splash_section(true);
    
    await window.logout();

    visible_login_section(true);
    visible_dashboard_section(false);
    setTimeout(() => visible_splash_section(false), 1000);
});

dashboard_word_input.addEventListener('keydown', async function(event) {
    if (event.key === 'Enter' && event.target.value && !searching) {
        searching = true;
        dashboard_error_message.innerHTML = ``;
        visible_dashboard_insert_btn(false);
        const found = await window.look(event.target.value);
        if (found) {
            dashboard_error_message.innerHTML = `Inserted by <strong>${found.createdBy?.email}</strong> - ${found.createdAt.toDate().toString()}`
            visible_dashboard_error_message(true);
            visible_dashboard_insert_btn(false);
        } else {
            visible_dashboard_error_message(false);
            visible_dashboard_insert_btn(true);
        }
        dashboard_word_input.select();
        setTimeout(() => searching = false, 2000);
    }
});

dashboard_insert_btn.addEventListener("click", async function() {
    const dashboard_word = dashboard_word_input.value;
    if (dashboard_word) {
        await window.push(dashboard_word);
        visible_dashboard_insert_btn(false);
        dashboard_word_input.value = ``;
        setTimeout(() => dashboard_word_input.focus(), 500);
    }
});

const visible_splash_section = (b = true) => {
    splash_section.classList.remove(b ? "hidden" : "-");
    splash_section.classList.add(b ? "-" : "hidden");
}

const visible_login_section = (b = true) => {
    login_section.classList.remove(b ? "hidden" : "-");
    login_section.classList.add(b ? "-" : "hidden");
}

const visible_dashboard_section = (b = true) => {
    dashboard_section.classList.remove(b ? "hidden" : "-");
    dashboard_section.classList.add(b ? "-" : "hidden");
}

const visible_dashboard_error_message = (b = true) => {
    dashboard_error_message.classList.remove(b ? "hidden" : "-");
    dashboard_error_message.classList.add(b ? "-" : "hidden");
}

const visible_dashboard_insert_btn = (b = true) => {
    dashboard_insert_btn.classList.remove(b ? "hidden" : "-");
    dashboard_insert_btn.classList.add(b ? "-" : "hidden");
}

// add toast for showing error and other thing