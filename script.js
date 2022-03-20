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
    itemUsed(option);
}

function itemUsed(option){
    const itemSelected = option.setState;
    if (itemSelected == undefined) return console.log('volver');
    if (itemSelected.potion == true) {
        console.log('pocion')
        potion.src = 'icons/potion.png';
    }
    if (itemSelected.sword == true) {
        console.log('sword')
        sword.src = 'icons/sword.png';
        potion.src = 'icons/tick.png';
    }
    if (itemSelected.shield == true) {
        console.log('shield')
        shield.src = 'icons/shield.png';
        potion.src = 'icons/tick.png';
    }
    if (itemSelected.hit == true) {
        heart3.src = 'icons/empty_heart.png';
    } 
    if (itemSelected.doubleHit == true){
        heart3.src = 'icons/empty_heart.png';
        heart2.src = 'icons/empty_heart.png';
    }
    if (itemSelected.death == true) {
        console.log('shield')
        heart1.src = 'icons/empty_heart.png'
        heart2.src = 'icons/empty_heart.png'
        heart3.src = 'icons/empty_heart.png'
    }
    if(itemSelected.healed == true){
        console.log('curado')
        heart1.src = 'icons/heart.png'
        heart2.src = 'icons/heart.png'
        heart3.src = 'icons/heart.png'
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
                setState: {hit: true},
                nextText: 10
            },
            {
                text: 'lo bebes',
                setState: {death: true},
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
        text: 'te golpeas al intentar levantarte en la oscuridad',
        options: [
            {
                text: 'continuas herido',
                setState: (currentState) => currentState.hit,
                nextText: 13
            }
        ]
    },
    {
        id: 11,
        text: 'no debiste beberlo, te esta matando lentamente',
        options: [
            {
                text: 'resignarte',
                setState: (currentState) => currentState.death,
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
    },
    {
        id: 13,
        text: 'te encuentras herido, podrias seguir pero...',
        options: [
            {
                text: 'sigues...',
                setState: {doubleHit: true},
                nextText: 14
            }
        ]
    },
    {
        id: 14,
        text: 'te encuentras muy herido, intentas seguir pero...',
        options: [
            {
                text: 'si volviera a tomar esa pocion',
                requiredState: (currentState) => currentState.doubleHit,
                nextText: 16
            },
            {
                text: 'no puedo mas',
                nextText: 15
            }
        ]
    },
    {
        id: 15,
        text: 'hice lo que pude',
        options: [
            {
                text: 'volver',
                nextText: -1
            }
        ]
    },
    {
        id: 16,
        text: 'esto deberia ayudar',
        options: [
            {
                text: 'esta vez funcionara',
                setState: {healed: true},
                nextText: 17
            }
        ]
    },
    {
        id: 17,
        text: 'me he curado. Debo volver ahora que puedo',
        options: [
            {
                text: 'volver',
                requiredState: (currentState) => currentState.healed,
                nextText: -1
            }
        ]
    }
]
