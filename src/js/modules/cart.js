const cart = () => {

    const cartDOMElement = document.querySelector('.cart__block');

    // if(!cartDOMElement) {
    //     return;
    // }

    // cart - объеут корзины, парсим, если там что-то есть, если нет, создаем пустой объект
    let cart = JSON.parse(localStorage.getItem('cart')) || {};
    const cartItemsCounterDOMElement = document.querySelector('.cart__sum');
    const cartWrapperDOMElement = document.querySelector('.js-cart-wrapper');

    const renderCartItem = (data) => {
        
        const cartItemDOMElement = document.createElement('div');
        let cartItemTemplate = ''
        if(data.name === 'Бейсболка') {
            cartItemTemplate = `
                <img src="images/delete.png" alt="удалить" class="cart-item__delete">
                <div class="cart-item__left">
                <h3 class="cart-item__title">${data.name}</h3>
                <div class="cart-item__color">
                    Цвет: ${data.color}
                </div>
                <div class="cart-item__size">Материал: ${data.material}</div>
                <div class="cart-item__size">Застежка: ${data.clasp}</div>

                </div>
                <div class="cart-item__right">
                <div class="cart-item__controls">
                    <button class="cart-item__btn cart-item__btn--minus" type="button">-</button>
                    <div class="cart-item__quantity">${data.amount}</div>
                    <button class="cart-item__btn cart-item__btn--plus" type="button">+</button>
                </div>
                </div>
                <input type="hidden" name="${data.id}-Товар" value="${data.name}" />
                <input type="hidden" name="${data.id}-Количество" value="${data.amount}" />
                <input type="hidden" name="${data.id}-Материал" value="${data.material}" />
                <input type="hidden" name="${data.id}-Застежка" value="${data.clasp}" />
                <input type="hidden" name="${data.id}-Цвет" value="${data.color}" />
            `;
        } else if (data.name === 'Козырек на липучке') {
            cartItemTemplate = `
                <img src="images/delete.png" alt="удалить" class="cart-item__delete">
                <div class="cart-item__left">
                <h3 class="cart-item__title">${data.name}</h3>
                <div class="cart-item__color">
                    Цвет: ${data.color}
                </div>
                </div>
                <div class="cart-item__right">
                <div class="cart-item__controls">
                    <button class="cart-item__btn cart-item__btn--minus" type="button">-</button>
                    <div class="cart-item__quantity">${data.amount}</div>
                    <button class="cart-item__btn cart-item__btn--plus" type="button">+</button>
                </div>
                </div>
                <input type="hidden" name="${data.id}-Товар" value="${data.name}" />
                <input type="hidden" name="${data.id}-Количество" value="${data.amount}" />
                <input type="hidden" name="${data.id}-Цвет" value="${data.color}" />
            `;
        } else {
            cartItemTemplate = `
                <img src="images/delete.png" alt="удалить" class="cart-item__delete">
                <div class="cart-item__left">
                <h3 class="cart-item__title">${data.name}</h3>
                <div class="cart-item__color">
                    Цвет: ${data.color}
                </div>
                <div class="cart-item__size">Размер: ${data.size}</div>
                </div>
                <div class="cart-item__right">
                <div class="cart-item__controls">
                    <button class="cart-item__btn cart-item__btn--minus" type="button">-</button>
                    <div class="cart-item__quantity">${data.amount}</div>
                    <button class="cart-item__btn cart-item__btn--plus" type="button">+</button>
                </div>
                </div>
                <input type="hidden" name="${data.id}-Товар" value="${data.name}" />
                <input type="hidden" name="${data.id}-Количество" value="${data.amount}" />
                <input type="hidden" name="${data.id}-Размер" value="${data.size}" />
                <input type="hidden" name="${data.id}-Цвет" value="${data.color}" />
            `;
        }
        

        cartItemDOMElement.innerHTML = cartItemTemplate;
        cartItemDOMElement.classList.add('cart__item', 'cart-item')
        cartItemDOMElement.setAttribute('data-product-id', data.id)
        cartDOMElement.appendChild(cartItemDOMElement);
    }
    
    const updateQuantity = (id, quantity) => {
        const cartItemDOMElement = cartDOMElement.querySelector(`[data-product-id="${id}"]`);
        const cartItemQuantityDOMElement = cartItemDOMElement.querySelector('.cart-item__quantity');

        cart[id].amount = quantity;
        cartItemQuantityDOMElement.textContent = quantity;

        updateCart();
    };
    
    const decreaseQuantity = (id) => {
        const newQuantity = parseInt(cart[id].amount) - 1;
        
        if (newQuantity >= 1) {
            updateQuantity(id, newQuantity);
        };
        
    };

    const increaseQuantity = (id) => {
        const newQuantity = parseInt(cart[id].amount) + 1;

        updateQuantity(id, newQuantity);
        
    };

    const renderCart = () => {
        const ids = Object.keys(cart);
        ids.forEach((id) => renderCartItem(cart[id]));

    };

    // добавление эдемента в локалстор
    const saveCart = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    const updateCartTotalItemsCounter = () => {
        const totalAmount = Object.keys(cart).reduce((acc, id) => {
            const { amount } = cart[id];
            return acc + parseInt(amount);
        }, 0);

        if(cartItemsCounterDOMElement) {
            cartItemsCounterDOMElement.textContent = totalAmount;
        }

        return totalAmount;
    }

    // updatecart сначала считает итоговое количество
    // если ничего в корзине нет, вешает класс "корзина пуста", а если нет, то убирает его
    const updateCart = () => {

        const totalQuantity = updateCartTotalItemsCounter();
        saveCart();

        if (cartWrapperDOMElement) {
            if (totalQuantity == 0) {
                cartWrapperDOMElement.classList.add('is-empty');
            } else {
                cartWrapperDOMElement.classList.remove('is-empty');
            }
        }


    };

    //удаление элемента из корзины
    const deleteCartItem = (id) => {
        const cartItemDOMElement = cartDOMElement.querySelector(`[data-product-id="${id}"]`);


        cartDOMElement.removeChild(cartItemDOMElement);
        delete cart[id];

        updateCart();
    };

    // 3) получаем id из объекта с датой, добавляем в корзину товар под этим id
    // сохраняем корзину и делаем апдейт
    const addCartItem = (data) => {
        const { id } = data;
        cart[id] = data;
        saveCart(); // добавляем элемент в локалстор
        updateCart();
        // renderCartItem(data);
    }

    // получаем информацию о товаре
    const getProductData = (productDOMElement) => {
        const name = productDOMElement.querySelector('.product__name').getAttribute('data-product-name');
            if (name === 'Бейсболка') {
                const productDOMColor = productDOMElement.querySelector('.colors__item--active');
                const productDOMMaterial = productDOMElement.querySelector('.material__item--active');
                const productDOMClasp = productDOMElement.querySelector('.clasp__item--active');
                const color = productDOMColor.getAttribute('data-product-color');
                const material = productDOMMaterial.getAttribute('data-product-material');
                const clasp = productDOMClasp.getAttribute('data-product-clasp');
                const amount = productDOMElement.querySelector('.amount__quantity').textContent;
                const id = `${name}-${color}-${material}-${clasp}`;

                return { name, color, material, clasp, amount, id};
            } else if (name === 'Козырек на липучке') {
                const productDOMColor = productDOMElement.querySelector('.colors__item--active');
                const productDOMSlize = productDOMElement.querySelector('.sizes__item--active');
                const color = productDOMColor.getAttribute('data-product-color');
                const amount = productDOMElement.querySelector('.amount__quantity').textContent;
                const id = `${name}-${color}`;
    
                return { name, color, amount, id};
            } else {
                const productDOMColor = productDOMElement.querySelector('.colors__item--active');
                const productDOMSlize = productDOMElement.querySelector('.sizes__item--active');
                const color = productDOMColor.getAttribute('data-product-color');
                const size = productDOMSlize.getAttribute('data-product-size');
                const amount = productDOMElement.querySelector('.amount__quantity').textContent;
                const id = `${name}-${color}-${size}`;
    
                return { name, color, size, amount, id};
            }
    };

    const showNotify = (notifySelector, time) => {
        const notification = document.querySelector(`.${notifySelector}`);
        notification.classList.add(`${notifySelector}--active`);

        setTimeout(() => {
            notification.classList.remove(`${notifySelector}--active`);
        }, time);
    }


    // 1) На страничке товара при клике на добавить в козину получаем информвцию
    // о товаре, показываем уведомление и передаем ы addcartitem инфо о товаре

    const cardDOMElement = document.querySelector('.card');
    if(cardDOMElement) {
        const cartInit = () => {
            document.querySelector('.product__button').addEventListener('click', e => {
                e.preventDefault();
                const target = e.target;

                const productDOMElement = target.closest('.product');

                const data = getProductData(productDOMElement);
                addCartItem(data);
                
                showNotify('notification', 2000);
            });
        };

        cartInit();

    };



    if(cartDOMElement) {
        renderCart();
        updateCart();
    }

    const cartBlock = document.querySelector('.cart'),
    amount = document.querySelector('.amount');
    

    if(cartBlock) {

        // для страницы корзины
        cartBlock.addEventListener('click', event => {
            const target = event.target; 
            
            // при нажатии на + или - увеличиваем или уменьшаем число
            if(target.closest('.cart-item__btn')) {
                const itemControls = target.closest('.cart-item__controls'),
                    plus = itemControls.querySelector('.cart-item__btn--plus'),
                    minus = itemControls.querySelector('.cart-item__btn--minus');
                
                const cartItemDOMElement = target.closest('.cart-item');
                const productID = cartItemDOMElement.getAttribute('data-product-id');
                
                if(target === plus) {
                    increaseQuantity(productID);
                } else if(target === minus) {
                    decreaseQuantity(productID);
                };
            } else if (target.closest('.cart-item__delete')) {

                // если нажимаем на крестик, удаляется элемент
                const cartItemDOMElement = target.closest('.cart-item');
                const productID = cartItemDOMElement.getAttribute('data-product-id');

                deleteCartItem(productID);
            }
        });


        const form = document.querySelector('.cart__form');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let self = e.currentTarget;
            let formData = new FormData();
            let name = self.querySelector('[name="Имя"]').value;
            let mail = self.querySelector('[name="Почта"]').value;
            formData.append('Товары', JSON.stringify(cart));
            formData.append('Имя', name);
            formData.append('Почта', mail);

            let xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        console.log('Запрос отправлен');
                    }
                }
            }

            xhr.open('POST', 'php/send.php', true);
            xhr.send(formData);
            showNotify('success', 5000);
            cart = {};
            saveCart();
            updateCart();
            self.reset();
        });

    };

    if(amount) {
        amount.addEventListener('click', event => {

            const target = event.target; 

            if(target.closest('.amount__btn')) {
                const itemControls = target.closest('.amount'),
                    plus = itemControls.querySelector('.amount__btn--plus'),
                    minus = itemControls.querySelector('.amount__btn--minus');
                
                let quantity = itemControls.querySelector('.amount__quantity'),
                    quantityNum = parseInt(quantity.innerHTML);
                
                if(target === plus) {
                    quantityNum++;
                    quantity.innerHTML = `${quantityNum}`;
                } else if(target === minus) {
                    quantityNum--;
                    if(quantityNum < 0) {
                        quantityNum = 0;
                    }
                    quantity.innerHTML = `${quantityNum}`;
                }
            };

        });
    };
}

export default cart;