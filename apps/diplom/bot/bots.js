require("dotenv").config();
const VkBot = require("node-vk-bot-api");
const Session = require("node-vk-bot-api/lib/session");
const Stage = require("node-vk-bot-api/lib/stage");
const Scene = require("node-vk-bot-api/lib/scene");
const Markup = require("node-vk-bot-api/lib/markup");
const knex = require("../database");
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 1;
const { mock } = require("./scene/mock");
const fixedScene = require("./scene/fixedScene");
const { createChangeableScene } = require("./scene/ChangeableScene");

const bot = new VkBot({
  token: process.env.TOKEN || "some token here",
});

// const session = new Session();
// const stage = new Stage(...fixedScene, ...ChangeableScene)

// bot.use(session.middleware());
// bot.use(stage.middleware());

createChangeableScene().then((ChangeableScece) => {
  const session = new Session();
  var stage = new Stage(...fixedScene, ...ChangeableScece);
  bot.use(session.middleware());
  bot.use(stage.middleware());
  // console.log(stage);
  ChangeableScece.forEach((command) => {
    bot.command(`${command.name}`, (ctx) => {
      ctx.scene.enter(`${command.name}`);
    });
  });
  fixedScene.forEach((command) => {
    bot.command(`${command.name}`, (ctx) => {
      ctx.scene.enter(`${command.name}`);
    });
  });
});

bot.command("/конец", async (ctx) => {
  await knex("students").where("id_vk", ctx.message.peer_id).del();
  ctx.reply("Спасибо за использование!");
});

bot.command("/checkid", async (ctx) => {
  ctx.reply(ctx.message.peer_id);
});

bot.startPolling((err) => {
  if (err) {
    console.error(err);
  }
});

module.exports = bot;
