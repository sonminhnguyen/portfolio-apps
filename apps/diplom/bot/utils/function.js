const bot = require("../bots");
var path = require("path");
var FormData = require("form-data");
var fs = require("fs");
var axios = require("axios");

const uploadDoc = async (file) => {
  const url = await bot.execute("docs.getWallUploadServer", {
    group_id: process.env.GROUP_ID,
  });
  const filedir = path.join(__dirname, "..", "/uploads");
  const filename = path.join(__dirname, "..", "/uploads", file.originalname);

  var form = new FormData();
  form.append("file", fs.createReadStream(filename));

  const upload = await axios.post(url.upload_url, form, {
    headers: {
      ...form.getHeaders(),
    },
  });
  const save = await bot.execute("docs.save", {
    file: upload.data.file,
  });
  const URL_VK_files = save.type + save.doc.owner_id + "_" + save.doc.id;
  const URL_full = save.doc.url;
  return {
    URL_VK_files,
    URL_full,
  };

  // return URL_VK_files;
  //update data doc to database
  //   const uploadDB = {
  //     id_user: req.user.id_user,
  //     owner_id: save.doc.owner_id,
  //     id_doc: save.doc.id,
  //     title: save.doc.title,
  //     url: save.doc.url
  //   }
  //   await knex('uploads').insert({ ...uploadDB })

  //delete upload dir
  //   fs.readdir(filedir, (err, files) => {
  //     if (err) console.log(err);
  //     for (const file of files) {
  //         fs.unlink(path.join(filedir, file), err => {
  //             if (err) console.log(err);
  //         });
  //     }
  //   });
};

const sendMessage = async (data, files) => {
  
  // console.log(data);
  try {
    const { title, message, id_vk } = data;
    await bot.sendMessage([...id_vk], {
      // title: title,
      message: [title.toUpperCase() + "\n" + message].join(),
      random_id: Date.now(),
    });
  
    if (files) {
      let URL_VK_files = [];
  
      for (let i = 0; i < files.length; i++) {
        const res = await uploadDoc(files[i]);
        URL_VK_files.push(res.URL_VK_files);
      }
      for (let i = 0; i < files.length; i++) {
        await bot.sendMessage([...id_vk], {
          attachment: URL_VK_files[i].toString(),
          random_id: Date.now(),
        });
      }
    }
  } catch (e) {
    console.log("Bot send message error", e);
  }
};

const updateChild = async (files) => {
  let URL_full = [];

  for (let i = 0; i < files.length; i++) {
    const res = await uploadDoc(files[i]);
    URL_full.push(res.URL_full);
  }

  return URL_full;
};

const deleteDoc = async () => {
  const url = await bot.execute("docs.getWallUploadServer", {
    group_id: process.env.GROUP_ID,
  });
  // const filedir = path.join(__dirname, '..', '/uploads');
  // const filename = path.join(__dirname, '..', '/uploads', file.originalname);

  // var form = new FormData();
  // form.append('file', fs.createReadStream(filename));

  // const upload = await axios.post(url.upload_url, form, {
  //     headers: {
  //         ...form.getHeaders(),
  //     }
  // })
  // const save = await bot.execute('docs.delete', {
  //     file: upload.data.file,
  // })
  // console.log(url);
};

module.exports = {
  sendMessage,
  deleteDoc,
  updateChild,
};
