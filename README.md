# Legacy Audio Test GB

Minimal English (GB) Alexa-hosted skill for testing the legacy Display interface with AudioPlayer.

## Import

Create a Custom Alexa-Hosted (Node.js) skill in the EU region and choose **Import Skill**. Use the public `.git` URL of this repository.

The repository uses Amazon's hosted Git-import infrastructure format:

- `ask-resources.json` uses `@ask-cli/hosted-skill-deployer`
- Alexa provisions the endpoint, so `skill-package/skill.json` does not contain an endpoint URI
- code is under `lambda/`
- manifest and interaction model are under `skill-package/`

## Interfaces

- `AUDIO_PLAYER`
- `RENDER_TEMPLATE`

Invoke with: **Alexa, open legacy audio test**
