const axios = require('axios');
const FormData = require('form-data');
const packagejson = require('../../../package.json');

const HUNTFLOW_API = process.env.HUNTFLOW_API || 'https://api.huntflow.ru/v2';
const HUNTFLOW_TOKEN = process.env.HUNTFLOW_TOKEN;
const HUNTFLOW_ACCOUNT_ID = process.env.HUNTFLOW_ACCOUNT_ID || '83078'; // id компании с ХФ
const HUNTFLOW_SOURCE_ID = process.env.HUNTFLOW_SOURCE_ID || '331342'; // Сайт sberautotech.ru

const huntflowClient = axios.create({
  baseURL: HUNTFLOW_API
});

huntflowClient.defaults.headers.common['Authorization'] = `Bearer ${HUNTFLOW_TOKEN}`;
huntflowClient.defaults.headers.common['User-Agent'] = `SberAutoTech/${packagejson.version}`;


module.exports = {
  /** @deprecated */
  async send(ctx) {
    const { name, surname, email, direction, textarea, content, filename, vacancy, huntflowId } = ctx.request.body;

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

      const upload = await huntflowClient.post(`/accounts/${HUNTFLOW_ACCOUNT_ID}/upload`, form, {
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

      const applicant = await huntflowClient.post(`/accounts/${HUNTFLOW_ACCOUNT_ID}/applicants`, {
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
        await huntflowClient.post(`/accounts/${HUNTFLOW_ACCOUNT_ID}/applicants/${applicant?.data?.id}/vacancy`, {
          vacancy: huntflowId,
          status: 117000,
          files: [{ id }]
        });
      }
    } catch (err) {
      console.error(err);
    }
    ctx.send();
  },

  async vacancy(ctx) {
    const { name, surname, email, direction, textarea, telephone, content, filename, vacancy, huntflowId } = ctx.request.body;

    try {
      await strapi.plugins['email'].services.email.send({
        to: 'hr@sberautotech.ru',
        subject: vacancy ? `Отклик: ${vacancy}` : 'Отклик не по конкретной вакансии',
        html: `
          <p>${name} ${surname} - ${email}</p>
          <p>О себе: ${textarea}</p>
          <p>Телефон: ${telephone}</p>
        `,
        attachments: content ? [{ filename, path: content }] : []
      });

    } catch (err) {
      console.log('SendEmail error', err)
    }

    try {
      const parseFileData = async () => {
        if (!content) {
          return {}
        }

        const buffer = Buffer.from(file.split(',')[1], 'base64');
        const form = new FormData();
        form.append('file', buffer, filename);

        const upload = await huntflowClient.post(`/accounts/${HUNTFLOW_ACCOUNT_ID}/upload`, form, {
          headers: {
            ...form.getHeaders(),
            'X-File-Parse': true
          }
        });
        return upload.data;
      }

      const {
        id,
        text,
        photo,
        fields
      } = await parseFileData();

      const {
        position,
        email: dataEmail,
        salary,
        name: dataName,
        phones,
        birthdate
      } = fields || {}

      const applicantsFilesList = id ? [{ id }] : []

      const applicant = await huntflowClient.post(`/accounts/${HUNTFLOW_ACCOUNT_ID}/applicants`, {
        last_name: dataName?.last ?? surname,
        first_name: dataName?.first ?? name,
        middle_name: dataName?.middle,
        phone: phones?.[0] || telephone,
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
          files: applicantsFilesList,
          account_source: HUNTFLOW_SOURCE_ID
        }]
      });

      if (huntflowId && applicant?.data?.id) {
        await huntflowClient.post(`/accounts/${HUNTFLOW_ACCOUNT_ID}/applicants/${applicant?.data?.id}/vacancy`, {
          vacancy: huntflowId,
          status: 117000,
          files: applicantsFilesList
        });
      }
    } catch (err) {
      ctx.badRequest(err);
      return;
    }
    ctx.send();
  },

  async contact(ctx) {
    const { name, email, subject, comment, content, filename } = ctx.request.body;

    try {
      await strapi.plugins['email'].services.email.send({
        to: 'contact@sberautotech.ru',
        subject: subject,
        html: `
          <p>${name} - ${email}</p>
          <p>Комментарий: ${comment}</p>
        `,
        attachments: content ? [{ filename, path: content }] : []
      });
    } catch (err) {
      console.log('SendEmail error', err)
    }

    ctx.send();

  }
};
