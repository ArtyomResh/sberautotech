const axios = require('axios');
const FormData = require('form-data');
const packagejson = require('../../../package.json');

const HUNTFLOW_API = process.env.HUNTFLOW_API || 'https://api.huntflow.ru';
const HUNTFLOW_TOKEN = process.env.HUNTFLOW_TOKEN;
const HUNTFLOW_ACCOUNT_ID = process.env.HUNTFLOW_ACCOUNT_ID || '83078'; // id компании с ХФ
const HUNTFLOW_SOURCE_ID = process.env.HUNTFLOW_SOURCE_ID || '331342'; // Сайт sberautotech.ru

const req = axios.create({
  baseURL: HUNTFLOW_API
});

req.defaults.headers.common['Authorization'] = `Bearer ${HUNTFLOW_TOKEN}`;
req.defaults.headers.common['User-Agent'] = `SberAutoTech/${packagejson.version}`;


module.exports = {
  async send(ctx) {
    const { acception, name, surname, email, direction, textarea, content, filename, vacancy, huntflowId } = ctx.request.body;

    try {
      const res = await strapi.plugins['email'].services.email.send({
        to: 'hr@sberautotech.ru',
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

    try {
      const buffer = Buffer.from(content.split(',')[1], 'base64');
      const form = new FormData();
      form.append('file', buffer, filename);

      const upload = await req.post(`/account/${HUNTFLOW_ACCOUNT_ID}/upload`, form,{
        headers: {
          ...form.getHeaders(),
          'X-File-Parse': true
        }
      });

      const {
        id,
        text,
        photo,
        fields: {
          position,
          email: dataEmail,
          salary,
          name: dataName,
          phones,
          birthdate
        }
      } = upload.data;

      const applicant = await req.post(`/account/${HUNTFLOW_ACCOUNT_ID}/applicants`, {
        last_name: dataName?.last ?? surname,
        first_name: dataName?.first ?? name,
        middle_name: dataName?.middle,
        phone: phones?.[0],
        email: dataEmail ?? email,
        position: position ?? direction,
        money: salary ?? '-',
        birthday_day: birthdate?.day,
        birthday_month: birthdate?.month,
        birthday_year: birthdate?.year,
        photo: photo?.id,
        externals: [{
          data: {
            body: text ?? textarea
          },
          auth_type: 'NATIVE',
          files: [{ id }],
          account_source: HUNTFLOW_SOURCE_ID
        }]
      });

      if (huntflowId && applicant?.data?.id) {
        await req.post(`/account/${HUNTFLOW_ACCOUNT_ID}/applicants/${applicant?.data?.id}/vacancy`, {
          vacancy: huntflowId,
          status: 117000,
          files: [{ id }]
        });
      }
    } catch (err) {
      console.error(err);
    }

    ctx.send();
  }
};
