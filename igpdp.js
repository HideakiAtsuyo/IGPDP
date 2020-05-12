/////DÉPENDANCES/////
/////////////////////
const request = require ('request');
const snekfetch = require ('snekfetch');
const dl = require ('download-file');
const chalk = require('chalk');
/////////////////////

/////DES IF INUTILES CAR JE SUPPOSE QU'ON PEUT LE SIMPLIFIER/////
/////////////////////////////////////////////////////////////////
/*
if(process.argv.length <= 2) {
	utilisation()
}
if(process.argv.length <= 3) {
	utilisation()	
}
*/
verif();
/////////////////////////////////////////////////////////////////

/////VARIABLES/////
///////////////////
var opt = process.argv[2];
var p = process.argv[3];
///////////////////

/////CODE/////
//////////////
if(opt == "-P" || opt == "--picture"){
	cl()
	var r6 = snekfetch['get']('https://www.instagram.com/' + p + '?__a=1');
	r6.send().then(r => {
		var pdp = `${r.body.graphql.user.profile_pic_url_hd}`;
		var accpdp = {filename: `${r.body.graphql.user.username}_${r.body.graphql.user.id}.jpg`}
		dl(pdp, accpdp);
		console.log(chalk.blue.italic(`La pdp de ${r.body.graphql.user.username} a été téléchargée avec succès!`));
		setTimeout(stop, 2000, 'Fin');
	})
} else if(opt == "-I" || opt == "--infos"){
	cl();
	var r6 = snekfetch['get']('https://www.instagram.com/' + p + '?__a=1');
	r6.send().then(r => {
		if(`${r.body.graphql.user.is_private}` == true){var pv = "Oui";} else {var pv = "Non";}
		if(`${r.body.graphql.user.is_verified}` == true){var verif = "Oui";} else {var verif = "Non";}
		if(`${r.body.graphql.user.is_joined_recently}` == true){var rcc = "Oui";} else {var rcc = "Non";}
		if(`${r.body.graphql.user.is_business_account}` == true){var vbus = "Oui";} else {var vbus = "Non";}
		console.log(chalk.red.bold(`Nom: ${r.body.graphql.user.username} || ID: ${r.body.graphql.user.id}\nSurnom: ${r.body.graphql.user.full_name||"Aucun surnom"}\nDescription: \"${r.body.graphql.user.biography||"Aucune biographie"}\"\nAbonnés: ${r.body.graphql.user.edge_followed_by.count}\nAbonnements: ${r.body.graphql.user.edge_follow.count}\nPhotos&Vidéos: ${r.body.graphql.user.edge_owner_to_timeline_media.count}\nPrivé: ${pv} || Vérifié: ${verif}\nRejoint récemment: ${rrc} || Compte Business: ${vbus}`));
		setTimeout(stop, 2000, 'Fin');
	});
} else {
	cl();
	utilisation();
}
//////////////

/////FONCTIONS/////
///////////////////
function verif(){
if(process.argv.length <= 2) {
console.log(chalk.red.underline("Vous n'avez pas précisé d'option!\n\nUtilisation: node igpdp.js <option> <pseudo>\nExemple:\nnode igpdp.js -P ahbahjesuisfou\n\n=====Options:=====\n-P ou --picture pour télécharger une photo de profile\n-I ou --infos pour obtenir les informations d'un profile\n==================\n\nSi il y a un bug merci d'ouvrir une issue ici: https://github.com/HideakiAtsuyo/IGPDP/issues"));
stop();
} else if(process.argv.length <= 3) {
console.log(chalk.red.underline("Vous n'avez pas précisé de pseudo!\n\nUtilisation: node igpdp.js <option> <pseudo>\nExemple:\nnode igpdp.js -P ahbahjesuisfou\n\n=====Options:=====\n-P ou --picture pour télécharger une photo de profile\n-I ou --infos pour obtenir les informations d'un profile\n==================\n\nSi il y a un bug merci d'ouvrir une issue ici: https://github.com/Dany-LF/IGPDP/issues"));
stop();
}
}
function utilisation(){
console.log(chalk.red.underline("Utilisation: node igpdp.js <option> <pseudo>\nExemple:\nnode igpdp.js -P ahbahjesuisfou\n\n=====Options:=====\n-P ou --picture pour télécharger une photo de profile\n-I ou --infos pour obtenir les informations d'un profile\n==================\n\nSi il y a un bug merci d'ouvrir une issue ici: https://github.com/Dany-LF/IGPDP/issues"));
stop();
}
function stop(){
	process.exit(-1);
}
function cl(){
	console.clear();
}
///////////////////
