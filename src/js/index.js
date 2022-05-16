'use strict';
import header from './modules/header';
import questions from './modules/questions';
import slider from './modules/slider';
import renderGrid from './modules/renderGrid';
import cart from './modules/cart'



document.addEventListener('DOMContentLoaded', () => {
    header();
    questions();
    slider();
    renderGrid();
    cart();
});