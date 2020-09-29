//=====================[ Variables liés au menu + options (visuel) ]=====================

let gamemenu = document.querySelector('#gamemenu'); // menu pause du jeu
let playbutton = document.querySelector('#playbutton'); // boutton 'jouer'
let restartbutton = document.querySelector('#restartbutton'); // boutton 'recommencer'

let slider_nb_max_balles = document.querySelector('#nbMaxBallesInput'); // slider 'Nombre max de balles'
let text_nb_max_balles = document.querySelector('#nbMaxBallesText'); // texte avant le slider

let slider_vitesse_barre = document.querySelector('#vitesseBarreInput'); // slider 'Vitesse du Barre'
let text_vitesse_barre = document.querySelector('#vitesseBarreText');

let slider_bonus_rate = document.querySelector('#bonusRateInput'); // slider 'Apparition de bonus'
let text_bonus_rate = document.querySelector('#bonusRateText');

let text_game_info = document.querySelector('#gamestate'); // texte qui affichera : 'Victoire' ou 'Défaite' ou 'En pause'

let option_type_map = document.querySelector('#generationMapOption');

let music = document.querySelectorAll('audio')[0];
let win = document.querySelectorAll('audio')[1];
let loose = document.querySelectorAll('audio')[2];

let pause_button = document.querySelector('#pauseButton');
let copyright = document.querySelector('#copyright');


//=====================[ Variables liés au jeu ]=====================

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let nswitch = document.querySelector('#nswitch'); // overlay de la nintendo switch

let barre; // variable dans laquelle sera stocké l'objet Barre
let briques = []; // array dans lequel il y aura les objets briques
let balls = []; // array dans lequel il y aura les balles
let bonuss = []; // array dans lequel il y aura les bonus

let key = {left: false, right: false};
let gamepause = true;

let max_balls = 200;
let barre_speed = 4;
let bonus_rate = 0.3; // 30% de chances de faire apparaitre un bonus
let type_map = 'normale';
let animationframe;


//=====================[ Variables liés aux textures ]=====================

let ball_texture = new Image(8, 8); ball_texture.src = 'ressources/assets/ball.png';
let barreTexture = new Image(16, 16); barreTexture.src = 'ressources/assets/barre.png';
let bonusTexture = new Image(16, 16); bonusTexture.src = 'ressources/assets/bonus.png';
let briques_textures = [];

for(let i = 0; i <= 3; i++) {
    briques_textures[i] = new Image(16, 16);
    briques_textures[i].src = 'ressources/assets/brique' + i + '.png';
}