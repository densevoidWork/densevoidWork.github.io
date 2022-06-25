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

    let mobileMenuSubmenu = document.querySelector('.middlebar .mobile-submenu');
    let mobileMenuButton = document.querySelector('.middlebar .hamburger-btn');
    let mobileMenuMainCategories = document.querySelectorAll('.middlebar .main-category.parent');
    let mobileSubmenuGrower = document.querySelector('.middlebar .mobile-submenu-grower');

    mobileMenuButton.addEventListener("click", function(event) {
        //console.log(mobileSubmenuGrower.querySelector(".mobile-submenu").clientHeight);

        let isOpened = mobileSubmenuGrower.classList.toggle("opened");

        if (isOpened) {
            let height = mobileSubmenuGrower.querySelector(".mobile-submenu").clientHeight;
            mobileSubmenuGrower.style.height = height + "px";
        }
        else {
            mobileSubmenuGrower.style.height = 0;
        }
        //toggleMobileMenuStatus();
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
        let categoriesListGrower = element.querySelector(".categories-list-grow");

        let elementHeight = element.querySelector(".categories-list").clientHeight;
        let containerHeight = mobileSubmenuGrower.querySelector(".mobile-submenu").clientHeight;

        if (isOpened) {
            mobileSubmenuGrower.style.height = containerHeight + elementHeight + "px";
            categoriesListGrower.style.height = elementHeight + "px";
        }
        else {
            mobileSubmenuGrower.style.height = containerHeight - elementHeight + "px";
            categoriesListGrower.style.height = 0;   
        }
    }

    /* SPORT PAGE CATEGORIES MENU */

    let sportMenuOpener = document.querySelector('.sport-menu .catalog-opener');
    
    if (sportMenuOpener != null) {
        sportMenuOpener.addEventListener("click", function(event) {
            let isOpened = sportMenuOpener.classList.toggle("opened");
            let menuGrower = sportMenuOpener.parentElement.querySelector(".menu-grower");

            if (menuGrower == null) return;

            if (isOpened) {
                let menu = menuGrower.querySelector(".menu-lines");
                if (menu != null)
                    menuGrower.style.height = menu.clientHeight + "px";
            }
            else {
                menuGrower.style.height = null;
            }
        });
    }

});

