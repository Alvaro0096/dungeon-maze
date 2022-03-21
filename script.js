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
const startContainer = document.getElementById('btn_start_container');
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
    startContainer.classList.add('hide');
    container.classList.remove('hide');
    refreshIcons();
    state = {};
    showTextNode(1);
}

//RESTART
function begin(){
    startContainer.classList.remove('hide');
    container.classList.add('hide');
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
        text: `Las luces danzan entre la oscuridad,
            haciendo un apogeo a estas tinieblas que
            quieren apoderarse de todo.
        
            Frente tuyo está el rey, con la mirada seria, rozando lo 
            solemne demostrando el nivel de la amenaza 
            que tienes por delante.`,
        options: [
            {
                text: 'Continuar.',
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: `A tu derecha está el príncipe, arrogante como siempre, 
        mirándote como si no fueses más que una mera herramienta.
        
        A tu izquierda está el bufón intentando hacer un truco de
        magia sacando pañuelos de su boca hasta que en
        un momento parece ahogarse con uno de ellos 
        “ese truco me tenía agarrado de la garganta”`,
        options: [
            {
                text: 'Opción rey: Consultas al Rey por cual es tu trabajo.',
                nextText: 3
            },
            {
                text: 'Opción príncipe: Consultas al príncipe si es él quien te contrato.',
                nextText: 3
            },
            {
                text: 'Opción bufón:*ries* y preguntas al bufón por qué hacer.',
                nextText: 3
            }
        ]
    },
    {
        id: 3,
        text: 'Continuara...',
        options: [
            {
                text: 'Volver',
                nextText: -1
            }
        ]
    }
]
