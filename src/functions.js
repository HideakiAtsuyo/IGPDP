const snekfetch = require('snekfetch'),
    chalk = require('chalk').default;

function argsChecker() {
    if (process.argv.length === 4) return true;
    if (process.argv.length <= 2) {
        console.log(chalk.red.underline('The option is missing!\n'));
    } else if (process.argv.length <= 3) {
        console.log(chalk.red.underline("The account's surname is missing!\n"));
    }
    usage();
    return false;
}

function usage() {
    console.log(chalk.red.underline(`
Usage: node ${process.argv0} <option> <username>
Example:
node ${process.argv0} -P hideakiatsuyo

=====Options:=====
-P or --picture | to download the profile's avatar
-I or --infos | to gather the profile's information
==================

If you're facing an issue, please, open a ticket: https://github.com/HideakiAtsuyo/IGPDP/issues`));
}

async function getUserData(username) {
    try {
        const userData = await snekfetch.get(`https://www.instagram.com/${username}?__a=1`).send();
        return userData.body.graphql.user;
    } catch (e) {
        throw e;
    }
}

function exit() {
    return process.exit(0);
}

module.exports = {
    argsChecker,
    usage,
    getUserData,
    exit,
}
