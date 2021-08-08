# owo what's this

This is a WIP of a game room server, not unlike what skribbl.io uses.

In this repo you can find the game room server in itself, and a very basic web interface showcasing basic functions.

Built with Restify

# How ?

Dependencies : Node

Dev dependencies : Nodemon, http-server


Install everything
> npm install

Run it
> npm run debug


---

## TODO

- Code d'erreur retour API + doc
- Config : donner le possibilité d'empecher un utilisateur d'être dans deux room d'un même jeu
- Service qui supprime les rooms vide après un certain temps
- Service qui expulse les utilisateurs inactifs
- Ajouter une notion de "Room ready" par rapport aux conditions du ruleset 
- Tests


