# GitHub Action to Help Getting The Latest Release Info

Add this step in your workflow file

```yaml
- name: Get the latest release and send to slack web hook
  id: send_release_info_to_slack
  uses: dave-ohouse/action-latest-release-info@v0.0.1
  env:
    GITHUB_TOKEN: ${{ github.token }}
    SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

#### Example

```yaml
name: Build and Release

on:
  release:
    types:
      - released

env:
  GITHUB_TOKEN: ${{ github.token }}

jobs:
  build:
    name: Build and Release
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
      - uses: actions/checkout@v2

      - name: Build
      # TODO fill in with a step that builds something into ./dist/output.tar

      - name: Automatic release
      # TODO fill in with a step that automates the release process (i'm using semantic releaser)

      - name: Get the latest release and send to slack web hook
        id: send_release_info_to_slack
        uses: dave-ohouse/action-latest-release-info@v0.0.1
        env:
          GITHUB_TOKEN: ${{ github.token }}
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

## Credits

This repo was forked and modified.
original - https://github.com/marketplace/actions/get-the-upload-url-for-a-release
forked from - https://github.com/jossef/action-latest-release-info
