module.exports = {


  friendlyName: 'Create student',


  description: 'Создать студента.',

  inputs: {
    lastName: {
      type: 'string',
      required: true,
      description: `Фамилия студента.`
    },

    firstName: {
      type: 'string',
      required: true,
      description: `Имя студента.`
    },

    patronymicName: {
      type: 'string',
      required: true,
      description: `Отчество студента.`
    },


    dateBirth: {
      type: 'string',
      // required: true,
      description: 'Дата рождения.',
    },


    domains: {
      type: 'ref',
      description: 'Успеваемость',
    },

  },


  exits: {
    success: {
      outputDescription: 'Information about the newly created record.',
      // Устанавливаем выходной тип данных. Хорошая практика для документирования кода.
      outputType: {
        id: 'number',
        imageSrc: 'string'
      },
    },
    badRequest: {
      description: 'No image upload was provided.',
      responseType: 'badRequest'
    },

    alreadyInUse: {
      statusCode: 409,
      description: 'The specified topic is already in use.',
    },

    alreadyInUseRU: {
      statusCode: 409,
      description: 'Указанное имя темы уже используется.',
    },

  },


  fn: async function (inputs, exits) {
    let req = this.req;
    const moment = require('moment');
    moment.locale('ru');
    // Убедитесь, что это запрос сокета (не традиционный HTTP)
    if (!req.isSocket) {
      throw 'badRequest';
    }
    console.log('inputs.domains::: ', inputs.domains);
    inputs.domains = inputs.domains.filter(d => !_.isEmpty(d.state));
    let newObj = await Student.create({
      lastName: inputs.lastName,
      firstName: inputs.firstName,
      patronymicName: inputs.patronymicName,
      domains: inputs.domains,
      dateBirth: await sails.helpers.dateFix(inputs.dateBirth),
    });


    await sails.sockets.broadcast('topic', 'list-topic');
    // Respond with view.
    return exits.success();

  }


};
