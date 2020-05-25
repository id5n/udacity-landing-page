/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

// Grab the navigation menu `<ul>` that will be filled in with items later
const navBar = document.querySelector("#navbar__list");

// Grab the sections based on the element `section`
const sections = document.querySelectorAll("section");


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// Function that returns an array of section IDs
const getSectionId = () => {
    // Create an empty array to store the titles
    const idArr = [];
   
    // Use a loop to access and retrieve ID attributes for all of the section tags
    sections.forEach(function (section) {
        const sectionId = section.id;
        idArr.push(sectionId);
    });

    return idArr;
};


// Function that returns an array of section titles
const getSectionTitle = () => {
    // Create an empty array to store the titles
    const titleArr = [];

    // Use a loop to access and retrieve id attributes for all of the section tags
    sections.forEach(function (section) {
        const sectionTitleText = section.querySelector(".landing__section-title").textContent;
        titleArr.push(sectionTitleText);
    });

    return titleArr;
};


// Function that confirms whether an element is currently in within the active viewport
const elementViewport = (element) => {
    // Instantiate `getBoundingClientRect()` in order to confirm the boundary range of the element
    const sectionRange = element.getBoundingClientRect();
    
    // Return the element coordinates if true, and nothing if false
    return (
        sectionRange.top >= 0 &&
        sectionRange.left >= 0 &&
        sectionRange.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        sectionRange.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const navBuilder = () => {
    // Create a list of items for the navigation menu based on the section titles
    const navSection = getSectionTitle();

    // Loop through `section` tags and add anchor tags and list items to the unordered list
    for (let i = 0; i < sections.length; i++) {
        // Create an `<a>` tag and format it
        const a = document.createElement("a");
        // Add the `.menu__link` class to the `<a>` tag
        a.className = "menu__link";
        // Create a `<li>` tag and style it
        const li = document.createElement("li");
        li.innerHTML = navSection[i];
        a.id = `link${i + 1}`;
        // Add the `<a>` and `<li>` tags to the `<ul>` parent element
        navBar.appendChild(a).appendChild(li);
    }

    return navBar;
};
    

// Add class 'active' to section when near top of viewport
const activeSectionView = () => {
    const links = document.querySelectorAll("a");
    const linkItems = document.querySelectorAll("li");
    // Loop through each section in the `sections` array to run the `elementViewport` function for viewport confirmation
    for (let i = 0; i < sections.length; i++) {
        // Add the `active-section` class to the section and nav menu item if the section is within the viewport
        if (elementViewport(sections[i])) {
            sections[i].classList.add("active-section");
            links[i].classList.add("active-link");
            linkItems[i].classList.add("active-item");
        } else {
            // Remove all other `active-section` class attributes from the section and nav menu item not within the viewport
            sections[i].classList.remove("active-section");
            links[i].classList.remove("active-link");
            linkItems[i].classList.remove("active-item");
        }
    }
};


// Scroll to anchor ID using scrollIntoView event
const linkScroll = () => {
    // Grab the `<a>` tags
    const links = document.querySelectorAll("a");
    // Create an array of section ids for the navigation menu
    const navId = getSectionId();

    // Loop through `<a>` tags and section IDs for smooth scrolling to each section when nav link is clicked
    for (let i = 0; i < links.length; i++) {
        // Grab the link ID
        const linkId = document.querySelector(`#link${i + 1}`);
        // Grab the section ID
        const sectionId = document.querySelector(`#${navId[i]}`);
        // Use an event listener to confirm any clicks in the navigation menu
        linkId.addEventListener("click", (event) => {
            // Prevent default event from occurring
            event.preventDefault();
            // Enable the clicked section ID to scroll into the viewport smoothly
            sectionId.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        });
    }
};

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu
// const navMenu = navBuilder();
const navMenu = document.addEventListener("load", navBuilder());

// Scroll to section on link click
document.addEventListener("load", linkScroll());

// Set sections as active
window.addEventListener("scroll", (event) => {
    activeSectionView();
});









