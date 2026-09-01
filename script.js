// ===============================
// HOME PAGE
// ===============================

function login() {
    window.location.href = "login.html";
}

function register() {
    window.location.href = "register.html";
}

function googleSignIn() {
    alert("Google Sign-In will be connected with AWS Cognito.");
}


// ===============================
// REGISTER
// ===============================

function registerUser(event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!fullName || !email || !password || !confirmPassword) {
        alert("Please fill all information.");
        return;
    }

    if (password.length < 6) {
        alert("Password must contain at least 6 characters.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    const user = {
        fullName: fullName,
        email: email,
        password: password
    };

    localStorage.setItem("resumeBuilderUser", JSON.stringify(user));

    alert("Registration successful!");
    window.location.href = "login.html";
}


// ===============================
// LOGIN
// ===============================

function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const savedUser = JSON.parse(
        localStorage.getItem("resumeBuilderUser")
    );

    if (!savedUser) {
        alert("Please register first.");
        return;
    }

    if (email === savedUser.email && password === savedUser.password) {
        alert("Login successful!");
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid email or password.");
    }
}


// ===============================
// DASHBOARD
// ===============================

function createResume() {
    window.location.href = "builder.html";
}

function myResumes() {
    alert("My Resumes section will be available soon.");
}

function viewResume() {
    window.location.href = "preview.html";
}

function logout() {
    alert("Logout successful!");
    window.location.href = "index.html";
}


// ===============================
// CREATE RESUME
// ===============================

const resumeForm = document.getElementById("resumeForm");

if (resumeForm) {

    resumeForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const resumeData = {

            name: document.getElementById("resumeName").value.trim(),

            profile: document.getElementById("profile").value.trim(),

            education: document.getElementById("education").value.trim(),

            skills: document.getElementById("skills").value.trim(),

            projects: document.getElementById("projects").value.trim(),

            experience: document.getElementById("experience").value.trim(),

            certifications: document.getElementById("certifications").value.trim()

        };

        localStorage.setItem(
            "resumeData",
            JSON.stringify(resumeData)
        );

        alert("Resume generated successfully!");

        window.location.href = "preview.html";

    });
}


// ===============================
// BACK TO DASHBOARD
// ===============================

function backToDashboard() {
    window.location.href = "dashboard.html";
}


// ===============================
// RESUME PREVIEW
// ===============================

function loadResumePreview() {

    const savedData = localStorage.getItem("resumeData");

    if (!savedData) {
        alert("No resume data found.");
        window.location.href = "builder.html";
        return;
    }

    const data = JSON.parse(savedData);

    const name = document.getElementById("previewName");
    const profile = document.getElementById("previewProfile");
    const education = document.getElementById("previewEducation");
    const skills = document.getElementById("previewSkills");
    const projects = document.getElementById("previewProjects");
    const experience = document.getElementById("previewExperience");
    const certifications = document.getElementById("previewCertifications");

    if (name) {
        name.textContent = data.name;
    }

    if (profile) {
        profile.textContent = data.profile;
    }

    if (education) {
        education.textContent = data.education;
    }

    if (skills) {
        skills.textContent = data.skills;
    }

    if (projects) {
        projects.textContent = data.projects;
    }

    if (experience) {
        experience.textContent = data.experience;
    }

    if (certifications) {
        certifications.textContent = data.certifications;
    }
}


// ===============================
// EDIT RESUME
// ===============================

function backToBuilder() {
    window.location.href = "builder.html";
}