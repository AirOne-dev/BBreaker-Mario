class Ball{
    constructor(x, y) { // constructeur classique
        this.x = x;
        this.y = y;
        this.width = 8;
        this.height = 8;
        this.accelX = randomSpeed(); // genere un random entre -2 et 2
        this.accelY = -2;
    }
    draw(context) { // méthode qui affiche la Balle à l'écran
        context.beginPath();
        context.drawImage(ball_texture, this.x, this.y);
    }
    update_position(context, newX, newY) { // méthode qui déplace la Balle à des coordonnées précises
        this.destroy(context); // efface la barre à la nouvelle position

        this.x = newX;
        this.y = newY;

        this.draw(context); // affiche la barre à la nouvelle position
    }
    collide_with(other){
        let ret = false; // variable de return
        let testCollision = collision(this, other);
        if(testCollision != 'none') {
            ret = true; // il y a une collision avec l'objet 'other', je return true

            if(testCollision == 'bottom') {
                this.accelY = 2;
            }
            else if(testCollision == 'top') {
                this.accelY = -2;
            }
            else if(testCollision == 'left') {
                this.accelX = -2;
            }
            else if(testCollision == 'right') {
                this.accelX = 2;
            }
        }
        return ret;
    }
    destroy(context) { // méthode qui efface la Balle de l'écran
        context.clearRect(this.x, this.y, 8, 8);
    }
}

class Brique{
    constructor(x, y, width, height) { // Constructeur classique
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = briques_textures[Math.floor(Math.random()*(3+1))];
    }
    draw(context) { // méthode qui affiche la Brique à l'écran
        context.beginPath();
        context.drawImage(this.image, this.x, this.y);
    }
    destroy(context) { // méthode qui efface la Brique de l'écran
        context.clearRect(this.x-1, this.y-1, this.width+2, this.height+1);
    }
    update_position(context, newX, newY) { // méthode qui déplace le bonus à des coordonnées précises
        this.destroy(context);
    
        this.x = newX;
        this.y = newY;
    
        this.draw(context); // affiche le bonus à la nouvelle position
    }
}

class Bonus extends Brique {
    constructor(x, y, width, height) {
        super(x, y, width, height); // je récupère le constructeur de la classe Brique
        this.image = bonusTexture;
    }
    destroy(context) { // méthode qui efface la Brique de l'écran
        context.clearRect(this.x, this.y, this.width, this.height);
    }
    collide_with(other){
        let ret = false; // variable de return
        if(collision(this, other) != 'none') {
            ret = true; // il y a une collision avec l'objet 'other', je return true   
        }
        return ret;
    }
}

class Barre extends Brique {
    constructor(x, y, width, height) {
        super(x, y, width, height); // je récupère le constructeur de la classe Brique
        
        this.briques = []; // une barre sera composé de x briques
        this.width = Math.round(width/16)*16+16; // on calcule la taille de la barre en fonction du nombre de briques qu'on peut mettre
        this.image = barreTexture; // on dis que la texture de la brique est celle de la barre
        
        for (let i = 0; i < this.width/16; i++) { // on va créer x briques qu'on va placer à côté pour faire une barre
            let brique = new Brique(this.x+i*16, this.y, 16, 16); // on créer une brique
            brique.image = this.image; // on met sa texture
            this.briques.push(brique); // on l'ajoute au tableau contenant toutes les briques de la barre
            
        }
    }
    draw(context) {
        this.briques.forEach(function(brique){ // on affiche toutes les briques qui sont dans le tableau
            context.beginPath();
            context.drawImage(brique.image, brique.x, brique.y);
        });
    }
    destroy(context) { // méthode qui efface la barre de l'écran
        context.clearRect(this.briques[0].x-1, this.briques[0].y-1, this.width+2, this.height+1);
    }
    update_position(context, newX, newY) { // méthode qui déplace le bonus à des coordonnées précises
        this.destroy(context); // pour update la position on efface la barre, puis on l'affiche aux nouvelles coordonnées

        for (let i = 0; i < this.briques.length; i++) { // on redéfini les positions des briques composant la barre
            this.briques[i].x = newX+i*16;
            this.briques[i].y = newY;
        }
    
        this.x = newX;
        this.y = newY;
    
        this.draw(context); // affiche le bonus à la nouvelle position
    }
    collide_with(other){
        let ret = false; // variable de return
        let testCollision = collision(other, this);
        if(testCollision != 'none') {
            ret = true; // il y a une collision avec l'objet 'other', je return true
            
            if(testCollision == 'bottom') {
                other.accelY = 2;
            }
            else if(testCollision == 'top') {
                other.accelY = -2;
            }
            else if(testCollision == 'left') {
                other.accelX = -2;
            }
            else if(testCollision == 'right') {
                other.accelX = 2;
            }
        }
        return ret;
    }

}