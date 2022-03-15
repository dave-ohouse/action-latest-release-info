const core = require("@actions/core");
const {GitHub, context} = require("@actions/github");
const axios = require('axios').default;

async function run() {
    try {
        let githubToken = process.env.GITHUB_TOKEN;
        const github = new GitHub(githubToken);
        const webhookUrl = process.env.SLACK_WEBHOOK_URL

        const {owner, repo} = context.repo;
        const releaseInfo = await github.repos.getLatestRelease({
            owner,
            repo
        });

        let htmlUrl = releaseInfo.data.html_url;
        let tagName = releaseInfo.data.tag_name;
        let name = releaseInfo.data.name;
        let body = releaseInfo.data.body;

        console.log(`Got release info: '${name}', '${tagName}', '${htmlUrl}', ${body}`);

        axios.post(webhookUrl, {
            "release.body": body,
            "release.name": name,
            "release.tag_name": tagName,
            "html_url": htmlUrl
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
            core.setFailed(error.message);
        });
        
    } catch (error) {
        console.log(error);
        core.setFailed(error.message);
    }
}

if (require.main === module) {
    run();
}
