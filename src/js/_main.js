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
        speed: 1000,
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


    /* SHOW NEWS */
    
    let newsBlocks = document.querySelectorAll('.news-preview-block');
    
    newsBlocks.forEach(newsBlock => {
        //newsBlock.style.height = newsBlock.clientHeight + "px";

        let newsElement = newsBlock.querySelector('.news-element');
        let showMoreBtn = newsBlock.querySelector('.show-more-btn');
        showMoreBtn.addEventListener('click', function(event) {
            //newsBlock.style.height = newsBlock.clientHeight + "px";
            //newsBlock.classList.toggle('showed-fully');
            //newsBlock.style.height = newsBlock.clientHeight + "px";
        });        
    });


    /* RADIO GROUP */

    let radioTabs = document.querySelectorAll('.radio-tabs');
    radioTabs.forEach(radioTab => {
        let radioButtons = radioTab.querySelectorAll('input[type=radio]');
        radioButtons.forEach(radioButton => {
            if (radioButton.checked == true) radioTab.dataset.selectedRadio = radioButton.id;;

            radioButton.addEventListener('click', function(event) {
                radioTab.dataset.selectedRadio = this.id;
            });
        })
    });


    /* COUNTER */

    let countersComponents = document.querySelectorAll('.counter-component');
    countersComponents.forEach(countersComponent => {
        let increaseButton = countersComponent.querySelector('.increase-count');
        let decreaseButton = countersComponent.querySelector('.decrease-count');
        let counter = countersComponent.querySelector('.counter');
        let counterValue  = counter.innerText;

        increaseButton.addEventListener('click', function(e) {
            counterValue++;
            counter.innerText = counterValue;
        });

        decreaseButton.addEventListener('click', function(e) {
            if (counterValue <= 1) return;
            counterValue--;
            counter.innerText = counterValue;
        });
    });

    /* MINI BASKET */

    let basketButton = document.querySelector('#basket-button');
    let miniBasketMenu = basketButton.querySelector('.mini-basket-menu');
    let closeButton = basketButton.querySelector('.mini-basket-later-button'); 
    let isMiniBasketMenuVisible = false;

    if (basketButton) {
        basketButton.addEventListener('click', function(event) {
            if (miniBasketMenu.contains(event.target) && event.target != closeButton) return;

            if (!isMiniBasketMenuVisible) {
                miniBasketMenu.style.setProperty('display', 'block');
            }
            else {
                miniBasketMenu.style.setProperty('display', 'none');
            }

            isMiniBasketMenuVisible = !isMiniBasketMenuVisible;
        });
    }
});