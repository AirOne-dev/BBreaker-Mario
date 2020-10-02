function collision(r1,r2){ // fonction qui retourne s'il y a une collision et d'ou elle vient
    let dx=(r1.x+r1.width/2)-(r2.x+r2.width/2);
    let dy=(r1.y+r1.height/2)-(r2.y+r2.height/2);
    let width=(r1.width+r2.width)/2;
    let height=(r1.height+r2.height)/2;
    let crossWidth=width*dy;
    let crossHeight=height*dx;
    let collision='none';

    if(Math.abs(dx)<=width && Math.abs(dy)<=height){
        if(crossWidth>crossHeight){
            collision=(crossWidth>(-crossHeight))?'bottom':'left';
        }else{
            collision=(crossWidth>-(crossHeight))?'right':'top';
        }
    }
    return(collision);
}

function randomSpeed() { // Cette fonction génère un nombre entre 1 et 2 ou un nombre entre -1 et -2
    let calcul = Math.round(Math.random());
    if(calcul == 0)
        return Math.random() * (2 - (1)) + (1);
    else    
        return Math.random() * (-2 - (-1)) + (-1);
}

function pause() { // fonction qui fait apparaitre ou non le menu lorsqu'elle est appelée
    if(gamepause) {
        gamemenu.style.opacity = 0; // dans le css, ja transition entre opacity 0 et 1 met 200ms à se faire
        pauseButton.src = 'ressources/assets/pause-button.svg'; // on change l'icone en haut à droite
        setTimeout(function() { // du coup je fait disparaitre le menu, et ensuite je met pause à false;
            gamepause = false;
            gamemenu.style.display = 'none';
            music.play() || music.resume();
        }, 200)
    }
    else {
        pauseButton.src = 'ressources/assets/play-button.svg';
        gamemenu.style.display = 'flex';
        gamemenu.style.opacity = 1;
        music.pause();
        gamepause = true;
    }
}
    
function init(info) { // Fonction qui initialise le jeu (prépare la taille du canvas, le nombre d'elements dedans, la position de la balle, ...)

    music.currentTime = 0; // on remet la musique à zéro
    
    lost_balls = 0;
    total_balls = 1;
    // text_score.innerHTML = 'Balles perdues : 0%';

    if(!(info instanceof Event)) { // lors de "window.onload = init;" (l.150) info est defini en tant qu'Event, on l'ignore juste 
        text_game_info.innerHTML = info; // Affiche en haut du menu pause : 'En pause' ou 'Victoire' ou 'Défaite'
        // if(!(info == 'Victoire !' || info == 'Défaite !'))
        //     text_score.innerHTML = 'Balles perdues : 0%';
    }
    
    
    if(window.innerWidth*1.75 < window.innerHeight) { // si la taille de la fenêtre s'approche de celle d'un smartphone
        canvas.width = window.innerWidth; // on met le jeu en plein écran
        canvas.height = window.innerHeight*0.9;
        canvas.style.transform = 'translateX(-50%)';
        canvas.style.top = 'unset';
        canvas.style.bottom = '0px';

        nswitch.style.display = 'none'; // on enlève l'overlay de nintendo switch
        slider_vitesse_barre.style.display = 'none'; 
        text_vitesse_barre.style.display = 'none'; // on enlève l'option 'vitesse de la barre' car on la dirige avec le tactile
        copyright.style.display = 'none'; // on enlève le copyright, parce que c'est moche en plein écran
        
        gamemenu.style.height = window.innerHeight + 'px'; // je redimensionne le menu en fonction de la taille du canvas
        gamemenu.style.width = window.innerWidth + 'px';

        text_score.style.top = '25px';
    }
    else {
        slider_vitesse_barre.style.display = 'unset'; 
        text_vitesse_barre.style.display = 'unset';

        nswitch.style.display = 'flex';
        nswitch.style.height = window.innerHeight + 'px'; // je redimensionne l'overlay de la switch en fonction de la taille de la fenêtre
        
        canvas.height = window.innerHeight*0.79; // je redimensionne le canvas en fonction de la taille de la fenêtre
        canvas.width = canvas.height/1.8;
        canvas.style.transform = 'translateX(-50%) translateY(-50%)';
        canvas.style.top = '50%';
        canvas.style.bottom = 'unset';

        copyright.style.display = 'unset';
        
        gamemenu.style.height = canvas.height + 'px'; // je redimensionne le menu en fonction de la taille du canvas
        gamemenu.style.width = canvas.width + 'px';

        text_score.style.top = '45px';
    }
    
    
    
    briques = []; 
    bonuss = []; // je dis que ces variables seront des arrays 
    balls = []; 
    
    barre = new Barre((canvas.width/2)-canvas.width/20, canvas.height-30, canvas.width/5, 16);
    barre.draw(ctx); // Je créer (et affiche) une nouvelle barre positionnée au centre en bas du canvas
    
    balls.push(new Ball(barre.x+barre.width/2, barre.y-15));
    balls[0].draw(ctx);
    
    
    generationMap(type_map);
    
    window.cancelAnimationFrame(animationframe); // je stope l'instance d'animationframe, sinon une deuxième va se lancer et tout va buguer
    game(); // je démarre le jeu
    
    document.querySelector('#loading').style.display = 'none'; // on enlève l'écran de chargement lorsque tout le script s'est executé une première fois
}

