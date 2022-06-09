const timeSlots = [
  {
    id: 1,
    timeFrom: '12:00',
    timeTo: '12:30'
  },
  {
    id: 2,
    timeFrom: '12:30',
    timeTo: '13:00'
  },
  {
    id: 3,
    timeFrom: '13:00',
    timeTo: '13:30'
  },
  {
    id: 4,
    timeFrom: '13:30',
    timeTo: '14:00'
  },
  {
    id: 5,
    timeFrom: '14:00',
    timeTo: '14:30'
  },
  {
    id: 6,
    timeFrom: '14:30',
    timeTo: '15:00'
  },
  {
    id: 7,
    timeFrom: '15:00',
    timeTo: '15:30'
  },
  {
    id: 8,
    timeFrom: '15:30',
    timeTo: '16:00'
  },
  {
    id: 9,
    timeFrom: '16:00',
    timeTo: '16:30'
  },
  {
    id: 10,
    timeFrom: '16:30',
    timeTo: '17:00'
  },
  {
    id: 11,
    timeFrom: '17:00',
    timeTo: '17:30'
  },
  {
    id: 12,
    timeFrom: '17:30',
    timeTo: '18:00'
  },
  {
    id: 13,
    timeFrom: '18:00',
    timeTo: '18:30'
  },
  {
    id: 14,
    timeFrom: '18:30',
    timeTo: '19:00'
  },
  {
    id: 15,
    timeFrom: '19:00',
    timeTo: '19:30'
  },
  {
    id: 16,
    timeFrom: '19:30',
    timeTo: '20:00'
  },
  {
    id: 17,
    timeFrom: '20:00',
    timeTo: '20:30'
  },
  {
    id: 18,
    timeFrom: '20:30',
    timeTo: '21:00'
  },
  {
    id: 19,
    timeFrom: '21:00',
    timeTo: '21:30'
  },
  {
    id: 20,
    timeFrom: '21:30',
    timeTo: '22:00'
  },
];

module.exports = {
  async send(ctx) {
    const { name, email, date, time } = ctx.request.body;

    const previousOrders = await strapi.query("pmef-orders").find({
      date: new Date(date), time: new Date( date + ' ' + time)
    });

    if (previousOrders.length >= 6) {
      return ctx.send('no free places', 400)
    }

    try {
      await strapi.plugins['email'].services.email.send({
        // to: 'spb@sberautotech.ru', TODO
        to: 'aasyrcov@sberautotech.ru',
        subject: `Запись на тестирование`,
        html: `
          <p>ФИО - ${name}</p>
          <p>Почта - ${email}</p>
          <p>Дата и время поездки: ${date} ${time}</p>
        `
      });

      setTimeout(async () => {
        await strapi.plugins['email'].services.email.send({
          to: email,
          subject: `Пожалуйста, оставьте отзыв`,
          html: `
            <p>Здравствуйте, ${name}</p>
            <p>Просим вас оставить отзыв о поездке</p>
            <p>Дата и время поездки: ${date} ${time}</p>
          `
        });
      }, 60000)
    } catch (err) {
      console.error(err);
      ctx.badRequest('error', JSON.stringify(err.message))
    }

    try {
      const data = {
        name, email, date: new Date(date), time: new Date( date + ' ' + time)
      }
      await strapi.entityService.create({ data: data }, { model: 'pmef-orders' });
    } catch (err) {
      console.error(err);
      ctx.badRequest('error', JSON.stringify(err.message))
      return
    }

    ctx.send();
  },

  async getFreeSlots(ctx) {
    const { date } = ctx.request.query;

    const result = await Promise.all(timeSlots.map(async(item) => {
      const previousOrders = await strapi.query("pmef-orders").find({
        date: new Date(date), time: new Date( date + ' ' + item.timeFrom)
      });

      return {
        ...item,
        value: item.timeFrom + ' - ' + item.timeTo,
        disabled: previousOrders.length < 6 ? false : true
      }
    }))

    ctx.send(result, 200);
  }
};
