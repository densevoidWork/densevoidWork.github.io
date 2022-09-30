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