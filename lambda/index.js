'use strict';

// Legacy Audio Test — GB hosted-import test build 3
// Purpose: test whether a newly created skill with RENDER_TEMPLATE can reproduce
// the legacy Display-to-APL handoff used by older AudioPlayer skills.

const AUDIO_URL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
const COVER_URL = 'https://d2o906d8ln7ui1.cloudfront.net/images/BT2_Green.png';
const BACKGROUND_URL = 'https://d2o906d8ln7ui1.cloudfront.net/images/BT5_Background.png';

function emptyResponse() {
  return {
    version: '1.0',
    response: {}
  };
}

function stopResponse() {
  return {
    version: '1.0',
    response: {
      directives: [
        {
          type: 'AudioPlayer.Stop'
        }
      ],
      shouldEndSession: true
    }
  };
}

function playResponse() {
  const token = `legacy-audio-test-${Date.now()}`;

  return {
    version: '1.0',
    response: {
      outputSpeech: {
        type: 'PlainText',
        text: 'Playing the legacy display audio test.'
      },
      directives: [
        {
          type: 'Display.RenderTemplate',
          template: {
            type: 'BodyTemplate2',
            token: 'legacy-audio-test-screen',
            backButton: 'HIDDEN',
            title: 'Legacy Audio Test',
            backgroundImage: {
              contentDescription: 'Blue test background',
              sources: [
                {
                  url: BACKGROUND_URL
                }
              ]
            },
            image: {
              contentDescription: 'Test album artwork',
              sources: [
                {
                  url: COVER_URL
                }
              ]
            },
            textContent: {
              primaryText: {
                type: 'PlainText',
                text: 'Test Track'
              },
              secondaryText: {
                type: 'PlainText',
                text: 'Legacy Display plus AudioPlayer'
              },
              tertiaryText: {
                type: 'PlainText',
                text: 'English (GB) isolated test'
              }
            }
          }
        },
        {
          type: 'AudioPlayer.Play',
          playBehavior: 'REPLACE_ALL',
          audioItem: {
            stream: {
              token,
              url: AUDIO_URL,
              offsetInMilliseconds: 0
            }
          }
        }
      ],
      shouldEndSession: true
    }
  };
}

exports.handler = async function handler(event) {
  const request = event && event.request ? event.request : {};
  const requestType = request.type || '';
  const intentName = request.intent && request.intent.name ? request.intent.name : '';

  console.log(JSON.stringify({
    build: 'legacy-audio-test-gb-3-hosted-import',
    requestType,
    intentName,
    supportedInterfaces:
      event && event.context && event.context.System && event.context.System.device
        ? event.context.System.device.supportedInterfaces
        : {}
  }));

  if (requestType === 'LaunchRequest' || intentName === 'PlayTestIntent' || intentName === 'AMAZON.ResumeIntent') {
    return playResponse();
  }

  if (
    intentName === 'AMAZON.StopIntent' ||
    intentName === 'AMAZON.CancelIntent' ||
    intentName === 'AMAZON.PauseIntent'
  ) {
    return stopResponse();
  }

  if (requestType.startsWith('AudioPlayer.')) {
    return emptyResponse();
  }

  if (requestType === 'SessionEndedRequest') {
    return emptyResponse();
  }

  return {
    version: '1.0',
    response: {
      outputSpeech: {
        type: 'PlainText',
        text: 'Say play test.'
      },
      reprompt: {
        outputSpeech: {
          type: 'PlainText',
          text: 'Say play test.'
        }
      },
      shouldEndSession: false
    }
  };
};
