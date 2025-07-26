// Theme toggle
const themes = ['blue', 'purple', 'pink', 'black'];
let currentThemeIndex = 0;

function toggleTheme() {
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    document.body.className = themes[currentThemeIndex];
    updateChartColors();
}

// Canvas Starfield with Twinkling and Shooting Stars
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const numStars = 200;
const shootingStars = [];

for (let i = 0; i < numStars; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.5 + 0.5
    });
}

function createShootingStar() {
    const theme = themes[currentThemeIndex];
    const strokeColor = theme === 'blue' ? '#00ffcc' :
                       theme === 'purple' ? '#ba55d3' :
                       theme === 'pink' ? '#ffb6c1' : '#d3d3d3';
    shootingStars.push({
        x: Math.random() * canvas.width,
        y: 0,
        length: Math.random() * 50 + 50,
        speed: Math.random() * 5 + 5,
        opacity: 1,
        strokeColor: strokeColor
    });
}

setInterval(createShootingStar, 3000);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
        star.y += star.speed;
        star.opacity = 0.5 + Math.sin(Date.now() * 0.002 + star.x) * 0.5;
        if (star.y > canvas.height) star.y = 0;
    }
    for (let i = shootingStars.length - 1; i >= 0; i--) {
        let star = shootingStars[i];
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x - star.length, star.y + star.length);
        ctx.strokeStyle = star.strokeColor;
        ctx.lineWidth = 2;
        ctx.stroke();
        star.y += star.speed;
        star.x -= star.speed * 0.5;
        star.opacity -= 0.02;
        if (star.opacity <= 0) shootingStars.splice(i, 1);
    }
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

animate();

// Skills Chart
let skillsChart = null;

function updateChartColors() {
    const theme = themes[currentThemeIndex];
    const backgroundColors = theme === 'blue' ? [
        'rgba(0, 255, 255, 0.6)',
        'rgba(0, 204, 204, 0.6)',
        'rgba(0, 153, 153, 0.6)',
        'rgba(0, 102, 102, 0.6)',
        'rgba(0, 51, 51, 0.6)'
    ] : theme === 'purple' ? [
        'rgba(128, 0, 128, 0.6)',
        'rgba(102, 0, 102, 0.6)',
        'rgba(76, 0, 76, 0.6)',
        'rgba(51, 0, 51, 0.6)',
        'rgba(25, 0, 25, 0.6)'
    ] : theme === 'pink' ? [
        'rgba(255, 20, 147, 0.6)',
        'rgba(255, 105, 180, 0.6)',
        'rgba(255, 182, 193, 0.6)',
        'rgba(255, 192, 203, 0.6)',
        'rgba(255, 160, 180, 0.6)'
    ] : [
        'rgba(255, 255, 255, 0.6)',
        'rgba(211, 211, 211, 0.6)',
        'rgba(169, 169, 169, 0.6)',
        'rgba(128, 128, 128, 0.6)',
        'rgba(100, 100, 100, 0.6)'
    ];
    const borderColors = theme === 'blue' ? [
        '#00ffff',
        '#00cccc',
        '#009999',
        '#006666',
        '#003333'
    ] : theme === 'purple' ? [
        '#800080',
        '#993399',
        '#660066',
        '#4d004d',
        '#330033'
    ] : theme === 'pink' ? [
        '#ff1493',
        '#ff69b4',
        '#ffb6c1',
        '#ffc1cc',
        '#ff99b3'
    ] : [
        '#ffffff',
        '#d3d3d3',
        '#a9a9a9',
        '#808080',
        '#666666'
    ];
    const hoverBackgroundColors = theme === 'blue' ? [
        'rgba(0, 255, 255, 0.8)',
        'rgba(0, 204, 204, 0.8)',
        'rgba(0, 153, 153, 0.8)',
        'rgba(0, 102, 102, 0.8)',
        'rgba(0, 51, 51, 0.8)'
    ] : theme === 'purple' ? [
        'rgba(128, 0, 128, 0.8)',
        'rgba(102, 0, 102, 0.8)',
        'rgba(76, 0, 76, 0.8)',
        'rgba(51, 0, 51, 0.8)',
        'rgba(25, 0, 25, 0.8)'
    ] : theme === 'pink' ? [
        'rgba(255, 20, 147, 0.8)',
        'rgba(255, 105, 180, 0.8)',
        'rgba(255, 182, 193, 0.8)',
        'rgba(255, 192, 203, 0.8)',
        'rgba(255, 160, 180, 0.8)'
    ] : [
        'rgba(255, 255, 255, 0.8)',
        'rgba(211, 211, 211, 0.8)',
        'rgba(169, 169, 169, 0.8)',
        'rgba(128, 128, 128, 0.8)',
        'rgba(100, 100, 100, 0.8)'
    ];
    const yAxisColor = theme === 'blue' ? '#00ffff' :
                      theme === 'purple' ? '#800080' :
                      theme === 'pink' ? '#ff1493' : '#ffffff';

    skillsChart.data.datasets[0].backgroundColor = backgroundColors;
    skillsChart.data.datasets[0].borderColor = borderColors;
    skillsChart.data.datasets[0].hoverBackgroundColor = hoverBackgroundColors;
    skillsChart.options.scales.y.title.color = yAxisColor;
    skillsChart.options.plugins.tooltip.titleColor = yAxisColor;
    skillsChart.update();
}

