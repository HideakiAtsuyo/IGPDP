const request = require ('request');
const snekfetch = require ('snekfetch');
const dl = require ('download-file');
const chalk = require('chalk');

if(process.argv.length <= 2) {
	console.log(chalk.red.underline("Utilisation: node igpdp.js <pseudo>\nExemple:\nnode igpdp.js ahbahjesuisfou"))
	process.exit(-1)
}
var p = process.argv[2];
var r6 = snekfetch['get']('https://www.instagram.com/' + p + '?__a=1');
r6.send().then(r => {
	if(`${r.body.graphql.user.is_private}` == true){
		var pv = "Oui";
		} else {
		var pv = "Non";
		}
		console.log(chalk.red.bold(`Nom: ${r.body.graphql.user.username} || ID: ${r.body.graphql.user.id}\nSurnom: ${r.body.graphql.user.full_name||"Aucun surnom"}\nDescription: \"${r.body.graphql.user.biography||"Aucune biographie"}\"\nAbonnés: ${r.body.graphql.user.edge_followed_by.count}\nAbonnements: ${r.body.graphql.user.edge_follow.count}\nPhotos&Vidéos: ${r.body.graphql.user.edge_owner_to_timeline_media.count}\nPrivé: ${pv}\n\nLien Photo de profile: \n${r.body.graphql.user.profile_pic_url_hd}`))

		var pdp = `${r.body.graphql.user.profile_pic_url_hd}`;
		var accpdp = {filename: `${process.argv[2]}_${r.body.graphql.user.id}.jpg`}
		dl(pdp, accpdp)
		console.log(chalk.blue.italic("\n\nPDP téléchargé!"))
})