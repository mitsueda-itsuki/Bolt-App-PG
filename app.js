require('dotenv').config()
const { App } = require('@slack/bolt');

// Initializes app with bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

const ga = `
　 （　・∀・）　　　|　|　ｶﾞｯ
　と　　　　）　 　 |　|
　　 Ｙ　/ノ　　　 人
　　　 /　）　 　 < 　>__Λ∩
　 ＿/し'　／／. Ｖ｀Д´）/ ←>>1
　（＿フ彡　　　　　 　　/
`

app.message('ぬるぽ', async ({ message, say }) => {
  await say(`${ga}`);
});

app.message('hello', async ({ message, say }) => {
  await say({
    blocks: [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `Hey there <@${message.user}>!`
        },
        "accessory": {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "Click Me"
          },
          "action_id": "button_click"
        }
      }
    ],
    text: `Hey there <@${message.user}>!`
  });
});

app.action('button_click', async ({ body, ack, say }) => {
  await ack();
  await say(`<@${body.user.id}> clicked the button`);
});

(async () => {
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();
