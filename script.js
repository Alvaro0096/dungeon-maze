const btn = document.getElementById('btn');

btn.addEventListener('click', () => {
    document.body.style.backgroundImage = 'url(images/dungeon_intro.jpg)';
    btn.classList.add('hide');
})