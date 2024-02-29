const bot = require('../bots')
const Scene = require('node-vk-bot-api/lib/scene');
const Markup = require('node-vk-bot-api/lib/markup');
const knex = require('../../database');

const start = new Scene('/start',
  async (ctx) => {
    // const groups = await knex('groups.id_group').from('groups').whereNotIn('groups.id_group',
    //   knex.select('students.group').from('students').where('students.id_vk', ctx.message.peer_id))
    ctx.scene.next();
    ctx.reply('Hello! Select your group', null, Markup
      .keyboard(groups.map(group => group.group_name))
      .oneTime(),
    );
  },
  async (ctx) => {
    // let group = await knex('groups').where('group_name', ctx.message.text)
    // const student = await knex('students').where('id_vk', ctx.message.peer_id).join('groups', 'students.group', 'groups.id_group')

    ctx.scene.leave();
    if (group.length == 0) {
      ctx.reply('Wrong group! Please /start again and rechoose group.')
    } else {
      //add to database
      // if (student.length == 0) {
      //   await knex("students").insert({ id_vk: ctx.message.peer_id, group: group[0].id_group })
      //   ctx.reply(`Welcome to ${group[0].group_name}. /start again to change your group`)
      // } else {
      //   await knex('students').where('id_vk', ctx.message.peer_id).update({ group: group[0].id_group })
      //   ctx.reply(`You change to group ${ctx.message.text}`)
      // }
    }

  }
)


module.exports = start;