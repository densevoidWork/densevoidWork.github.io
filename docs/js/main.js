document.addEventListener('DOMContentLoaded', function(){ 

    /* DESKTOP SUB MENU */

    let navbar = document.querySelector('.navbar');
    let navbarSubmenu = document.querySelector('.navbar .navbar-submenu');
    let navbarElements = document.querySelectorAll('.navbar .navbar-element');

    navbarElements.forEach(element => {
        element.addEventListener("mouseenter", function(event) {
            navbarSubmenu.classList.add("opened");
        });
    });

    navbar.addEventListener("mouseleave", function(event) {
        navbarSubmenu.classList.remove("opened");
    });

    /* MOBILE SUB MENU */

    let mobileMenuSubmenu = document.querySelector('.mobile-menu .mobile-submenu');
    let mobileMenuButton = document.querySelector('.mobile-menu .hamburger-btn');
    let mobileMenuMainCategories = document.querySelectorAll('.mobile-menu .main-category.parent');

    mobileMenuButton.addEventListener("click", function(event) {
        toggleMobileMenuStatus();
    });

    mobileMenuMainCategories.forEach(element => {
        element.addEventListener("click", function(event) {
            openMainMobileCategory(element);
        });
    });

    function toggleMobileMenuStatus() {    
        let isMenuOpened = mobileMenuButton.classList.contains("opened");

        if (!isMenuOpened) {
            mobileMenuButton.classList.add("opened");
            mobileMenuSubmenu.classList.add("opened");
        }
        else {
            mobileMenuButton.classList.remove("opened");
            mobileMenuSubmenu.classList.remove("opened");
        }
    }

    function openMainMobileCategory(element) {
        let isOpened = element.classList.toggle("opened");

        if (isOpened) {
            let height = element.querySelector(".categories-list").clientHeight;
            element.querySelector(".categories-list-grow").style.height = height + "px";
        }
        else {
            element.querySelector(".categories-list-grow").style.height = 0;
        }
    }
});

