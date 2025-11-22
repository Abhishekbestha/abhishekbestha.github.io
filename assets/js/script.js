'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn-2]");

// sidebar toggle functionality for mobile
if (sidebarBtn) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}

function initializeTypewriter() {
  const words = ["Senior Software Developer"];
  let wordIndex = 0,
    charIndex = 0,
    isDeleting = false;
  const typewriter = document.getElementById("typewriter");

  function type() {
    const currentWord = words[wordIndex];

    // Update text content first to ensure correct character display
    if (isDeleting) {
      typewriter.textContent = currentWord.substring(0, charIndex);
      charIndex--;
    } else {
      typewriter.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 50 : 100;

    // Check conditions after updating text and charIndex
    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      delay = 1100;
    } else if (isDeleting && charIndex < 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      charIndex = 0;
      delay = 250;
    }

    setTimeout(type, delay);
  }
  type();
}

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
if (testimonialsItem && modalContainer && modalCloseBtn && overlay) {
  for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener("click", function () {
      modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
      modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
      modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
      modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
      testimonialsModalFunc();
    });
  }
  // add click event to modal close button
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  overlay.addEventListener("click", testimonialsModalFunc);
}



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

// add event in all select items
if (selectItems) {
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      filterFunc(selectedValue);
    });
  }
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

if (filterBtn && filterBtn.length > 0) {
  for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      filterFunc(selectedValue);
      if (lastClickedBtn) lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;
    });
  }
}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
if (form && formInputs && formBtn) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      // check form validation
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}


// gif reload
// gif reload
setInterval(() => {
  let gif1 = document.getElementById('gifImage1');
  let gif2 = document.getElementById('gifImage2');
  let gif3 = document.getElementById('gifImage3');

  if (gif1 && gif2 && gif3) {
    let timestamp = new Date().getTime();
    gif1.src = "./assets/images/Knowledge.gif?t=" + timestamp;
    gif2.src = "./assets/images/Portfolio.gif?t=" + timestamp;
    gif3.src = "./assets/images/NotionBlog.gif?t=" + timestamp;
  }
}, 5000);

// Dynamic Data Loading
async function loadExperience() {
  const container = document.getElementById('experience-container');
  if (!container) return;

  try {
    const response = await fetch('./assets/data/experience.json');
    const data = await response.json();

    container.innerHTML = data.map(item => `
            <div class="timeline-item">
                <div class="timeline-marker"></div>
                <span class="timeline-date">${item.period}</span>
                <h3 class="timeline-role">${item.role}</h3>
                <p class="timeline-company">${item.company}</p>
                <div class="text-muted">
                    ${item.description.map(desc => `<p>${desc}</p>`).join('')}
                </div>
                ${item.subRoles ? item.subRoles.map(sub => `
                    <br>
                    <h4 class="timeline-role" style="font-size: 1.1rem;">${sub.role}</h4>
                    <div class="text-muted">
                        ${sub.description.map(desc => `<p>${desc}</p>`).join('')}
                    </div>
                `).join('') : ''}
            </div>
        `).join('');
  } catch (error) {
    console.error('Error loading experience:', error);
  }
}

async function loadProjects() {
  const featuredContainer = document.getElementById('featured-projects-container');
  const allContainer = document.getElementById('all-projects-container');

  if (!featuredContainer && !allContainer) return;

  try {
    const response = await fetch('./assets/data/projects.json');
    const data = await response.json();

    const createProjectCard = (project) => `
            <div class="project-card">
                <img src="${project.image}" alt="${project.title}" class="project-img">
                <div class="project-overlay">
                    <a href="${project.link}" target="_blank" class="view-project-btn">View Project</a>
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <p class="text-muted">${project.description}</p>
                </div>
            </div>
        `;

    if (featuredContainer) {
      featuredContainer.innerHTML = data.slice(0, 3).map(createProjectCard).join('');
    }

    if (allContainer) {
      allContainer.innerHTML = data.map(createProjectCard).join('');
    }
  } catch (error) {
    console.error('Error loading projects:', error);
  }
}

async function loadSkills() {
  const container = document.getElementById('skills-container');
  if (!container) return;

  try {
    const response = await fetch('./assets/data/skills.json');
    const data = await response.json();

    container.innerHTML = data.map(category => `
            <div class="card">
                <h3 class="project-title" style="margin-bottom: 24px;">${category.category}</h3>
                <div class="skills-grid">
                    ${category.skills.map(skill => `
                        <div class="skill-chip">
                            ${skill.icon ? `<img src="${skill.icon}" alt="${skill.name}" />` : ''}
                            ${skill.ionIcon ? `<ion-icon name="${skill.ionIcon}"></ion-icon>` : ''}
                            ${skill.name}
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
  } catch (error) {
    console.error('Error loading skills:', error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // initializeTypewriter();
  loadExperience();
  loadProjects();
  loadSkills();
});

/**
 * Scroll Reveal Animation
 */

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // Only animate once
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in-up').forEach(el => {
  observer.observe(el);
});