const knex = require('../../database');

const mock = [
    {
        id: 1,
        label: '/start',
        depth: 0,
        children: [
            {
                id: 101,
                label: '8191-21',
                depth: 1,
                description: 'This is description',
                file: 'fileURL',
            },
            {
                id: 102,
                label: '8191-22',
                depth: 1,
                description: 'This is description',
                file: 'fileURL',
            },
            {
                id: 103,
                label: '8191-31',
                depth: 1,
                description: 'This is description',
                file: 'fileURL',
            },
            {
                id: 104,
                label: '8191-11',
                depth: 1,
                description: 'This is description',
                file: 'fileURL',
            },
        ]
    },
    {
        id: 2,
        label: '/require',
        depth: 0,
        children: [
            {
                id: 201,
                label: 'Заявление',
                depth: 1,
                description: 'This is Заявление 1',
                file: 'fileURL',
            },
            {
                id: 202,
                label: 'Результат',
                depth: 1,
                description: 'This is Заявление 2',
                file: 'fileURL',
            },
            {
                id: 203,
                label: 'Договор',
                depth: 1,
                description: 'This is Заявление 3',
                file: 'fileURL',
            },
        ]
    },
    {
        id: 3,
        label: '/document',
        depth: 0,
        children: [
            {
                id: 301,
                label: 'Договор 1',
                depth: 1,
                description: "",
                file: ["https://vk.com/doc-207360925_650805038?hash=3OzEWkZn4hqZlWl5bOtNHLByKo5MRzzeHRQJqEApG3X&dl=FUZDANZTGYYDSMRV:1670699857:QcexrQQZGMrui6iJWaHwzSjHThh8G9SpZ4yySAgTFJ0&api=1&no_preview=1"],
            },
            {
                id: 302,
                label: 'Договор 2',
                depth: 1,
                description: "",
                file: ["https://vk.com/doc-207360925_650805038?hash=3OzEWkZn4hqZlWl5bOtNHLByKo5MRzzeHRQJqEApG3X&dl=FUZDANZTGYYDSMRV:1670699857:QcexrQQZGMrui6iJWaHwzSjHThh8G9SpZ4yySAgTFJ0&api=1&no_preview=1"],
            },
            {
                id: 303,
                label: 'Договор 3',
                depth: 1,
                description: 'This is Договор 3',
                file: 'fileURL',
            },
        ]
    },
    {
        id: 4,
        label: '/schedule',
        depth: 0,
        children: [
            {
                id: 401,
                label: 'schedule 1',
                depth: 1,
                description: 'This is schedule 1',
                file: ["https://vk.com/doc-207360925_650805038?hash=3OzEWkZn4hqZlWl5bOtNHLByKo5MRzzeHRQJqEApG3X&dl=FUZDANZTGYYDSMRV:1670699857:QcexrQQZGMrui6iJWaHwzSjHThh8G9SpZ4yySAgTFJ0&api=1&no_preview=1"],
            },
            {
                id: 402,
                label: 'Договор 2',
                depth: 1,
                description: 'This is schedule 2',
                file: ["https://vk.com/doc-207360925_650805038?hash=3OzEWkZn4hqZlWl5bOtNHLByKo5MRzzeHRQJqEApG3X&dl=FUZDANZTGYYDSMRV:1670699857:QcexrQQZGMrui6iJWaHwzSjHThh8G9SpZ4yySAgTFJ0&api=1&no_preview=1"],
            },
            {
                id: 403,
                label: 'Договор 3',
                depth: 1,
                description: 'This is schedule 3',
                file: ["https://vk.com/doc-207360925_651258008?hash=ysfi2RZQkuwupk1uim7cI2fQX3Er5spDamxUZ5DQ9Zz&dl=FUZDANZTGYYDSMRV:1671294284:mapB8zCUzuixizJDIAoyY2S5IGZdQz5kaBpMO2fTgF0&api=1&no_preview=1"]
            },
        ]
    },
];

const createMock = async () => {
    const data = await knex.select("id", "label", "depth").table("commands");
    const newData = await Promise.all(data.map(async (data) => {
        const children = await knex.select("id", "label", "depth", "file", "answer").table("commandChildrens").where("idparent", data.id);
        // console.log({ ...data, children: children });
        // console.log(children[0].id);
        return { ...data, children: children }
    }))
    return newData;
    // const result = await Promise.all(newData);
    // return result;
    // const result = knex.select("id", "label", "depth").table("commands").then(commands => {
    //     data = commands.map(command => {
    //         return knex.select("id", "label", "depth", "file", "answer").table("commandchildrens").where("idparent", command.id).then(children => {
    //             return { ...command, children }
    //         })
    //     })
    //     console.log(data);
    //     return data;
    // })
    // console.log(result);
}

module.exports = { mock, createMock }
