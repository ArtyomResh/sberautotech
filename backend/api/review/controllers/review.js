module.exports = {
  async send(ctx) {
    const { name, dateTime, text } = ctx.request.body;

    try {
      await strapi.plugins['email'].services.email.send({
        to: 'aasyrcov@sberautotech.ru', // TODO EMAIL
        subject: `Отзыв о поездке на Крестовском`,
        html: `
          <p>ФИО - ${name}</p>
          <p>Дата и время поездки: ${dateTime}</p>
          <p>Отзыв: ${text}</p>
        `
      });
    } catch (err) {
      console.error(err);
      ctx.badRequest('error', JSON.stringify(err.message))
    }

    ctx.send();
  }
};
