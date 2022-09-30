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
