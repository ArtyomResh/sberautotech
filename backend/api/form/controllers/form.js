const packagejson = require('../../../package.json');

const HUNTFLOW_API = process.env.HUNTFLOW_API || 'https://api.huntflow.ru';
const HUNTFLOW_TOKEN = process.env.HUNTFLOW_TOKEN || '';
const HUNTFLOW_ACCOUNT_ID = process.env.HUNTFLOW_ACCOUNT_ID || '';

module.exports = {
  async send(ctx) {
    const { acception, name, surname, email, direction, textarea, content, filename, vacancy } = ctx.request.body;

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

    try {
      const formData = new FormData();
      formData.append('file', content);

      const upload = await fetch(`${HUNTFLOW_API}/account/${HUNTFLOW_ACCOUNT_ID}/upload`, {
        method: 'POST',
        body  : formData,
        headers: {
          'Authorization': `Bearer ${HUNTFLOW_TOKEN}`,
          'X-File-Parse': true,
          'User-Agent': `SberAutoTech/${packagejson.version}`
        }
      });

      if(!upload.ok) {
        throw new Error(upload.statusText);
      }

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
      } = await upload.json();

      const save = await fetch(`${HUNTFLOW_API}/account/${HUNTFLOW_ACCOUNT_ID}/applicants`, {
        method: 'POST',
        body  : {
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
            files: [{ id }]
          }]
        },
        headers: {
          'Authorization': `Bearer ${HUNTFLOW_TOKEN}`
        }
      });

      if(!save.ok) {
        throw new Error(save.statusText);
      }
    } catch (err) {
      console.error(err);
    }

    ctx.send();
  }
};
