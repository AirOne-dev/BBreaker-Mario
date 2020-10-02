//=====================[ Events liés au menu + options ]=====================

slider_vitesse_barre.addEventListener('input', function(){
    text_vitesse_barre.innerHTML = 'Vitesse de la barre : ' + slider_vitesse_barre.value;
    barre_speed = slider_vitesse_barre.value*1; // *1 pour convertir le texte en int
});

slider_nb_max_balles.addEventListener('input', function(){
    text_nb_max_balles.innerHTML = 'Nombre max de balles : ' + slider_nb_max_balles.value;
    max_balls = slider_nb_max_balles.value*1; // *1 pour convertir le texte en int
});

slider_bonus_rate.addEventListener('input', function(){
    text_bonus_rate.innerHTML = 'Apparitions de bonus : ' + slider_bonus_rate.value + '%';
    bonus_rate = (slider_bonus_rate.value*1)/100;
});

option_type_map.addEventListener('change', function(){
    type_map = option_type_map.value;
    init('[Esc] Menu'); // je réinitialise le jeu vu que la map a été changée dans le <select>
});

pauseButton.addEventListener('click', function(){
    pause();
});

playbutton.addEventListener('click', function(){
    text_game_info.innerHTML = 'En pause';
    pause(); // vu que le jeu est en pause, la fonction le resume
});

restartbutton.addEventListener('click', function(){
    init('En pause'); 
    pause(); // annule la pause et fait disparaître le menu
})


//=====================[ Events liés au jeu ]=====================

window.addEventListener('resize', function(){
    init('En pause'); // je réinitialise le jeu et re-calcule la taille du canvas quand la fenêtre est redimensionée
});

window.addEventListener('keydown', function(event){ // défini mes variables de touche à true lorsque on appuie sur une touche
    if(event.code == 'KeyA' || event.code == 'ArrowLeft') { key.left = true; }
    if(event.code == 'KeyD' || event.code == 'ArrowRight') { key.right = true; }
    if(event.code == 'Escape') { text_game_info.innerHTML = 'En pause'; pause(); }
});
window.addEventListener('keyup', function(event){ // défini mes variables de touche à false lorsque on appuie sur une touche
    key.left = false;
    key.right = false;
});

canvas.addEventListener("touchstart", function(event){ // téléporte la barre ou on a touché, et check si elle ne dépasse pas les limites de la map
    if(event.touches[0].clientX+barre.width/2 >= canvas.width) {
        barre.update_position(ctx, canvas.width-barre.width, barre.y);
    }
    else if(event.touches[0].clientX-barre.width/2 <= 0) {
        barre.update_position(ctx, 0, barre.y);
    }
    else {
        barre.update_position(ctx, event.touches[0].clientX-barre.width/2, barre.y)
    }
});

canvas.addEventListener("touchmove", function(event){ // déplace la barre à la position du doigt quand on le glisse sur l'écran et check si elle ne dépasse pas les limites de la map
    event.preventDefault();
    
    let touches = event.changedTouches;
    
    for (var i=0; i<touches.length; i++) {
        if(touches[i].clientX+barre.width/2 >= canvas.width) {
            barre.update_position(ctx, canvas.width-barre.width, barre.y);
        }
        else if(touches[i].clientX-barre.width/2 <= 0) {
            barre.update_position(ctx, 0, barre.y);
        }
        else {
            barre.update_position(ctx, touches[i].clientX-barre.width/2, barre.y)
        }
    }
});
