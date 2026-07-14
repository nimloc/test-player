# Legacy Audio Test GB

A minimal **English (GB)** Alexa-hosted test skill for comparing the legacy Display interface handoff used by older audio-player skills.

## Repository structure

```text
lambda/
  index.js
  package.json
skill-package/
  interactionModels/custom/en-GB.json
  skill.json
ask-resources.json
.gitignore
README.md
```

This is the **Alexa skill-package Git repository format**, not an exported-skill ZIP.

## Put this on GitHub

1. Create a new **public** GitHub repository. Do not add a README or licence on GitHub.
2. Extract the supplied ZIP locally.
3. Upload the extracted files and folders so that `lambda`, `skill-package`, and `ask-resources.json` are at the repository root.
4. Commit the upload.
5. Copy the repository's `.git` URL, for example:
   `https://github.com/YOUR-NAME/legacy-audio-test-gb.git`
6. In the Alexa Developer Console choose **Create Skill**:
   - Default language: **English (GB)**
   - Model: **Custom**
   - Hosting: **Alexa-Hosted (Node.js)**
   - Hosting region: **EU**
   - Template: **Import Skill**
7. Paste the public `.git` URL.

GitHub does not unpack an uploaded ZIP into repository files automatically. Extract this ZIP first and upload its contents.

## Test behaviour

On launch the test responds with:

- blocking spoken introduction;
- legacy `Display.RenderTemplate` using `BodyTemplate2`;
- metadata-free `AudioPlayer.Play` using `REPLACE_ALL`;
- explicit `shouldEndSession: true`.

Invocation name: **legacy audio test**

Try: **“Alexa, open legacy audio test.”**
