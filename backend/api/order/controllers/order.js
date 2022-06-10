const timeSlots = [
  {
    id: 1,
    timeFrom: '12:00',
    timeTo: '12:10'
  },
  {
    id: 2,
    timeFrom: '12:10',
    timeTo: '12:20'
  },
  {
    id: 3,
    timeFrom: '12:20',
    timeTo: '12:30'
  },
  {
    id: 4,
    timeFrom: '12:30',
    timeTo: '12:40'
  },
  {
    id: 5,
    timeFrom: '12:40',
    timeTo: '12:50'
  },
  {
    id: 6,
    timeFrom: '12:50',
    timeTo: '13:00'
  },
  {
    id: 7,
    timeFrom: '13:00',
    timeTo: '13:10'
  },
  {
    id: 8,
    timeFrom: '13:10',
    timeTo: '13:20'
  },
  {
    id: 9,
    timeFrom: '13:20',
    timeTo: '13:30'
  },
  {
    id: 10,
    timeFrom: '13:30',
    timeTo: '13:40'
  },
  {
    id: 11,
    timeFrom: '13:40',
    timeTo: '13:50'
  },
  {
    id: 12,
    timeFrom: '13:50',
    timeTo: '14:00'
  },
  {
    id: 13,
    timeFrom: '14:00',
    timeTo: '14:10'
  },
  {
    id: 14,
    timeFrom: '14:10',
    timeTo: '14:20'
  },
  {
    id: 15,
    timeFrom: '14:20',
    timeTo: '14:30'
  },
  {
    id: 16,
    timeFrom: '14:30',
    timeTo: '14:40'
  },
  {
    id: 17,
    timeFrom: '14:40',
    timeTo: '14:50'
  },
  {
    id: 18,
    timeFrom: '14:50',
    timeTo: '15:00'
  },
  {
    id: 19,
    timeFrom: '15:00',
    timeTo: '15:10'
  },
  {
    id: 20,
    timeFrom: '15:10',
    timeTo: '15:20'
  },
  {
    id: 21,
    timeFrom: '15:20',
    timeTo: '15:30'
  },
  {
    id: 22,
    timeFrom: '15:30',
    timeTo: '15:40'
  },
  {
    id: 23,
    timeFrom: '15:40',
    timeTo: '15:50'
  },
  {
    id: 24,
    timeFrom: '15:50',
    timeTo: '16:00'
  },
  {
    id: 25,
    timeFrom: '16:00',
    timeTo: '16:10'
  },
  {
    id: 26,
    timeFrom: '16:10',
    timeTo: '16:20'
  },
  {
    id: 27,
    timeFrom: '16:20',
    timeTo: '16:30'
  },
  {
    id: 28,
    timeFrom: '16:30',
    timeTo: '16:40'
  },
  {
    id: 29,
    timeFrom: '16:40',
    timeTo: '16:50'
  },
  {
    id: 30,
    timeFrom: '16:50',
    timeTo: '17:00'
  },
  {
    id: 31,
    timeFrom: '17:00',
    timeTo: '17:10'
  },
  {
    id: 32,
    timeFrom: '17:10',
    timeTo: '17:20'
  },
  {
    id: 33,
    timeFrom: '17:20',
    timeTo: '17:30'
  },
  {
    id: 34,
    timeFrom: '17:30',
    timeTo: '17:40'
  },
  {
    id: 35,
    timeFrom: '17:40',
    timeTo: '17:50'
  },
  {
    id: 36,
    timeFrom: '17:50',
    timeTo: '18:00'
  },
  {
    id: 37,
    timeFrom: '18:00',
    timeTo: '18:10'
  },
  {
    id: 38,
    timeFrom: '18:10',
    timeTo: '18:20'
  },
  {
    id: 39,
    timeFrom: '18:20',
    timeTo: '18:30'
  },
  {
    id: 40,
    timeFrom: '18:30',
    timeTo: '18:40'
  },
  {
    id: 41,
    timeFrom: '18:40',
    timeTo: '18:50'
  },
  {
    id: 42,
    timeFrom: '18:50',
    timeTo: '19:00'
  },
  {
    id: 43,
    timeFrom: '19:00',
    timeTo: '19:10'
  },
  {
    id: 44,
    timeFrom: '19:10',
    timeTo: '19:20'
  },
  {
    id: 45,
    timeFrom: '19:20',
    timeTo: '19:30'
  },
  {
    id: 46,
    timeFrom: '19:30',
    timeTo: '19:40'
  },
  {
    id: 47,
    timeFrom: '19:40',
    timeTo: '19:50'
  },
  {
    id: 48,
    timeFrom: '19:50',
    timeTo: '20:00'
  },
  {
    id: 49,
    timeFrom: '20:00',
    timeTo: '20:10'
  },
  {
    id: 50,
    timeFrom: '20:10',
    timeTo: '20:20'
  },
  {
    id: 51,
    timeFrom: '20:20',
    timeTo: '20:30'
  },
  {
    id: 52,
    timeFrom: '20:30',
    timeTo: '20:40'
  },
  {
    id: 53,
    timeFrom: '20:40',
    timeTo: '20:50'
  },
  {
    id: 54,
    timeFrom: '20:50',
    timeTo: '21:00'
  },
  {
    id: 55,
    timeFrom: '21:00',
    timeTo: '21:10'
  },
  {
    id: 56,
    timeFrom: '21:10',
    timeTo: '21:20'
  },
  {
    id: 57,
    timeFrom: '21:20',
    timeTo: '21:30'
  },
  {
    id: 58,
    timeFrom: '21:30',
    timeTo: '21:40'
  },
  {
    id: 59,
    timeFrom: '21:40',
    timeTo: '21:50'
  },
  {
    id: 60,
    timeFrom: '21:50',
    timeTo: '20:00'
  },
];

module.exports = {
  async send(ctx) {
    const { name, email, date, time } = ctx.request.body;

    const previousOrders = await strapi.query("pmef-orders").find({
      date: new Date(date), time: new Date( date + ' ' + time)
    });

    if (previousOrders.length >= 2) {
      return ctx.send('no free places', 400)
    }

    try {
      await strapi.plugins['email'].services.email.send({
        to: 'spb@sberautotech.ru',
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
            <p>Сегодня вы были записаны на открытое тестирование беспилотной технологии СберАвтоТеха на Крестовском острове в Санкт-Петербурге.</p>
            <p>Если вы приняли участие в тестировании, то мы будем благодарны за обратную связь. Это поможет нам развивать технологию и создавать современные беспилотные сервисы.</p>
            <p>Пожалуйста, расскажите нам о том, как прошла поездка:</p>
            <ul>
              <li>Насколько вам было комфортно?</li>
              <li>Удобна ли система взаимодействия с беспилотником?</li>
              <li>Какие у вас впечатления оставил у вас опыт поездки в автономном автомобиле?</li>
            </ul>
            <p>Спасибо, и до встречи на дорогах!</p>
          `
        });
      }, 600000)
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
        label: item.timeFrom + ' - ' + item.timeTo,
        disabled: previousOrders.length < 2 ? false : true
      }
    }))

    ctx.send(result, 200);
  }
};
