function game() { // c'est un peu le main() du jeu, cette fonction s'execute 60 fois par secondes (grâce au window.requestAnimationFrame()) 
    if(!gamepause) {

        if(key.right)
            nswitch.src = 'ressources/assets/switch_right.png'; // si j'appuie à gauche, on met l'image de la switch avec le boutton gauche enfoncé
        else if (key.left)
            nswitch.src = 'ressources/assets/switch_left.png'; // si j'appuie à droite, on met l'image de la switch avec le boutton droit enfoncé
        else
            nswitch.src = 'ressources/assets/switch.png'; // sinon on met l'image de la switch sans aucun enfoncé

        if(key.right && (barre.x+barre_speed < canvas.width-barre.width)) // si j'appuie sur 'd' et que ça ne sort pas la barre de la map
            barre.update_position(ctx, barre.x+barre_speed, barre.y); // je déplace la barre à droite
        else if(key.left && (barre.x-barre_speed > 0)) // même condition mais pour la gauche
            barre.update_position(ctx, barre.x-barre_speed, barre.y);
        else
            barre.update_position(ctx, barre.x, barre.y) // on réaffiche la barre, au cas ou un coin de balle efface un bout de celle-ci
    
        balls.forEach(function(ball, ball_index, ball_object) { // je fais un foreach de toutes les balles pour interragir avec
            if(ball.x >= canvas.width-ball.width) // si la balle touche le bord droit de la map
                ball.accelX = -2; // j'inverse son déplacement pour la faire "rebondir"
    
            else if(ball.x <= 0)
                ball.accelX = 2; // rebondit sur la gauche de la map
                
            else if(ball.y <= 0)
                ball.accelY = 2; // rebondit sur le haut de la map
    
            else if(ball.y-ball.height > canvas.height) { // si la balle sors du canvas (par en bas)
                ball.destroy(ctx); // supprime la balle visuellement
                ball_object.splice(ball_index, 1); // je la supprime du tableau des balles aussi (donc définitivement)
            }
            else if(barre.collide_with(ball)); // gère la collision entre la barre et la balle
            else {
                briques.forEach(function(brique, brique_index, brique_object) {
                    if(ball.collide_with(brique)) { // on teste si la balle est en collision ou non avec toutes les briques unes par unes
    
                        if(Math.random() < bonus_rate) { // xx pourcentage de passer cette condition, si on la passe, on créer un nouveau bonus
                            let bonus = new Bonus(brique.x, brique.y, 16, 16);
                            bonuss.push(bonus);
                            bonus.draw(ctx);
                        }
    
                        brique.destroy(ctx); // supprime la brique (visuellement) car elle a été touchée par la belle
                        brique_object.splice(brique_index, 1); // supprime la brique définitivement
                    }
                });
            }
    
            ball.update_position(ctx, ball.x+(ball.accelX), ball.y+(ball.accelY)); // quand on a tout défini, on actualise la position de la balle
        });
    
        bonuss.forEach(function(bonus, bonus_index, bonus_object) {
            if(bonus.collide_with(barre)) { // quand la barre touche un bonus, on créer une nouvelle balle qui part de la position du bonus
                balls.forEach(function(ball){
                    for (let i = 0; i < 3; i++) { // on va créer 3 balles autour de chaques balles
                        if(balls.length < max_balls) { // seulement si on ne dépasse pas la limite de 'max_balls' balles (200 par défaut)
                            let ball_temp= new Ball(ball.x, ball.y);
                            ball_temp.accelX = randomSpeed(); // fait partir la balle dans une direction aléatoire
                            ball_temp.accelY = randomSpeed();
                            ball_temp.draw(ctx);
                                
                            balls.push(ball_temp);
                        }
                    }
    
                });
    
                bonus.destroy(ctx); // et on détruit le bonus visuellement
                bonus_object.splice(bonus_index, 1); // et on l'enlève du tableau
            }
    
            else {
                briques.forEach(function(brique, brique_index, brique_object) {
                    if(bonus.collide_with(brique)) { // si un bonus touche une brique
                        brique.draw(ctx); // j'affiche la brique (sinon le bonus efface la brique en dessendant dessus)
                    }
                });
    
                bonus.update_position(ctx, bonus.x, bonus.y+2); // et on déplace le bonus vers le bas
            }
    
    
        });
    
        
    }
    if(balls.length == 0) { // s'il n'y a plus de balles, on a perdu
        pause(); // affiche le menu
        loose.currentTime = 0
        loose.play();
        init('Défaite !'); // réinitialise le jeu et affiche 'Défaite !' en haut du menu
    } 
    else if(briques.length == 0) { // s'il n'y a plus de briques, on a gagné
        win.currentTime = 0
        win.play();
        pause(); // affiche le menu
        init('Victoire !'); // réinitialise le jeu et affiche 'Victoire !' en haut du menu
    }
    else {
        animationframe = window.requestAnimationFrame(game); // sinon on boucle et le jeu continue
    }
}

window.onload = init;  // on initialise le jeu lors du premier chargement de la page