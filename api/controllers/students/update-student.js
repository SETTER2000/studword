module.exports = {


  friendlyName: 'Student update',


  description: 'Обновить данные по студенту.',

  inputs: {
    id: {
      type: 'string',
      required: true,
      description: `Идентификатор студента.`
    },
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
    }
  },


  fn: async function (inputs, exits) {
    const req = this.req;
    // Убедитесь, что это запрос сокета (не традиционный HTTP)
    if (!req.isSocket) {
      throw 'badRequest';
    }


    await sails.sockets.join(req, 'student');
    console.log('inputs.domains::: ', inputs.domains);
    inputs.domains = inputs.domains.filter(d => !_.isEmpty(d.state));
    let updateObj = {
      lastName: inputs.lastName,
      firstName: inputs.firstName,
      domains: inputs.domains,
      patronymicName: inputs.patronymicName,
      dateBirth: await sails.helpers.dateFix(inputs.dateBirth),
    };

    // Обновляем
    let updateDog = await Student.updateOne({id: inputs.id}).set(updateObj);
    // Если не создан возвращаем ошибку.
    if (!updateDog) {
      throw 'badRequest';
    }


    /**
     * Добавить питомца в коллекцию пользователя: "User.dogs",
     * где у пользователя есть идентификатор 10 и питомец имеет идентификатор 300.
     * await User.addToCollection(10, 'dogs', 300);
     * Для собаки с updateDog.id меняем владельцев в owner (может быть массивом идентификаторов)
     */
    // await User.addToCollection(owner, 'dogs', newDog.id);
    // await Student.replaceCollection(updateDog.id, 'owners').members(owner);
    // let year = _.trim(inputs.dateBirth.split('-')[0], '"');
    // // Рассылаем данные всем подписанным на событие forSale-student данной комнаты.
    // await sails.sockets.broadcast('student', 'forSale-student', await sails.helpers.forSaleDog.with({
    //   letter: inputs.letter,
    //   year: year
    // }));
    return exits.success();
  }


};
