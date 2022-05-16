const slider = () => {

        const slider = document.querySelector('.slider');
        if(slider) {
            const sliderControl = document.querySelector('.slider__control');

            if (sliderControl) {

                const arrowLeft = document.querySelector('.slider__arrow--left'),
                arrowRight = document.querySelector('.slider__arrow--right');
                const slides = document.querySelectorAll('.slider__item');
    
    
                arrowLeft.addEventListener('click', () => {
                    slides.forEach( elem => {
                        elem.classList.toggle('slider__item--active');
                    });
                });
    
                arrowRight.addEventListener('click', () => {
                    slides.forEach( elem => {
                        elem.classList.toggle('slider__item--active');
                    });
                });
    
    
                const product = document.querySelector('.product');
                const sliderItem1 = document.querySelectorAll('.slider__item')[0];
                const sliderItem2 = document.querySelectorAll('.slider__item')[1];
                const allColors = document.querySelectorAll('.colors__item');
                const allSizes = document.querySelectorAll('.sizes__item');
    
                const renderSlider = () => {
    
                    const currentItem = JSON.parse( window.localStorage.getItem('openedItem'));
                
                    sliderItem1.innerHTML = `<img src="images/${currentItem.item}/${currentItem.item}-${currentItem.color}-front.png" alt="" class="slider__img" />`;
                    sliderItem2.innerHTML = `<img src="images/${currentItem.item}/${currentItem.item}-${currentItem.color}-back.png" alt="" class="slider__img" />`;
    
                    const color = document.querySelector(`.colors__item--${currentItem.color}`);
                    color.classList.add('colors__item--active');
    
                };
    
                renderSlider();
    
                product.addEventListener('click', event => {
                    const target = event.target;
    
                    if(target.closest('.colors__item')) {
                        const color = target.id;
                        const item = target.closest('.card').id;
    
                        sliderItem1.innerHTML = `<img src="images/${item}/${item}-${color}-front.png" alt="" class="slider__img" />`;
                        sliderItem2.innerHTML = `<img src="images/${item}/${item}-${color}-back.png" alt="" class="slider__img" />`;
    
                        allColors.forEach( elem => {
                            elem.classList.remove('colors__item--active');
                        });
    
                        target.classList.add('colors__item--active');
                        const currentItem = { 
                            item: item,
                            color: color
                        }
                        window.localStorage.setItem('openedItem', JSON.stringify(currentItem));
                    } else if (target.closest('.sizes__item')) {
    
                        allSizes.forEach( elem => {
                            elem.classList.remove('sizes__item--active');
                        });
    
                        target.closest('.sizes__item').classList.add('sizes__item--active');
                    }
                })
            } else {
                const slide = document.querySelector('.slider__item');

                const product = document.querySelector('.product');
                const allColors = document.querySelectorAll('.colors__item');
                const allMaterials = document.querySelectorAll('.material__item');
                const allClasps = document.querySelectorAll('.clasp__item');

                const renderSlider = () => {
                    const currentItem = JSON.parse( window.localStorage.getItem('openedItem'));

                    slide.innerHTML = `<img src="images/${currentItem.item}/${currentItem.item}-${currentItem.color}.png" alt="" class="slider__img" />`;
                    const color = document.querySelector(`.colors__item--${currentItem.color}`);
                    color.classList.add('colors__item--active');
                };

                renderSlider();

                product.addEventListener('click', event => {
                    const target = event.target;

                    if(target.closest('.colors__item')) {
                        const color = target.id;
                        const item = target.closest('.card').id;

                        slide.innerHTML = `<img src="images/${item}/${item}-${color}.png" alt="" class="slider__img" />`;

                        allColors.forEach( elem => {
                            elem.classList.remove('colors__item--active');
                        });

                        target.classList.add('colors__item--active');

                        const currentItem = { 
                            item: item,
                            color: color
                        };

                        window.localStorage.setItem('openedItem', JSON.stringify(currentItem));

                    } else if (target.closest('.material__item')) {
                        allMaterials.forEach( elem => {
                            elem.classList.remove('material__item--active');
                        });

                        target.closest('.material__item').classList.add('material__item--active');
                    } else if (target.closest('.clasp__item')) {
                        allClasps.forEach( elem => {
                            elem.classList.remove('clasp__item--active');
                        });

                        target.closest('.clasp__item').classList.add('clasp__item--active');
                    };
                });
            };
        };
};

export default slider;