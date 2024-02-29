const Scene = require("node-vk-bot-api/lib/scene");
const Markup = require("node-vk-bot-api/lib/markup");
const knex = require("../../database");
const { mock, createMock } = require("./mock");

// // var ChangeableScene = [];
// const ChangeableScene = createMock().then((mock) => {
//   var ChangeableScene = [];
//   mock.forEach((command) => {
//     if (command.label === "/start") {
//     //   console.log(command);
//       ChangeableScene.push(
//         new Scene(
//           `${command.label}`, // This is /start command
//           async (ctx) => {
//             ctx.scene.next();
//             ctx.reply(`Enter your name: `);
//           },
//           async (ctx) => {
//             ctx.session.name = ctx.message.text;
//             ctx.scene.next();
//             ctx.reply(
//               "Hello! Select your group",
//               null,
//               Markup.keyboard(
//                 command.children.map((child) => child.label)
//               ).oneTime()
//             );
//           },
//           async (ctx) => {
//             ctx.scene.leave();
//             ctx.session.group = ctx.message.text;
//             ctx.reply(`Hello ${ctx.message.text}, Welcome to KSTU-Bot`);
//             try {
//               await knex("students").insert({
//                 name: ctx.session.name,
//                 id_vk: ctx.message.peer_id,
//                 group: ctx.session.group,
//               });
//             } catch (error) {
//               console.log(error);
//             }
//           }
//         )
//       );
//     } else if (command.label === "/require") {
//       ChangeableScene.push(
//         new Scene(
//           `${command.label}`,
//           async (ctx) => {
//             ctx.scene.next();
//             ctx.reply(
//               "Hello! Select type of require",
//               null,
//               Markup.keyboard(
//                 command.children.map((child) => child.label)
//               ).oneTime()
//             );
//           },
//           async (ctx) => {
//             ctx.session.event = ctx.message.text;
//             ctx.scene.next();
//             ctx.reply("Enter title: ");
//           },
//           async (ctx) => {
//             ctx.session.title = ctx.message.text;
//             ctx.scene.next();
//             ctx.reply("Enter Note: ");
//           },
//           async (ctx) => {
//             ctx.scene.leave();
//             ctx.session.note = ctx.message.text;
//             const user = await knex
//               .select()
//               .table("students")
//               .where({ id_vk: parseInt(ctx.message.peer_id) });
//             // console.log(user[0]);
//             const newRequire = {
//               event: ctx.session.event,
//               title: ctx.session.title,
//               name: user[0].name,
//               group: user[0].group,
//               id_vk: user[0].id_vk,
//               note: ctx.session.note,
//               solved: 0,
//             };
//             try {
//               await knex("requires").insert({ ...newRequire });
//             } catch (error) {
//               console.log(error);
//             }
//             ctx.reply("Your require have been sent. Have a nice day!");
//           }
//         )
//       );
//     } else {
//       ChangeableScene.push(
//         new Scene(
//           `${command.label}`,
//           async (ctx) => {
//             ctx.scene.next();
//             ctx.reply(
//               "Hello! Select document",
//               null,
//               Markup.keyboard(
//                 command.children.map((child) => child.label)
//               ).oneTime()
//             );
//           },
//           async (ctx) => {
//             ctx.scene.leave();
//             const reply = command.children.filter(
//               (child) => child.label === ctx.message.text
//             );
//             // console.log(reply[0].file);
//             reply[0].file.forEach((doc) => ctx.reply(doc));
//             // ctx.reply(`Here is your doc ${reply[0].file[0]}`);
//           }
//         )
//       );
//     }
//   });
//   return ChangeableScene;
// //   console.log(ChangeableScene);
// });

// console.log(ChangeableScene);

const createChangeableScene = async () => {
  const mock = await createMock();
  var ChangeableScene = [];
  mock.forEach((command) => {
    if (command.label === "/начинать") {
      //   console.log(command);
      ChangeableScene.push(
        new Scene(
          `${command.label}`, // This is /start command
          async (ctx) => {
            ctx.scene.next();
            ctx.reply(`Введите ваше имя: `);
          },
          async (ctx) => {
            ctx.session.name = ctx.message.text;
            ctx.scene.next();
            ctx.reply(
              "Привет! Выберите свою группу",
              null,
              Markup.keyboard(
                command.children.map((child) => child.label)
              ).oneTime()
            );
          },
          async (ctx) => {
            ctx.scene.leave();
            ctx.session.group = ctx.message.text;
            ctx.reply(
              `Привет ${ctx.message.text}, Добро пожаловать в KSTU-Bot`
            );
            try {
              await knex("students").insert({
                name: ctx.session.name,
                id_vk: ctx.message.peer_id,
                group: ctx.session.group,
              });
            } catch (error) {
              console.log(error);
            }
          }
        )
      );
    } else if (command.label === "/требовать") {
      ChangeableScene.push(
        new Scene(
          `${command.label}`,
          async (ctx) => {
            ctx.scene.next();
            ctx.reply(
              "Привет! Выберите тип запроса",
              null,
              Markup.keyboard(
                command.children.map((child) => child.label)
              ).oneTime()
            );
          },
          async (ctx) => {
            ctx.session.event = ctx.message.text;
            ctx.scene.next();
            ctx.reply("Введите название: ");
          },
          async (ctx) => {
            ctx.session.title = ctx.message.text;
            ctx.scene.next();
            ctx.reply("Введите примечание: ");
          },
          async (ctx) => {
            ctx.scene.leave();
            ctx.session.note = ctx.message.text;
            const user = await knex
              .select()
              .table("students")
              .where({ id_vk: parseInt(ctx.message.peer_id) });
            const id = await knex("requires").count("id");
            const newRequire = {
              id: parseInt(id[0].count) + 1,
              event: ctx.session.event,
              title: ctx.session.title,
              name: user[0].name,
              group: user[0].group,
              id_vk: user[0].id_vk,
              note: ctx.session.note,
              solved: "0",
            };
            console.log(newRequire);
            try {
              await knex("requires").insert({ ...newRequire });
            } catch (error) {
              console.log(error);
            }
            ctx.reply("Ваше требование было отправлено. Хорошего дня!");
          }
        )
      );
    } else {
      ChangeableScene.push(
        new Scene(
          `${command.label}`,
          async (ctx) => {
            ctx.scene.next();
            ctx.reply(
              "Привет! Выберите документ",
              null,
              Markup.keyboard(
                command.children.map((child) => child.label)
              ).oneTime()
            );
          },
          async (ctx) => {
            ctx.scene.leave();
            try {
              const reply = command.children.filter(
                (child) => child.label === ctx.message.text
              );
              const docs = JSON.parse(reply[0].file);
              docs.forEach((doc) => ctx.reply(doc));
              // ctx.reply(`Here is your doc ${reply[0].file[0]}`);
            } catch (e) {
              console.log("error from document Scene bot-vk", e);
            }
          }
        )
      );
    }
  });
  return ChangeableScene;
};

// createChangeableScene().then((data) => {
//   console.log(data);
// });

module.exports = { createChangeableScene };
// module.exports = ChangeableScene;
