# BBreaker-Mario

Jeu du casse briques fait en Javascript

[![N|Solid](https://i.ibb.co/x8h2Hqv/live.png)](https://erwan-martin.fr/js/BBreaker)

## Foncitonnalités :
- Il s'aggit d'un brick breaker classique, les règles ne changent pas : il faut déplacer sa barre pour essayer
  de faire tomber le moins de balles que possible.
    
- Pour se déplacer : ``[Q] et [D]`` ou ``[<] et [>]`` ou ``glisser sur l'écran tactile``
    
- Ajouté à cela, il y a de base 1 chance sur 3 (configurable dans le menu du jeu) qu'un bonus tombe lorsqu'une 
  balle casse une brique, ce bonus, une fois récupéré celui-ci fera apparaître trois balles autour de chaques
  balles déjà présentes. De base, la limite est de 200 balles (configurable dans le menu du jeu)
    
 #### Dans le menu, l'utilisateur peu :
   - Lancer/reprendre sa partie (boutton : ``Jouer`` ou icone en haut à droite)
   - Recommencer une partie (boutton ``Recommencer``)
    
   - Choisir le nombre max de balles visibles à la fois
   - Choisir la vitesse de la barre (option uniquement disponible sur pc)
   - Choisir le pourcentafe de chance qu'un bonus apparaisse
   - Choisir la génération de la map
    
- Lorsque la fenêtre est redimensionnée, le jeu va recalculer la taille de la map et donc lancer une nouvelle
      partie
    
- Lorsque la fenêtre atteint un aspect ratio de smartphone, le jeu se met en plein écran (l'overlay de switch
  disparait, ainsi que l'option : 'vitesse de la barre').
  
## Foncitonnalités bonus :
- Le fait de cliquer sur un bouton de déplacement sur le clavier va appuyer (visuellement) sur un bouton de
    l'overlay de nintendo switch
  
- Présence de musiques en jeu, lors d'une victoire et lors d'une défaite

## Execution des scripts :
Dans l'ordre, le Javascript va :
        
  1 - Charger ``variables.js`` et toutes les variables nécéssaires au menu/jeu
    
  2 - Charger ``functions.js`` dans lequel il y a des fonctions utilisées par les 3 prochains fichiers
    
  2 - Charger ``eventsListeners`` et tous les events nécéssaires au menu/jeu
  
  3 - Charger ``class.js`` contenant les classes : Ball, Brique, Bonus et Barre
  
  4 - Enfin charger ``game.js`` ou se trouvent le jeu et la fonction d'initialisation de celui-ci
    
 J'ai décomposé ce jeu en plusieurs fichiers afins de pouvoir me repérer et coder plus facilement car je 
 code personellement très rarement sur des fichiers de plus de 200 lignes sans les avoir décomposés.
 
## Captures d'écran :

 #### Version ordinateur :
![Desktop](https://i.ibb.co/nPFHhR6/1.png)

 #### Version mobile :
![Mobile](https://i.ibb.co/gTG9cJW/2.png)
