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

/* NAVIGATION */

let navigations = document.querySelectorAll('.navigation');
navigations.forEach(navigation => {
    let contentId = navigation.getAttribute('data-navigation-for');
    if (contentId == null) return;

    let parentElement = document.querySelector('#' + contentId);
    if (parentElement == null) return;

    let showMoreButton = navigation.querySelector('.show-more');
    if (showMoreButton) {
        showMoreButton.addEventListener('click', function(e) {
            let newContent = requestNewPageContent(parentElement);
            if (newContent == null) return;

            newContent.style.opacity = 0;
            parentElement.append(newContent);
            setTimeout(function() {
                newContent.style.opacity = 1;
            }, 500);
        });
    }

    let pages = navigation.querySelector('.pages');
    let currentPage = 5;
    let maxPage = 13;

    if (pages) {
        updatePageNavigation();
    }

    function updatePageNavigation() {
        pages.innerHTML = "";

        if (currentPage > 1) {
            let leftArrow = document.createElement("div");
            leftArrow.classList.add('left-arrow');
            leftArrow.innerText = '<';
            leftArrow.addEventListener('click', () => {
                changePage(currentPage - 1);
            })
            pages.append(leftArrow);
        }

        if (currentPage > 3) {
            pages.append(createPageButton(1));
        }

        if (currentPage > 4) {
            pages.append(createDots(createDots));
        }

        let minMiddleNumber = currentPage - 2;
        if (minMiddleNumber < 1) minMiddleNumber = 1;

        let maxMiddleNumber = currentPage + 2;
        if (maxMiddleNumber > maxPage) maxMiddleNumber = maxPage;

        for (let i = minMiddleNumber; i <= maxMiddleNumber; i++) {
            pages.append(createPageButton(i));
        }

        if (currentPage < maxPage - 3) {
            pages.append(createDots(createDots));
        }

        if (currentPage < maxPage - 2) {
            pages.append(createPageButton(maxPage));
        }

        if (currentPage < maxPage) {
            let rightArrow = document.createElement("div");
            rightArrow.classList.add('right-arrow');
            rightArrow.innerText = '>';
            rightArrow.addEventListener('click', () => {
                changePage(currentPage + 1);
            })
            pages.append(rightArrow);
        }
    }

    function changePage(pageNumber, callback) {
        pageNumber = Math.min(Math.max(pageNumber, 1), maxPage);
        currentPage = pageNumber;
        updatePageNavigation();
                
        let allPageContent = parentElement.querySelectorAll('.page-content');
        
        allPageContent.forEach(pageContent => {
            pageContent.style.opacity = 0;
        });

        let newContent = requestNewPageContent(parentElement);
        newContent.style.opacity = 0;

        if (allPageContent.length > 0) {
            allPageContent[0].addEventListener('transitionend', () => {
                parentElement.innerHTML = "";
                addNewContent(callback);
            });
        }
        else {
            addNewContent(callback);
        }

        function addNewContent(callback) {            
            parentElement.append(newContent);
            if (callback) callback(newContent);

            setTimeout(function() {
                newContent.style.opacity = 1;
            }, 500);
        }
    }

    function createPageButton(number) {
        let pageButton = document.createElement("div");
        pageButton.classList.add('page');
        if (number == currentPage) pageButton.classList.add('current');
        pageButton.id = 'page-number-' + number;
        pageButton.innerText = number;
        pageButton.addEventListener('click', () => {
            let screenYOffset = pages.getBoundingClientRect().top;
            changePage(number, () => {
                const bottomScrollMargin = 25;
                window.scrollTo({
                    top: pages.offsetTop - window.innerHeight + pages.offsetHeight + bottomScrollMargin,
                    behavior: 'smooth'
                  });
            });
        })
        return pageButton;
    }

    function createDots() {
        let dots = document.createElement("div");
        dots.classList.add('dots');
        dots.innerText = '...';
        return dots;
    }

    function requestNewPageContent(pageNumber) {
        let pageContent = parentElement.querySelector('.page-content');
        if (pageContent == null) return null;
    
        let newContent = pageContent.cloneNode(true);
        return newContent;
    }
});