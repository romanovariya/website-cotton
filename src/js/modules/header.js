const header = () => {
    const openMenu = document.querySelector('.nav'),
        menu = document.querySelector('.menu'),
        body = document.body,
        closeMenu = document.querySelector('.close');
    
    openMenu.addEventListener('click', () => {
        menu.classList.add('menu--active');
        body.classList.add('noscroll');
    });

    closeMenu.addEventListener('click', () => {
        menu.classList.remove('menu--active');
        body.classList.remove('noscroll');
    });

    document.addEventListener('click', e => {
        const target = e.target;

        if (target.closest('.menu__link')) {
            menu.classList.remove('menu--active');
            body.classList.remove('noscroll');
        }
    });
};

export default header;