const axios = require('axios');
const FormData = require('form-data');
const packagejson = require('../../../package.json');

const HUNTFLOW_API = process.env.HUNTFLOW_API || 'https://api.huntflow.ru';
const HUNTFLOW_TOKEN = process.env.HUNTFLOW_TOKEN || '';
const HUNTFLOW_ACCOUNT_ID = process.env.HUNTFLOW_ACCOUNT_ID || '';

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
      const accounts = await req.get('/accounts');

      console.log('Accounts: ', accounts.data);
      const { items: account_items } = accounts.data;
      const account_id = account_items[0].id;

      const sources = await req.get(`/account/${account_id}/applicant/sources`);

      console.log('Sources: ', sources.data);
      const { items: source_items } = sources.data;
      const source_id = (source_items.filter((item) => /сайт/ig.test(item.name)))[0].id;

      const form = new FormData();
      form.append('file', content);

      console.log('FormHeaders: ', form.getHeaders());

      const upload = await req.post(`/account/${account_id}/upload`, form,{
        headers: {
          ...form.getHeaders(),
          'X-File-Parse': true
        }
      });

      console.log('File: ', upload.data);

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
            account_source: source_id
          }]
        }
      });

      console.log(save.data);
    } catch (err) {
      console.error(err);
    }

    ctx.send();
  }
};
