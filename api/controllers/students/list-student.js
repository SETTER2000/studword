module.exports = {


  friendlyName: 'List',


  description: 'List students.',


  inputs: {

  },


  exits: {
    success: {
      anyData: 'Вы подключились к комнате student и слушаете событие list'
    },
    notFound: {
      description: 'There is no such object with such ID.',
      responseType: 'notFound' // как раньше res.notFound(), сейчас это встроеная функция sails
    },
    forbidden: {
      description: 'The student who makes this request does not have permission to delete this entry.',
      responseType: 'forbidden' // как раньше res.forbidden(), сейчас это встроеная функция sails
    },
    badRequest: {
      description: 'Error.',
      responseType: 'badRequest'
    }
  },



  fn: async function (inputs, exits) {
    let req = this.req;
    // Убедитесь, что это запрос сокета (не традиционный HTTP)
    if (!req.isSocket) {
      throw 'badRequest';
    }
    // Have the socket which made the request join the "student" room.
    // Подключить сокет, который сделал запрос, к комнате «student».
    await sails.sockets.join(req, 'student');

    // Выбираем весь список объектов данной коллекции.
    let students = await Student.find()
      .sort([
        {createdAt: 'DESC'}
      ]);
    await sails.sockets.broadcast('student', 'list-student', students);
    // Respond with view.
    return exits.success();
  }


};
