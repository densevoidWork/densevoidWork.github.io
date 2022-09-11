document.addEventListener('DOMContentLoaded', function() { 

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
});