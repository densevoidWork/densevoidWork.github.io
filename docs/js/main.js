document.addEventListener('DOMContentLoaded', function(){ 
    
    /* DESKTOP SUB MENU */

    let navbar = document.querySelector('.navbar');
    let navbarSubmenu = document.querySelector('.navbar .navbar-submenu');
    let navbarParentElements = document.querySelectorAll('.navbar .navbar-element.parent');
    let navbarNotParentElements = document.querySelectorAll('.navbar .navbar-element:not(.parent)');

    navbarParentElements.forEach(element => {
        element.addEventListener("mouseenter", function(event) {
            navbarSubmenu.querySelector(".submenu-goods-categories").innerHTML = element.querySelector(".menu-categories").innerHTML;
            navbarSubmenu.classList.add("opened");
        });
    });

    navbar.addEventListener("mouseleave", function(event) {
        navbarSubmenu.classList.remove("opened");
    });

    navbarNotParentElements.forEach(element => {
        element.addEventListener("mouseenter", function(event) {
            navbarSubmenu.classList.remove("opened");
        });
    });


    /* MOBILE SUB MENU */

    let mobileMenuButton = document.querySelector('.middlebar .hamburger-btn');
    let mobileMenuMainCategories = document.querySelectorAll('.mobile-navbar .main-category.parent');
    let mobileSubmenuGrower = document.querySelector('.mobile-navbar .mobile-submenu-grower');

    mobileMenuButton.addEventListener("click", function(event) {
        let isOpened = toggleMobileMenuStatus();

        if (isOpened) {
            let height = mobileSubmenuGrower.querySelector(".mobile-submenu").clientHeight;
            mobileSubmenuGrower.style.height = height + "px";
        }
        else {
            mobileSubmenuGrower.style.height = 0;
        }
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
        }
        else {
            mobileMenuButton.classList.remove("opened");
        }

        return !isMenuOpened;
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



    /* HIDING MENU */

    let hidingMenus = document.querySelectorAll('.hiding-menu');

    hidingMenus.forEach(hideMenu => {
        let sportMenuOpener = hideMenu.querySelector('.catalog-opener');
        
        if (sportMenuOpener != null) {
            sportMenuOpener.addEventListener("click", function(event) {
                let isOpened = sportMenuOpener.classList.toggle("opened");
                let menuGrower = sportMenuOpener.parentElement.querySelector(".menu-grower");
    
                if (menuGrower == null) return;
    
                if (isOpened) {
                    let content = menuGrower.firstElementChild;
                    if (content != null)
                        menuGrower.style.height = content.clientHeight + "px";
                }
                else {
                    menuGrower.style.height = null;
                }
            });
        }
    });


    /* HIDING TEXT */

    let hidingTexts = document.querySelectorAll('.hiding-text');

    hidingTexts.forEach(hideText => {
        let hidingBox = hideText.querySelector('.hiding-box');
        let opener = hideText.querySelector('.open-btn');

        opener.addEventListener("click", function(event) {
            if(hideText.classList.toggle("opened")) {
                let height = hidingBox.querySelector(".text").clientHeight;
                hidingBox.style.height = height + "px";
            } else {
                hidingBox.style.height = null;
            }
        });
    });
});