document.addEventListener('DOMContentLoaded', () => {
    skillsChart = new Chart(document.getElementById('skills-chart'), {
        type: 'bar',
        data: {
            labels: ['Python', 'JavaScript', 'HTML/CSS', 'UI/UX Design', 'react'],
            datasets: [{
                label: 'Skill Proficiency',
                data: [85, 80, 90, 75, 50],
                backgroundColor: [
                    'rgba(0, 255, 255, 0.6)',
                    'rgba(0, 204, 204, 0.6)',
                    'rgba(0, 153, 153, 0.6)',
                    'rgba(0, 102, 102, 0.6)',
                    'rgba(0, 51, 51, 0.6)'
                ],
                borderColor: [
                    '#00ffff',
                    '#00cccc',
                    '#009999',
                    '#006666',
                    '#003333'
                ],
                borderWidth: 2,
                hoverBackgroundColor: [
                    'rgba(0, 255, 255, 0.8)',
                    'rgba(0, 204, 204, 0.8)',
                    'rgba(0, 153, 153, 0.8)',
                    'rgba(0, 102, 102, 0.8)',
                    'rgba(0, 51, 51, 0.8)'
                ]
            }]
        },
        options: {
            responsive: true,
            animation: {
                duration: 2000,
                easing: 'easeOutBounce'
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Proficiency (%)',
                        color: '#00ffff',
                        font: { size: 14 }
                    },
                    ticks: { color: '#cccccc' }
                },
                x: {
                    ticks: { color: '#cccccc' }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#1a1a1a',
                    titleColor: '#00ffff',
                    bodyColor: '#cccccc'
                }
            }
        }
    });
});

// Navbar Scroll Behavior
const navbar = document.getElementById('navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > 50) {
        navbar.classList.add('minimized');
    } else {
        navbar.classList.remove('minimized');
    }
    lastScrollY = currentScrollY;
});

// Terminal Typing Animation and Suggestions
const commands = ['about', 'contact', 'resume', 'projects', 'github', 'linkedin', 'theme', 'clear', 'reload'];
const terminalOutput = document.getElementById('terminal-output');
const terminalInput = document.getElementById('terminal-input');
const terminalSuggestions = document.getElementById('terminal-suggestions');

const welcomeMessage = [
    'Welcome to my Portfolio — bash',
    'Available commands:',
    '- about: Who am I?',
    '- contact: How to reach me',
    '- resume: Get my resume',
    '- projects: List my projects',
    '- github: Open GitHub',
    '- linkedin: Open LinkedIn',
    '- theme: Cycle through color themes',
    '- clear: Clear the terminal',
    '- reload: Reload this terminal',
    'Type a command below!'
];

function typeWelcomeMessage() {
    terminalOutput.innerHTML = '';
    let currentLine = 0;
    let currentChar = 0;

    function type() {
        if (currentLine < welcomeMessage.length) {
            if (currentChar === 0) {
                terminalOutput.innerHTML += '<p></p>';
            }
            if (currentChar < welcomeMessage[currentLine].length) {
                terminalOutput.lastChild.innerHTML += welcomeMessage[currentLine][currentChar];
                currentChar++;
                setTimeout(type, 15);
            } else {
                terminalOutput.innerHTML += '<br>';
                currentLine++;
                currentChar = 0;
                setTimeout(type, 50);
            }
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }
    }
    requestAnimationFrame(type);
}

document.addEventListener('DOMContentLoaded', typeWelcomeMessage);

let commandHistory = [];
let historyIndex = -1;

