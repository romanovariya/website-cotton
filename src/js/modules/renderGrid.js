const renderGrid = () => {
    const gridItems = document.querySelector('#tshirt-grid') || document.querySelector('#polo-grid') || document.querySelector('#cap-grid') || document.querySelector('#wtshirt-grid') || document.querySelector('#hoodie-grid');
    let openedItem = {
        item: "", 
        color: ""
    }

    if(gridItems) {

        const main = document.querySelector('.main');
        main.addEventListener('click', e => {
            let target = e.target;
            
            if(target.closest('.item')) {
                target = target.closest('.item');

                const itemName = target.dataset.item;
                const itemColor = target.dataset.color;
                openedItem.item = itemName;
                openedItem.color = itemColor;
                window.localStorage.setItem('openedItem', JSON.stringify(openedItem));
            };
        });

    };
};

export default renderGrid;