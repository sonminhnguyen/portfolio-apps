const mock = [
    {
        id: 1,
        label: '/начинать',
        depth: 0,
        children: [
            {
                id: 101,
                label: '8191-21',
                depth: 1,
                answer: 'Это группа 8191-21',
                file: 'fileURL',
                idparent: 1,
            },
            {
                id: 102,
                label: '8191-22',
                depth: 1,
                answer: 'Это группа 8191-22',
                file: 'fileURL',
                idparent: 1,
            },
            {
                id: 103,
                label: '8191-31',
                depth: 1,
                answer: 'Это группа 8191-31',
                file: 'fileURL',
                idparent: 1,
            },
            {
                id: 104,
                label: '8191-11',
                depth: 1,
                answer: 'Это группа 8191-11',
                file: 'fileURL',
                idparent: 1,
            },
        ]
    },
    {
        id: 2,
        label: '/расписание',
        depth: 0,
        children: [
            {
                id: 201,
                label: '8191-21',
                depth: 1,
                answer: 'Это группа расписания 8191-21',
                file: '["https://vk.com/doc-207360925_651257834?hash=5yGqhPLOgDayjc8SKHTKfvNhDX4ER6n4rdhzQyI5d4w&dl=FUZDANZTGYYDSMRV:1671294148:kQ2s3XISVvfJBWtcWcMqk14ZIOUbzjdn9D3hNxm1yLc&api=1&no_preview=1"]',
                idparent: 2,
            },
            {
                id: 202,
                label: '8191-22',
                depth: 1,
                answer: 'Это группа расписания 8191-22',
                file: '["https://vk.com/doc-207360925_651257865?hash=ZS9xvPdrFblx8JqkAjKFTa9VNLNtnrpRWgZTdvzYEkg&dl=FUZDANZTGYYDSMRV:1671294167:p4ewqLgX3NUqkWlqxZWzMTHzFOQseDt37FjBcx2FQRc&api=1&no_preview=1"]',
                idparent: 2,
            },
            {
                id: 203,
                label: '8191-31',
                depth: 1,
                answer: 'Это группа расписания 8191-31',
                file: '["https://vk.com/doc-207360925_651258008?hash=ysfi2RZQkuwupk1uim7cI2fQX3Er5spDamxUZ5DQ9Zz&dl=FUZDANZTGYYDSMRV:1671294284:mapB8zCUzuixizJDIAoyY2S5IGZdQz5kaBpMO2fTgF0&api=1&no_preview=1"]',
                idparent: 2,
            },
            {
                id: 204,
                label: '8191-11',
                depth: 1,
                answer: 'Это группа расписания 8191-11',
                file: '["https://vk.com/doc-207360925_651258020?hash=tGYsg0KnE3FHVaoqbcSVC5Wy0zMxRUBRDA2V3feQQOk&dl=FUZDANZTGYYDSMRV:1671294291:A1qfFIvPioJh7QjmMSwEZ7Nl0DNnx3Ql6WRYEACrUyX&api=1&no_preview=1"]',
                idparent: 2,
            },
        ]
    },
    {
        id: 3,
        label: '/требовать',
        depth: 0,
        children: [
            {
                id: 301,
                label: 'Заявление',
                depth: 1,
                answer: "",
                file: 'fileURL',
                idparent: 3,
            },
            {
                id: 302,
                label: 'Результат',
                depth: 1,
                answer: '',
                file: 'fileURL',
                idparent: 3,
            },
            {
                id: 303,
                label: 'Договор',
                depth: 1,
                answer: '',
                file: 'fileURL',
                idparent: 3,
            },
        ]
    },
    {
        id: 4,
        label: '/документ',
        depth: 0,
        children: [
            {
                id: 401,
                label: 'Договор 1',
                depth: 1,
                answer: 'Это Договор 1',
                file: '["https://vk.com/doc-207360925_651258020?hash=tGYsg0KnE3FHVaoqbcSVC5Wy0zMxRUBRDA2V3feQQOk&dl=FUZDANZTGYYDSMRV:1671294291:A1qfFIvPioJh7QjmMSwEZ7Nl0DNnx3Ql6WRYEACrUyX&api=1&no_preview=1"]',
                idparent: 4,
            },
            {
                id: 402,
                label: 'Договор 2',
                depth: 1,
                answer: 'Это Договор 2',
                file: '["https://vk.com/doc-207360925_651258008?hash=ysfi2RZQkuwupk1uim7cI2fQX3Er5spDamxUZ5DQ9Zz&dl=FUZDANZTGYYDSMRV:1671294284:mapB8zCUzuixizJDIAoyY2S5IGZdQz5kaBpMO2fTgF0&api=1&no_preview=1"]',
                idparent: 4,
            },
            {
                id: 403,
                label: 'Договор 3',
                depth: 1,
                answer: 'Это Договор 3',
                file: '["https://vk.com/doc-207360925_651258020?hash=tGYsg0KnE3FHVaoqbcSVC5Wy0zMxRUBRDA2V3feQQOk&dl=FUZDANZTGYYDSMRV:1671294291:A1qfFIvPioJh7QjmMSwEZ7Nl0DNnx3Ql6WRYEACrUyX&api=1&no_preview=1"]',
                idparent: 4,
            },
        ]
    },
];

module.exports = { mock }