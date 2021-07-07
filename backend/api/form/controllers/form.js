const { Readable } = require('stream');
const axios = require('axios');
const FormData = require('form-data');
const packagejson = require('../../../package.json');

const HUNTFLOW_API = process.env.HUNTFLOW_API || 'https://api.huntflow.ru';
const HUNTFLOW_TOKEN = process.env.HUNTFLOW_TOKEN || '';
const HUNTFLOW_ACCOUNT_ID = process.env.HUNTFLOW_ACCOUNT_ID || '83078'; // id компании с ХФ
const HUNTFLOW_SOURCE_ID = process.env.HUNTFLOW_SOURCE_ID || '331342'; // Сайт sberautotech.ru

const req = axios.create({
  baseURL: HUNTFLOW_API
});

req.defaults.headers.common['Authorization'] = `Bearer ${HUNTFLOW_TOKEN}`;
req.defaults.headers.common['User-Agent'] = `SberAutoTech/${packagejson.version}`;


module.exports = {
  async send(ctx) {
    const { acception, name, surname, email, direction, textarea, content, filename, vacancy } = ctx.request.body;

    /*
    try {
      const res = await strapi.plugins['email'].services.email.send({
        //TODO: Можно ли указать в strapi?
        to: 'hr_sat@sberbank.ru',
        subject: vacancy ? `Отклик: ${vacancy}` : 'Отклик не по конкретной вакансии',
        html: `
          <p>${name} ${surname} - ${email}</p>
          <p>Направление: ${direction}</p>
          <p>Опыт: ${textarea}</p>
        `,
        attachments: [{ filename, path: content }]
      });
    } catch (err) {
      console.error(err);
    }
    */

    try {
      const buffer = Buffer.from(content.split(',')[1], 'base64');
      const stream = Readable.from(buffer.toString());
      const form = new FormData();

      console.log('Stream: ', stream);

      form.append('file', stream, filename);

      console.log('FormHeaders: ', form.getHeaders());

      const upload = await req.post(`/account/${HUNTFLOW_ACCOUNT_ID}/upload`, form,{
        headers: {
          'content-type': 'multipart/form-data',
          'X-File-Parse': true
        }
      });

      console.log(upload.data);

      const {
        id,
        photo: { id: photo_id },
        fields: {
          position,
          email,
          salary,
          name: { middle, last, first },
          phones,
          birthdate: { month, day, year }
        }
      } = upload.data;

      const save = await req.post(`/account/${HUNTFLOW_ACCOUNT_ID}/applicants`, {
        data: {
          last_name: last ?? surname,
          first_name: first ?? name,
          middle_name: middle,
          phone: phones?.[0],
          email,
          position: position ?? direction,
          money: salary,
          birthday_day: day,
          birthday_month: month,
          birthday_year: year,
          photo: photo_id,
          externals: [{
            files: [{ id }],
            account_source: HUNTFLOW_SOURCE_ID
          }]
        }
      });

      console.log(save.data);

      ctx.send();
    } catch (err) {
      console.error(err);
      ctx.send(err);
    }

  }
};
