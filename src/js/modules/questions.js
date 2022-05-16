const questions = () => {
    const questions = document.querySelector('.questions');

    if(questions) {

        document.addEventListener('click', e => {
            const target = e.target;

            if (target.closest('.question__icon')) {
                const question = target.closest('.question');
                question.classList.toggle('question--active');
            }
        })
    };
};

export default questions;