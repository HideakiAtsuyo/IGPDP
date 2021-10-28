const {
    argsChecker,
    usage,
    getUserData,
    exit,
    prettyPrinter,
    downloadProfilePicture,
} = require('./functions');

async function main() {
    if (!argsChecker()) return null;

    const opt = process.argv[2],
        p = process.argv[3],
        user = await getUserData(p);

    console.clear();

    if (['-P', '--picture'].includes(opt)) {
        const avatarURL = user.profile_pic_url_hd,
            output = `${user.username}_${user.id}.jpg`;

        try {
            await downloadProfilePicture(avatarURL, output);
            prettyPrinter(
                `The ${user.username}'s avatar has been downloaded at ${output}!`,
                'blue',
                'italic'
            );
            setTimeout(exit, 2000, 'End');
        } catch (e) {
            throw e;
        }
    } else if (['-I', '--infos'].includes(opt)) {
        const is_private = user.is_private ? 'Yes' : 'No',
            is_verified = user.is_verified ? 'Yes' : 'No',
            is_joined_recently = user.is_joined_recently ? 'Yes' : 'No',
            is_business_account = user.is_business_account ? 'Yes' : 'No';

        prettyPrinter(
            `Username: ${user.username} || ID: ${user.id}\nFull name: ${
                user.full_name || 'No full name found'
            }\nDescription: \"${
                user.biography || 'No biography found'
            }\"\nFollowers: ${user.edge_followed_by.count}\nFollowing: ${
                user.edge_follow.count
            }\nPosts: ${
                user.edge_owner_to_timeline_media.count
            }\nIs private: ${is_private} || Is verified: ${is_verified}\nRecently joined: ${is_joined_recently} || Is a business account: ${is_business_account}`,
            'red',
            'bold'
        );
        setTimeout(exit, 2000, 'End');
    } else {
        usage();
    }
}

main();
