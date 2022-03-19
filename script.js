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

//Opciones btn 1-2-3-4
const opcion1 = document.getElementById('opcion_1');
const opcion2 = document.getElementById('opcion_2');
const opcion3 = document.getElementById('opcion_3');
const opcion4 = document.getElementById('opcion_4');

//Contenedores
const btnStart = document.getElementById('btn_start');
const container = document.getElementById('box_container');
const textDisplay = document.getElementById('texto');
const btnOptions = document.getElementById('btn_box');

//--------------------------------------------

function refreshIcons(){
    heart1.src = 'icons/heart.png';
    heart2.src = 'icons/heart.png';
    heart3.src = 'icons/heart.png';
    potion.src = 'icons/question_mark.png';
    sword.src = 'icons/question_mark.png';
    shield.src = 'icons/question_mark.png';
    armor.src = 'icons/question_mark.png';
    bow.src = 'icons/question_mark.png';
}

//STATE
let state = {};

//Items
let items = {};

//COMENZAR
function start(){
    btnStart.classList.add('hide');
    container.classList.remove('hide');
    document.body.style.height = '100%';
    refreshIcons();
    state = {};
    showTextNode(1);
}

//RESTART
function begin(){
    btnStart.classList.remove('hide');
    container.classList.add('hide');
    document.body.style.height = '100vh';
    state = {};
    showTextNode(1);
}

//MOSTRAR TEXTO 
function showTextNode(textNodeIndex){
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
    textDisplay.innerText = textNode.text;
    while(btnOptions.firstChild){
        btnOptions.removeChild(btnOptions.firstChild);
    }
    textNode.options.forEach(option => {
        if(showOption(option)){
            const button = document.createElement('button');
            button.innerText = option.text;
            button.classList.add('btn_opcion');
            button.addEventListener('click', () => selectOption(option));
            btnOptions.appendChild(button);
        }
    })
}

//VERIFICADOR DE STATE
function showOption(option){
    return option.requiredState == null || option.requiredState(state);
}

//OPCION ELGIDA
function selectOption(option){
    const nextTextNodeId = option.nextText;
    if(nextTextNodeId <= 0){
        return begin();
    }
    state = Object.assign(state, option.setState);
    
    
    showTextNode(nextTextNodeId);
    if(option.setState.potion == true){
        console.log('pocion')
        potion.src = 'icons/potion.png';
    }
    if(option.setState.sword == true && option.setState.potion == false){
        console.log('espada')
        potion.src = 'icons/question_mark.png';
        sword.src = 'icons/sword.png';
    }
    if(option.setState.shield == true){
        console.log('escudo')
        shield.src = 'icons/shield.png';
        potion.src = 'icons/question_mark.png';
    }
    if(option.setState.hit == true){
        console.log('hit')
        heart1.src = 'icons/empty_heart.png';
        heart2.src = 'icons/empty_heart.png';
        heart3.src = 'icons/empty_heart.png';
    }
}

//BTN START
btnStart.addEventListener('click', () => {
    start();
});

const textNodes = [
    {
        id: 1,
        text: 'te despiertas en un lugar extrano y ves un frasco con una sustancia de colores',
        options: [
            {
                text: 'lo tomas',
                setState: {potion: true},
                nextText: 2
            },
            {
                text: 'lo dejas',
                nextText: 10
            },
            {
                text: 'lo bebes',
                setState: {hit: true},
                nextText: 11
            }
        ]
    },
    {
        id: 2,
        text: 'tomas la pocion y te diriges al exterior. un buhonero salvaje aparece. "HELLO STRANGEEERRRR"',
        options: [
            {
                text: 'usar la pocion para una comprar espada',
                requiredState: (currentState) => currentState.potion,
                setState: {potion: false, sword: true},
                nextText: 3
            },
            {
                text: 'usar la pocion para comprar un escudo',
                requiredState: (currentState) => currentState.potion,
                setState: {potion: false, shield: true},
                nextText: 3
            },
            {
                text: 'lo ignoras',
                nextText: 3
            }
        ]
    },
    {
        id: 3,
        text: 'continuas caminando y ves un castillo a lo lejos',
        options: [
            {
                text: 'entrar',
                nextText: 4
            },
            {
                text: 'ver los alrededores',
                nextText: 4,
            }
        ]
    },
    {
        id: 4,
        text: 'continuara',
        options: [
            {
                text: 'volver',
                nextText: -1
            }
        ]
    },
    {
        id: 10,
        text: 'debiste tomarlo',
        options: [
            {
                text: 'volver',
                nextText: -1
            }
        ]
    },
    {
        id: 11,
        text: 'no debiste beberlo, te ha provocado un gran dolor',
        options: [
            {
                text: 'resignarte',
                setState: (currentState) => currentState.hit,
                nextText: 12
            }
        ]
    },
    {
        id: 12,
        text: 'mueres solo, llorando en un charco de tu propio vomito',
        options: [
            {
                text: 'volver',
                nextText: -1
            }
        ]
    }
]