function handleKeyDown(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        handleInput();
    } else if (event.key === 'ArrowUp' && commandHistory.length > 0) {
        event.preventDefault();
        if (historyIndex < commandHistory.length - 1) historyIndex++;
        terminalInput.value = commandHistory[commandHistory.length - 1 - historyIndex] || '';
    } else if (event.key === 'ArrowDown' && commandHistory.length > 0) {
        event.preventDefault();
        if (historyIndex > 0) historyIndex--;
        else historyIndex = -1;
        terminalInput.value = historyIndex >= 0 ? commandHistory[commandHistory.length - 1 - historyIndex] : '';
    } else if (event.key === 'Tab') {
        event.preventDefault();
        const input = terminalInput.value.trim().toLowerCase();
        const matches = commands.filter(cmd => cmd.startsWith(input));
        if (matches.length === 1) {
            terminalInput.value = matches[0];
            terminalSuggestions.style.display = 'none';
        }
    }
}

function handleInput() {
    const input = terminalInput.value.trim().toLowerCase();
    let response = '';

    if (input) {
        commandHistory.push(input);
        historyIndex = -1;

        switch (input) {
            case 'about':
                response = 'I am Laukik Rathod, a creative developer and designer with experience in Python, JavaScript, and UI/UX and currently exploring concepts of DSA.';
                break;
            case 'contact':
                response = 'Email: rathodlaukik184@gmail.com | LinkedIn: https://www.linkedin.com/in/laukik-rathod-182337311';
                break;
            case 'resume':
                response = 'Download my resume: <a href="#" style="color: inherit;">resume.pdf</a> (Coming soon!)';
                break;
            case 'projects':
                response = 'Projects: color-palette-generator, Galaxy API, Stellar Dashboard, Orbit Simulator';
                break;
            case 'github':
                window.open('https://github.com/Laukikrathod2007', '_blank');
                response = 'Opening GitHub...';
                break;
            case 'linkedin':
                window.open('https://www.linkedin.com/in/laukik-rathod-182337311', '_blank');
                response = 'Opening LinkedIn...';
                break;
            case 'theme':
                toggleTheme();
                response = `Theme changed to ${themes[currentThemeIndex]}`;
                break;
            case 'clear':
                terminalOutput.innerHTML = '';
                typeWelcomeMessage();
                terminalInput.value = '';
                return;
            case 'reload':
                location.reload();
                return;
            default:
                response = `Command "${input}" not recognized. Try: ${commands.join(', ')}.`;
        }

        terminalOutput.innerHTML += `<p>> ${input}</p><p>${response}</p>`;
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
        terminalInput.value = '';
        terminalSuggestions.style.display = 'none';
    }
}

terminalInput.addEventListener('input', () => {
    const input = terminalInput.value.trim().toLowerCase();
    const matches = commands.filter(cmd => cmd.startsWith(input));
    terminalSuggestions.innerHTML = matches.length > 0 ? matches.join(', ') : '';
    terminalSuggestions.style.display = input && matches.length > 0 ? 'block' : 'none';
});

function handleSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
        alert(`Message sent!\nFrom: ${name}\nEmail: ${email}\nMessage: ${message}`);
        event.target.reset();
    } else {
        alert('Please fill in all fields.');
    }
}

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const heroContent = document.querySelector('.hero-content');
    const scrollPosition = window.scrollY + window.innerHeight * 0.8;

    heroContent.classList.add('visible');

    sections.forEach(section => {
        if (scrollPosition > section.offsetTop) {
            section.classList.add('visible');
        }
        const offset = window.scrollY * 0.1;
        section.style.backgroundPositionY = `${offset}px`;
    });
});

window.dispatchEvent(new Event('scroll'));

const projects = document.querySelectorAll('.project');
projects.forEach(project => {
    project.addEventListener('mouseenter', () => {
        const particles = document.createElement('div');
        particles.className = 'particles';
        particles.style.position = 'absolute';
        particles.style.top = '0';
        particles.style.left = '0';
        particles.style.width = '100%';
        particles.style.height = '100%';
        particles.style.pointerEvents = 'none';
        project.appendChild(particles);

        const theme = themes[currentThemeIndex];
        const particleColor = theme === 'blue' ? '#00ffcc' :
                             theme === 'purple' ? '#ba55d3' :
                             theme === 'pink' ? '#ffb6c1' : '#d3d3d3';

        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('span');
            particle.style.position = 'absolute';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.background = particleColor;
            particle.style.borderRadius = '50%';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animation = `particleFade 1s ease forwards ${Math.random() * 0.5}s`;
            particles.appendChild(particle);
        }

        setTimeout(() => particles.remove(), 1000);
    });
});