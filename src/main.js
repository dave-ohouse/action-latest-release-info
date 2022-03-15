const core = require("@actions/core");
const {GitHub, context} = require("@actions/github");

async function run() {
    try {
        let githubToken = process.env.GITHUB_TOKEN;
        const github = new GitHub(githubToken);

        const {owner, repo} = context.repo;
        const releaseInfo = await github.repos.getLatestRelease({
            owner,
            repo
        });

        let releaseId = releaseInfo.data.id.toString();
        let htmlUrl = releaseInfo.data.html_url;
        let tagName = releaseInfo.data.tag_name;
        let name = releaseInfo.data.name;
        let body = releaseInfo.data.body;

        console.log(`Got release info: '${name}', '${tagName}', '${releaseId}', '${htmlUrl}', ${body}`);

        core.setOutput("id", releaseId);
        core.setOutput("html_url", htmlUrl);
        core.setOutput("tag_name", tagName);
        core.setOutput("name", name);
        core.setOutput("body", body)


    } catch (error) {
        console.log(error);
        core.setFailed(error.message);
    }
}

if (require.main === module) {
    run();
}
