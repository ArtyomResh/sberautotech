'use strict';

module.exports = {
  async send(ctx) {
    const { acception, name, surname, email, direction, textarea, content, filename } = ctx.request.body;

    try {
      const res = await strapi.plugins['email'].services.email.send({
        //TODO: Можно ли указать в strapi?
        to: 'hr_sat@sberbank.ru',
        subject: 'Форма сайта - Резюме',
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

    ctx.send();
  }
};
