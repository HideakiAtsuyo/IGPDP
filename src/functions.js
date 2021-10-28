const https = require('https'),
    chalk = require('chalk').default,
    fs = require('fs');

/**
 *
 * @param {string} url The target URL to fetch
 * @param {object} headers The headers to send to the server
 */
function httpGet(
    url,
    headers = {
        'user-agent':
            'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
    }
) {
    return new Promise(function (resolve, reject) {
        const data = [];
        return https
            .get(url, { headers }, function (response) {
                response.on('data', function (chunk) {
                    data.push(chunk);
                });

                response.once('end', function () {
                    const rawData = Buffer.concat(data).toString();
                    return resolve({
                        text: rawData,
                        json: (function () {
                            try {
                                return JSON.parse(rawData);
                            } catch (_) {
                                return null;
                            }
                        })(),
                    });
                });
            })
            .on('error', reject);
    });
}

/**
 *
 * @param {string} text The text to print out.
 * @param {string} color The color to apply : red, yellow, orange, blue, green, etc...
 * @param {string} decoration The text decoration : bold, italic, etc...
 */
function prettyPrinter(text, color, decoration) {
    return console.log(chalk[color][decoration](text));
}

function argsChecker() {
    if (process.argv.length === 4) return true;
    if (process.argv.length <= 2) {
        prettyPrinter('The option is missing!\n', 'red', 'underline');
    } else if (process.argv.length <= 3) {
        prettyPrinter(
            "The account's surname is missing!\n",
            'red',
            'underline'
        );
    }
    usage();
    return false;
}

/**
 *
 * @param {string} url The PFP's URL.
 * @param {object} output The download output.
 */
function downloadProfilePicture(url, output) {
    return new Promise(function (resolve, reject) {
        https
            .get(url, function (data) {
                data.pipe(fs.createWriteStream(output)).on('close', resolve);
            })
            .on('error', reject);
    });
}

function usage() {
    console.log(
        chalk.red.underline(`
Usage: node ${process.argv[1]} <option> <username>
Example:
node ${process.argv[1]} -P hideakiatsuyo

=====Options:=====
-P or --picture | to download the profile's avatar
-I or --infos | to gather the profile's information
==================

If you're facing an issue, please, open a ticket: https://github.com/HideakiAtsuyo/IGPDP/issues`)
    );
}

async function getUserData(username) {
    try {
        const userData = (
            await httpGet(`https://www.instagram.com/${username}?__a=1`)
        ).json;
        return userData.graphql.user;
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
    prettyPrinter,
    downloadProfilePicture,
};