function generationMap(arg) {
    switch(arg) {
        case 'normale':
            for (let x = (canvas.width - (Math.floor(canvas.width/16)*16))/2; x <= canvas.width-16; x+=16) {
                for (let y = 0; y <= canvas.height/1.5; y+=16) {
                    let brique = new Brique(x, y, 16, 16);
                    brique.draw(ctx); // je créer des briques que je place (centrées) dans tous le canvas
                    briques.push(brique); // j'ajoute les briques dans le tableau briques
                }
            }
        break;

        case 'vague':
            for (let t = canvas.height/10; t < canvas.width-16; t+=16) {
                for (let x = (canvas.width - (Math.floor(canvas.width/16)*16))/2; x <= canvas.width-16; x+=16) {
                    let y =  t-Math.sin(x)*canvas.height/10;
                    let brique = new Brique(x, y, 16, 16);
                    brique.draw(ctx); // je créer des briques que je place (centrées) dans tous le canvas
                    briques.push(brique); // j'ajoute les briques dans le tableau briques
                }
            }
        break;

        case 'vagueInversee':
            for (let t = (canvas.width - (Math.floor(canvas.width/16)*16))/2; t <= canvas.width-16; t+=16) {
                for (let y = 0; y < canvas.height/1.5; y+=16) {
                    let x =  t-Math.sin(y)*canvas.height/5;
                    if(x < canvas.width-16 && x > (canvas.width - (Math.floor(canvas.width/16)*16))/2) {
                        let brique = new Brique(x, y, 16, 16);
                        brique.draw(ctx); // je créer des briques que je place (centrées) dans tous le canvas
                        briques.push(brique); // j'ajoute les briques dans le tableau briques
                    }
                }
            }
        break;

        case 'circle':
            var startX = canvas.width/2-8; 
            let startY = canvas.height*0.25;
            for (let r = 23; r < canvas.width/2-16; r+=18) {
                let step = 2*Math.PI/r*2.971;
                for(var theta=0;  theta < 2*Math.PI;  theta+=step) { 
                    let x = startX + r*Math.cos(theta);
                    let y = startY - r*Math.sin(theta);    //note 2.
                    let brique = new Brique(x, y, 16, 16);
                    brique.draw(ctx); // je créer des briques que je place (centrées) dans tous le canvas
                    briques.push(brique); // j'ajoute les briques dans le tableau briques
                }
            }
        break;

        case 'random':
            for (let x = (canvas.width - (Math.floor(canvas.width/16)*16))/2; x <= canvas.width-16; x+=16) {
                for (let y = 0; y <= canvas.height/1.5; y+=16) {
                    if(Math.floor(Math.random()*2) == 1) {
                        let brique = new Brique(x, y, 16, 16);
                        brique.draw(ctx); // je créer des briques que je place (centrées) dans tous le canvas
                        briques.push(brique); // j'ajoute les briques dans le tableau briques
                    }
                }
            }
        break;
    }
}