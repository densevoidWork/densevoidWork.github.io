document.addEventListener('DOMContentLoaded', function() { 
    
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


    /* SPLIDE CAROUSEL */
    
    Splide.defaults = {
        type: 'loop',
        pagination: false,
        autoplay: false,
        perMove: 1,
        speed: 2000,
        drag: false,
    }

    let mediumGalleries = document.getElementsByClassName( 'medium-gallery' );
    for ( let i = 0; i < mediumGalleries.length; i++ ) {
        new Splide( mediumGalleries[ i ], {
            perPage: 7,
            breakpoints: {
                1200: {
                    perPage: 6,
                },
                1000: {
                    perPage: 5,
                },
                900: {
                    perPage: 4,
                },
                580: {
                    perPage: 3,
                },
                400: {
                    perPage: 2,
                },
                280: {
                    perPage: 1,
                },
            }
        }).mount();
    }

    let largeGalleries = document.getElementsByClassName( 'large-gallery' );
    for ( let i = 0; i < largeGalleries.length; i++ ) {
        new Splide( largeGalleries[i], {
            perPage: 3,
            breakpoints: {
                940: {
                    perPage: 2,
                },
                768: {
                    direction: 'ttb',
                    perPage: 3,
                    height: 440
                },
            },
        } ).mount(); 
    }

    let personalGalleries = document.getElementsByClassName( 'personal-gallery' );
    for ( let i = 0; i < personalGalleries.length; i++ ) {
        new Splide( personalGalleries[i], {
            perPage: 5,
            width: 525,
            direction: 'ttb',
            height: 480,
            breakpoints: {
                770: {
                    direction: 'ltr',
                    height: 'auto',
                    width: 315,
                    perPage: 3,
                },
                670: {
                    width: 210,
                    perPage: 2,
                },
                500: {
                    width: 420,
                    perPage: 4,
                },
                450: {
                    width: 315,
                    perPage: 3,
                },
                350: {
                    width: 210,
                    perPage: 2,
                },
            },
        } ).mount(); 
    }


    /* SLIDE TABLE */

    let slideTables = document.getElementsByClassName( 'slide-table' );

    for ( let i = 0; i < slideTables.length; i++ ) {
        let arrows = slideTables[i].querySelectorAll('.arrow');
        let slideContainer = slideTables[i].querySelector('.good-data-table-container');
        let containerWidth = slideContainer.offsetWidth;
        let containerMargins = parseInt(window.getComputedStyle(slideContainer).marginLeft, 10) + parseInt(window.getComputedStyle(slideContainer).marginRight, 10);
        let currentOffset = 0;

        let isMoveRight = false;
        let isMoveLeft = false;
        let moveInterval;

        updateSlider();

        arrows.forEach(arrow => {
            arrow.addEventListener("mousedown", function(event) {

                if (arrow.classList.contains('arrow-right')) {
                    isMoveRight = true;
                }
                else if (arrow.classList.contains('arrow-left')) {
                    isMoveLeft = true;
                }

                moveInterval = setInterval( function() {
                    const moveSpeed = 5;
                    if (isMoveRight) currentOffset -= moveSpeed;
                    else if (isMoveLeft) currentOffset += moveSpeed;
                    updateSlider();
                } , 10);
            });
        });
        

        let isDragged = false;
        let prevPos = 0;

        slideContainer.addEventListener("mousedown", function(event) {
            if (!isDragged) {
                prevPos = event.clientX;
            } 
            isDragged = true;
        });
        
        window.addEventListener("mouseup", function(event) {
            isDragged = false;
            isMoveRight = false;
            isMoveLeft = false;
            window.clearInterval(moveInterval);
        });
        
        window.addEventListener("mousemove", function(event) {
            let curPos = event.clientX;

            if (isDragged && prevPos != curPos) {
                currentOffset -= prevPos - curPos;
                prevPos = curPos;
                updateSlider(currentOffset);
            }
        });
        
        window.addEventListener("resize", function(event) {
            updateSlider();
        });

        function updateSlider() {   
            const maxOffset = containerWidth - slideTables[i].offsetWidth + containerMargins;

            currentOffset = Math.max(currentOffset, -maxOffset);
            currentOffset = Math.min(currentOffset, 0);

            slideContainer.style.transform = "translateX(" + currentOffset + "px)";
    
            let arrowRight = slideTables[i].querySelector('.arrow-right');
            let arrowLeft = slideTables[i].querySelector('.arrow-left');
    
            arrowRight.style.display = "flex";
            arrowLeft.style.display = "flex";
    
            if (currentOffset <= -maxOffset) arrowRight.style.display = "none"; 
            if (currentOffset >= 0) arrowLeft.style.display = "none"; 
        }
    }


    /* COMMON HIDING ELEMENT */

    let hidingButtons = document.querySelectorAll('[data-hide-button-for]');

    hidingButtons.forEach(button => {
        let idOfHidingElement = button.getAttribute("data-hide-button-for");
        let hidingElement = document.getElementById(idOfHidingElement);
        hidingElement.outerHTML = "<div class=\"hiding-container\">" + hidingElement.outerHTML + "</div>";
        hidingElement = document.getElementById(idOfHidingElement);
        let hidingContainer = hidingElement.parentElement;
        let isOpened = hidingContainer.classList.contains("opened");
        updateContainer();

        button.addEventListener("click", function(event) {
            isOpened = this.classList.toggle("opened");
            if (isOpened) hidingContainer.classList.add("opened");
            else hidingContainer.classList.remove("opened");
            updateContainer();
        });

        function updateContainer() {
            let elementHeight = hidingElement.clientHeight;

            if (isOpened) {
                hidingContainer.style.height = elementHeight + "px";
            }
            else {
                hidingContainer.style.height = 0;   
            }
        }
    });


    /* SHOW NEWS */
    
    let newsBlocks = document.querySelectorAll('.news-preview-block');
    
    newsBlocks.forEach(newsBlock => {
        //newsBlock.style.height = newsBlock.clientHeight + "px";

        let newsElement = newsBlock.querySelector('.news-element');
        console.log(newsElement);
        let showMoreBtn = newsBlock.querySelector('.show-more-btn');
        showMoreBtn.addEventListener('click', function(event) {
            //newsBlock.style.height = newsBlock.clientHeight + "px";
            //newsBlock.classList.toggle('showed-fully');
            //newsBlock.style.height = newsBlock.clientHeight + "px";
        });
    });
});