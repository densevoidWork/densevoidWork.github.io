let basketPage = document.querySelector('.basket-page');

if (basketPage) {
    let basketItemRows = basketPage.querySelectorAll('.content-table-body-row');
    basketItemRows.forEach(basketItemRow => {
        let deleteBut = basketItemRow.querySelector('.remove-from-basket');
        if (deleteBut) {
            deleteBut.addEventListener('click', function(e) {
                basketItemRow.addEventListener('transitionend', (transitionEndEvent) => {
                    if (transitionEndEvent.target == basketItemRow && transitionEndEvent.propertyName == 'opacity') {
                        basketItemRow.parentNode.removeChild(basketItemRow);
                    }
                }, true);
                basketItemRow.style.opacity = 0;
            });
        }
    });
}

let mainGoodElement = document.querySelectorAll('.main-good-block');

mainGoodElement.forEach(gallery => {
    let miniReviews = gallery.querySelector('.mini-reviews');
    let miniReviewsSlide = new Splide(miniReviews, {
        type: 'slide',            
        pagination: false,
        autoplay: false,
        perMove: 1,
        speed: 1000,
        drag: false,
        isNavigation: true,
        perPage: 5,
        fixedWidth: 100,
        direction: 'ttb',
        height: 480,
        breakpoints: {
            630: {
                direction: 'ltr',
                height: 'auto',
                width: 420,
                perPage: 4,
                gap: 5,
                fixedWidth: "",
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
    }); 

    let fullGoodImages = document.querySelector('.full-good-images');
    
    let fullGoodImagesSlide = new Splide(fullGoodImages, {
        type: 'slide',
        pagination: false,
        autoplay: false,
        perMove: 1,
        speed: 1000,
        drag: false,
        perPage: 1,
        lazyLoad: 'nearby',
        arrows: false
    });

    miniReviewsSlide.updateState = function() {
        const { Controller } = this.Components;
        let list = this.root.querySelector('.splide__list');
        if (list) {
            if (this.activeElement != null) {
                let lastActive = list.children[this.activeElement];
                if (lastActive) lastActive.classList.remove('active');
            }

            let element = list.children[Controller.getIndex()];
            element.classList.add('active');
            this.activeElement = Controller.getIndex();

            let arrowPrev = this.root.querySelector('.splide__arrow--prev');
            let arrowNext = this.root.querySelector('.splide__arrow--next');

            if (arrowPrev) arrowPrev.classList.remove('hiding');
            if (arrowNext) arrowNext.classList.remove('hiding');

            if (Controller.getIndex() == 0) {
                if (arrowPrev) arrowPrev.classList.add('hiding');
            }

            if (Controller.getIndex() == Controller.getEnd()) {
                if (arrowNext) arrowNext.classList.add('hiding');
            }
        }
    }

    miniReviewsSlide.on('ready', function () {
        miniReviewsSlide.updateState();            

        miniReviewsSlide.on('move', function () {
            miniReviewsSlide.updateState();
        });
    });

    fullGoodImagesSlide.sync(miniReviewsSlide);
    fullGoodImagesSlide.mount();
    miniReviewsSlide.mount();

    let colorLists = gallery.querySelectorAll('.color-list');
    colorLists.forEach(colorList => {            
        let colorPreviews = colorList.querySelectorAll('.color-preview');
        colorPreviews.forEach(colorPreview => {
            colorPreview.addEventListener('click', function(event) {
                colorPreviews.forEach(elementForRemoveSelection => {
                    elementForRemoveSelection.classList.remove('selected');
                });

                this.classList.add('selected');

                const { Controller } = miniReviewsSlide.Components;

                let forSlide = this.getAttribute('data-for-slide');
                if (forSlide != null) {
                    Controller.go(forSlide - 1);
                }
            });
        });
    });

    let sizesBlocks = gallery.querySelectorAll('.sizes-block');
    sizesBlocks.forEach(sizesBlock => {    
        let sizeButtons = sizesBlock.querySelectorAll('.size');
        sizeButtons.forEach(sizeButton => {
            sizeButton.addEventListener('click', function(e) {
                sizeButtons.forEach(but => but.classList.remove('selected'));
                sizeButton.classList.add('selected');
            });
        });
    });    
});


/* ZOOM IMAGE */

let zoomImages = document.querySelectorAll('.zoom-image');

zoomImages.forEach(zoomImage => {
    let isZoomed = false;        
    
    let isDragStarted = false;
    let currentDragLayerPos;
    let startDragClientPos;
    let dragOffset;

    //let zoomer = zoomImage.querySelector('.zoomer');

    let zoomer = document.createElement("div");
    zoomer.classList.add('zoomer');

    zoomImage.appendChild(zoomer);

    let padding = 50;
    let paddingRation;

    let mouseOutEvent = function(event) {
        setZoomMode(false);
    };

    let mouseMoveEvent = function(event) {
        if (!isDragStarted) {
            setPositionWithOffset(event.layerX, event.layerY);
        }
    };

    let touchStartEvent = function(event) {
        isDragStarted = true;

        startDragClientPos = {
            x: event.touches[0].clientX, 
            y: event.touches[0].clientY
        };

        dragOffset = {
            x: 0, 
            y: 0
        };
    };

    let touchMoveEvent = function(event) {
        event.preventDefault();

        dragOffset = {
            x: (startDragClientPos.x - event.touches[0].clientX) * (1 - paddingRation.x * 2), 
            y: (startDragClientPos.y - event.touches[0].clientY) * (1 - paddingRation.y * 2)
        };

        setPositionWithOffset(currentDragLayerPos.x + dragOffset.x, currentDragLayerPos.y + dragOffset.y);
    };

    let touchEndEvent = function(event) {
        isDragStarted = false;
        currentDragLayerPos = {x: currentDragLayerPos.x + dragOffset.x, y: currentDragLayerPos.y + dragOffset.y};
    };

    let scrollEvent = function(event) {
        event.preventDefault();
    };

    function setZoomMode(mode) {
        isZoomed = mode;

        if (isZoomed) {
            zoomImage.classList.add("zoomed");
            //zoomer.addEventListener('mouseleave', mouseOutEvent);
            //zoomer.addEventListener('mousemove', mouseMoveEvent);
            zoomer.addEventListener('touchstart', touchStartEvent);
            zoomer.addEventListener('touchend', touchEndEvent);
            zoomer.addEventListener('touchmove', touchMoveEvent);
            zoomer.addEventListener('wheel', scrollEvent);
        }            
        else {
            zoomImage.classList.remove("zoomed");                
            //zoomer.removeEventListener('mouseleave', mouseOutEvent);
            //zoomer.removeEventListener('mousemove', mouseMoveEvent);
            zoomer.removeEventListener('touchstart', touchStartEvent);
            zoomer.removeEventListener('touchend', touchEndEvent);
            zoomer.removeEventListener('touchmove', touchMoveEvent);
            zoomer.removeEventListener('wheel', scrollEvent);
        }
    }

    zoomImage.addEventListener('mouseup', function(event) {
        if (event.target.classList.contains('full-image')) {
            zoomer.style.backgroundImage = "url('" + event.target.currentSrc + "')"; 

            currentDragLayerPos = {x: zoomImage.clientWidth / 2, y: zoomImage.clientHeight / 2};
            setPositionToCenter();
            
            setZoomMode(true);
        }

        else if (event.target.classList.contains('zoomer')) {
            setZoomMode(false);
        };
    });
    
    function setPositionToCenter() {
        paddingRation = {x: padding / zoomImage.clientWidth, y: padding / zoomImage.clientHeight};
        zoomer.style.backgroundPosition = "50% 50%";
    }

    function setPositionWithOffset(layerX, layerY) {
        paddingRation = {x: padding / zoomImage.clientWidth, y: padding / zoomImage.clientHeight};

        let uvX = (layerX / zoomImage.clientWidth - 0.5) * 2;
        let uvY = (layerY / zoomImage.clientHeight - 0.5) * 2;

        let offsetX = (layerX - zoomImage.clientWidth / 2) + padding * uvX;
        let offsetY = (layerY - zoomImage.clientHeight / 2) + padding * uvY;

        zoomer.style.backgroundPosition = "calc(50% - " + offsetX + "px) " + "calc(50% - " + offsetY + "px)";
    }
});
let hidingButtons = document.querySelectorAll('[data-hide-button-for]');

hidingButtons.forEach(button => {
    button = document.querySelector('[data-hide-button-for="' + button.getAttribute('data-hide-button-for') + '"]');
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
        let elementHeight = getElementHeight(hidingElement);

        let parentHidingContainer = hidingContainer.parentElement.closest(".hiding-container");
        let isParentOpened = false;

        if (parentHidingContainer) {                
            isParentOpened= parentHidingContainer.classList.contains("opened");
        }

        if (isOpened) {
            hidingContainer.style.height = elementHeight + "px";
            if (isParentOpened) {
                parentHidingContainer.style.height = parentHidingContainer.firstChild.clientHeight + elementHeight + "px";
            }
        }
        else {
            hidingContainer.style.height = 0;  
            if (isParentOpened) {
                parentHidingContainer.style.height = (parentHidingContainer.firstChild.clientHeight - elementHeight) + "px"; 
            } 
        }            
    }

    function getElementHeight(el) {
        let elHeight = el.offsetHeight;
        elHeight += parseInt(
            window.getComputedStyle(el).getPropertyValue("margin-top")
        );
        elHeight += parseInt(
            window.getComputedStyle(el).getPropertyValue("margin-bottom")
        );

        return elHeight;
    }
});
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
        let holdArrowBut = function(event) {
            event.preventDefault();
            
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
        }

        arrow.addEventListener("mousedown", holdArrowBut);
        arrow.addEventListener("touchstart", holdArrowBut);
    });
    

    let isDragged = false;
    let prevPos = 0;

    let mouseDownByMouse = function(event) {
        mouseDown(event.clientX);
    }

    let mouseDownByTouch = function(event) {
        mouseDown(event.touches[0].clientX);
    }

    let mouseDown = function(clientX) {
        if (!isDragged) {
            prevPos = clientX;
        } 
        isDragged = true;
    };

    slideContainer.addEventListener("mousedown", mouseDownByMouse);
    slideContainer.addEventListener("touchstart", mouseDownByTouch);

    let mouseUp = function(event) {
        isDragged = false;
        isMoveRight = false;
        isMoveLeft = false;
        window.clearInterval(moveInterval);
    };
    
    window.addEventListener("mouseup", mouseUp);
    window.addEventListener("touchend", mouseUp);

    let moveElementByMouse = function(event) {
        moveElement(event.clientX);
    }

    let moveElementByTouch = function(event) {           
        moveElement(event.touches[0].clientX);
    }

    let moveElement = function(clientX) {

        let curPos = clientX;

        if (isDragged && prevPos != curPos) {
            currentOffset -= prevPos - curPos;
            prevPos = curPos;
            updateSlider(currentOffset);
        }
    }
    
    window.addEventListener("mousemove", moveElementByMouse);
    window.addEventListener("touchmove", moveElementByTouch);
    
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
/* DESKTOP SUB MENU */

let navbar = document.querySelector('.navbar');
if (navbar) {
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
}


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
if (basketButton) {
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
                    top: parentElement.offsetTop,
                    behavior: 'smooth'
                });
                /*
                window.scrollTo({
                    top: pages.offsetTop - window.innerHeight + pages.offsetHeight + bottomScrollMargin,
                    behavior: 'smooth'
                });
                */
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


let landingPage = document.querySelector('.langing-page');
if (landingPage) {
    let mainHero = landingPage.querySelector('.main-hero');
    if (mainHero) {
        let knowMore = landingPage.querySelector('.know-more');
        if (knowMore) {
            knowMore.addEventListener('click', (e) => {
                window.scrollTo({
                    top: mainHero.getBoundingClientRect().height,
                    behavior: 'smooth'
                });
            });
        }
    }
    
    let goodsGallery = document.querySelector( '.landing-goods-gallery' );
    new Splide(goodsGallery, {
        type: 'slide',
        //perPage: 6,
        gap: 18,
        width: 1560,
        fixedWidth: 245,
        autoplay: false,
        perMove: 1,
    }).mount(); 
}