const btnStart = document.getElementById('btn_start');
const container = document.getElementById('box_container');

btnStart.addEventListener('click', () => {
    btnStart.classList.add('hide');
    container.classList.remove('hide');
    document.body.style.height = '100%';
})

const textoQuest = document.getElementById('texto');
const btnBox = document.getElementById('btn_box');
const btnOption = document.querySelectorAll('.btn_opcion');

//Corazones 1-2-3
let heart1 = document.getElementById('heart_1');
let heart2 = document.getElementById('heart_2');
let heart3 = document.getElementById('heart_3');

//Items 1-2-3-4-5
let potion = document.getElementById('item_potion');
let sword = document.getElementById('item_sword');
let shield = document.getElementById('item_shiel');
let armor = document.getElementById('item_armor');
let bow = document.getElementById('item_bow');


const opcion1 = document.getElementById('opcion_1');
const opcion2 = document.getElementById('opcion_2');
const opcion3 = document.getElementById('opcion_3');
const opcion4 = document.getElementById('opcion_4');

opcion1.addEventListener('click', () => {
    console.log('opcion 1')
    heart1.src = 'icons/empty_heart.png';
})
opcion2.addEventListener('click', () => {
    console.log('opcion 2')
    heart2.src = 'icons/empty_heart.png';
})
opcion3.addEventListener('click', () => {
    console.log('opcion 3')
    potion.src = 'icons/potion.png'
    sword.src = 'icons/sword.png'
})
opcion4.addEventListener('click', () => {
    console.log('opcion 4')
    shield.src = 'icons/shield.png'
    armor.src = 'icons/armor.png'
    bow.src = 'icons/bow.png'
})