const bot = require("../bots");
const Scene = require("node-vk-bot-api/lib/scene");
const Markup = require("node-vk-bot-api/lib/markup");
const knex = require("../../database");
const { mock } = require("./mock");

let fixedScene = [];

const updateInfo = new Scene(
  "/обновитьданные",
  async (ctx) => {
    ctx.scene.next();
    ctx.reply(`Введите ваше имя: `);
  },
  async (ctx) => {
    ctx.scene.next();
    ctx.session.name = ctx.message.text;
    // const [group] = mock.filter(data => data.label === "/начинать");
    // ctx.reply('Привет! Выберите свою группу', null, Markup
    //     .keyboard(group.children.map(child => child.label))
    //     .oneTime(),
    // );
    const group = ["8191-21", "8191-22", "8191-31", "8191-11"];
    ctx.reply(
      "Привет! Выберите свою группу",
      null,
      Markup.keyboard(group.map((child) => child)).oneTime()
    );
  },
  async (ctx) => {
    ctx.scene.next();
    ctx.session.group = ctx.message.text;
    ctx.reply(`Введите свой курс: `);
  },
  async (ctx) => {
    ctx.scene.next();
    ctx.session.year = ctx.message.text;
    ctx.reply(`Введите свой телефон: `);
  },
  async (ctx) => {
    ctx.scene.next();
    ctx.session.telephone = ctx.message.text;

    ctx.reply(`Введите адрес электронной почты: `);
  },
  async (ctx) => {
    ctx.scene.leave();
    ctx.session.email = ctx.message.text;
    ctx.reply(`Добро пожаловать в группу ${ctx.session.group}`);
    try {
      await knex("students")
        .where({ id_vk: parseInt(ctx.message.peer_id) })
        .update({
          name: ctx.session.name,
          group: ctx.session.group,
          year: ctx.session.year,
          telephone: ctx.session.telephone,
          email: ctx.session.email,
        });
    } catch (error) {
      console.log(error);
    }
  }
);

const helpScene = new Scene("/помощь", async (ctx) => {
  ctx.scene.leave();
  ctx.reply(
    `/начинать - Начать использование бота\n/конец - Прекратить использование бота\n/помощь - Найти всех командных ботов\n/обновитьданные - обновить вашу информацию`
  );
});

fixedScene.push(helpScene);
fixedScene.push(updateInfo);

module.exports = fixedScene;
