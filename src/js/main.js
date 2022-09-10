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


    /* HIDING MENU */

    /*
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
    */


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
            let elementHeight = hidingElement.clientHeight;

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
    });


    /* GOOD SLIDES VIEWER */

    let goodPhotos = document.querySelectorAll('.good-photos');

    goodPhotos.forEach(gallery => {
        let miniReviews = gallery.querySelector('.mini-reviews');
        let miniReviewsSlide = new Splide( miniReviews, {
            type: 'slide',
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
        console.log(fullGoodImages);
        
        let fullGoodImagesSlide = new Splide( fullGoodImages, {
            type: 'slide',
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

        /*
        let slidesPreview = gallery.querySelectorAll('.photo-preview');
        let mainImage = gallery.querySelector('.good-selected-photo img');
        let zoomer = gallery.querySelector('.good-selected-photo  .zoomer');
        
        slidesPreview.forEach(preview => {
            preview.addEventListener('click', function(event) {
                let sourceSrc = preview.getAttribute('data-source-image');
                if (sourceSrc) {
                    mainImage.src = sourceSrc;
                    console.log(zoomer);
                    zoomer.style.backgroundImage = "url('" + sourceSrc + "')"; 
                }
            });
        });
        */
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
});