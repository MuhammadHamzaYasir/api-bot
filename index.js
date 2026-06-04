const axios = require("axios");
require("dotenv").config({ path: "tokens.env" });


const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/mhy-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();

app.command("/mhy-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text:
`Available Commands:
/mhy-ping - Check bot latency
/mhy-catfact - Get a cat fact
/mhy-joke - get a joke
/mhy-dadjoke - gets ba dad joke
/mhy-fact - gats you a random fact
/mhy-humor - gets you a humours quote
mhy-inspire - gets you a inspirational code`
  });
});
 
app.command("/mhy-cat-fact", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://catfact.ninja/fact");
    await respond({ text: `Cat Fact:\n${response.data.fact}` });
  } catch (err) {
    await respond({ text: "Failed to fetch a cat fact." });
  }
});


app.command("/mhy-joke", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
    await respond({
      text:
`${response.data.setup}

${response.data.punchline}`
    });
  } catch (err) {
    await respond({ text: "Failed to fetch a joke." });
  }
});


app.command("/mhy-fact", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://api.api-ninjas.com/v1/facts", {
      headers: {
        "X-Api-Key": process.env.API_NINJAS_KEY || "YOUR_API_KEY"
      }
    });

    const fact = Array.isArray(response.data) && response.data.length
      ? response.data[0]
      : response.data;

    await respond({
      text: `${fact.fact}`
    });

  } catch (err) {
    console.error(err);
    await respond({ text: "Failed to fetch a random fact." });
  }
});

app.command("/mhy-dadjoke", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get(
      "https://api.api-ninjas.com/v1/dadjokes",
      {
        headers: {
        "X-Api-Key": process.env.API_NINJAS_KEY || "YOUR_API_KEY"
      }
      }
    );

    const joke = response.data[0];

    await respond({
      text: `${joke.joke}`
    });

  } catch (err) {
    await respond({ text: "Failed to fetch joke." });
  }
});


app.command("/mhy-humor", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://api.api-ninjas.com/v2/quotes?categories=humor",
      {
        headers: {
        "X-Api-Key": process.env.API_NINJAS_KEY || "YOUR_API_KEY"
      }
      }
    );

    const quote = response.data[0];

    await respond({
      text: `"${quote.quote}"`
    });

  } catch (err) {
  console.error(err.response?.data || err.message);
  await respond({ text: "Failed to fetch quote." });
}
});

app.command("/mhy-inspire", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get(
      "https://api.api-ninjas.com/v2/quotes?categories=inspirational",
      {
        headers: {
        "X-Api-Key": process.env.API_NINJAS_KEY || "YOUR_API_KEY"
      }
      }
    );

    const quote = response.data[0];

    await respond({
      text: `"${quote.quote}"`
    });

  } catch (err) {
  console.error(err.response?.data || err.message);
  await respond({ text: "Failed to fetch quote." });
}
});