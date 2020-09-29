# BBreaker-Mario
#
[![N|Solid](https://i.ibb.co/x8h2Hqv/live.png)](https://erwan-martin.fr/js/BBreaker)

Brick Breaker game written in Javascrip

# Features :
- Il s'aggit d'un brick breaker classique, les règles ne changent pas : il faut déplacer sa barre pour essayer
  de faire tomber le moins de balles que possible.
    
- Pour se déplacer : ``[Q] et [D]`` ou ``[<] et [>]`` ou ``glisser sur l'écran tactile``
    
- Ajouté à cela, il y a de base 1 chance sur 3 (configurable dans le menu du jeu) qu'un bonus tombe lorsqu'une 
  balle casse une brique, ce bonus, une fois récupéré celui-ci fera apparaître trois balles autour de chaques
  balles déjà présentes. De base, la limite est de 200 balles (configurable dans le menu du jeu)
    
 - Dans le menu, l'utilisateur peu :
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
