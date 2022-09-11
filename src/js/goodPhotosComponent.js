document.addEventListener('DOMContentLoaded', function() { 

    let goodPhotos = document.querySelectorAll('.good-photos');

    goodPhotos.forEach(gallery => {
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
        console.log(fullGoodImages);
        
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
});