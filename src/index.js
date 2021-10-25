const downloadFile = require('download-file'),
    chalk = require('chalk').default,
    { argsChecker, usage, getUserData, exit } = require('./functions');

async function main() {
    if (!argsChecker()) return null;

    const opt = process.argv[2],
        p = process.argv[3],
        user = await getUserData(p);

    console.clear()

    if (['-P', '--picture'].includes(opt)) {
        const pdp = user.profile_pic_url_hd,
            filename = `${user.username}_${user.id}.jpg`;

        downloadFile(pdp, { filename }, function () {
            console.log(chalk.blue.italic(`The ${user.username}'s avatar has been downloaded at ${filename}!`));
            setTimeout(exit, 2000, 'Fin');
        });
    } else if (['-I', '--infos'].includes(opt)) {
        const is_private = user.is_private ? 'Oui' : 'Non',
            is_verified = user.is_verified ? 'Oui' : 'Non',
            is_joined_recently = user.is_joined_recently ? 'Oui' : 'Non',
            is_business_account = user.is_business_account ? 'Oui' : 'Non';

        console.log(chalk.red.bold(`Username: ${user.username} || ID: ${user.id}\nFull name: ${user.full_name || 'No full name found'}\nDescription: \"${user.biography || 'No biography found'}\"\nFollowers: ${user.edge_followed_by.count}\nFollowing: ${user.edge_follow.count}\nPosts: ${user.edge_owner_to_timeline_media.count}\nIs private: ${is_private} || Is verified: ${is_verified}\nRecently joined: ${is_joined_recently} || Is a business account: ${is_business_account}`));
        setTimeout(exit, 2000, 'Fin');
    } else {
        usage()
    }
}

main()
