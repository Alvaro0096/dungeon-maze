const btnStart = document.getElementById('btn_start');
const container = document.getElementById('box_container');

btnStart.addEventListener('click', () => {
    btnStart.classList.add('hide');
    container.classList.remove('hide');
})