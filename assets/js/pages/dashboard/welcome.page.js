parasails.registerPage('welcome', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    students: [],
    formData: {/* … */},
    centerDialogAdded: false,
    modal: '',
    links: [],
    state: '',
    timeout:  null,
    search: '',
    pageLoadedAt: Date.now(),
    syncing: false,
    editList: [],
    filterList: [],
    value: new Date(),
    cloudError: '',
    buttonUpdate: false,
    ruleForm: {
      patronymicName: '',
      firstName: '',
      lastName: '',
      // rating:1,
      domains: [{
        key: 1,
        value: '',
        state: '',
        rating:1
      }],
      email: ''
    },
    rules: {

      /*     id: [
             {required: true, message: 'Please input dog name', trigger: 'blur'},
             {min: 3, max: 100, message: 'Длина должна быть от 3 to 100', trigger: 'blur'},
           ],*/
      dateReceiving: [
        {required: true, message: 'Please input date receiving.', trigger: 'change'}
      ],
      dateBirth: [
        {required: true, message: 'Введите дату рождения', trigger: 'blur'}
      ],
      patronymicName: [
        {required: true, message: 'Введите ваше отчество', trigger: 'blur'},
        {min: 3, max: 20, message: 'Длина должна быть от 3 до 20 зн.', trigger: 'blur'}
      ],
      firstName: [
        {required: true, message: 'Введите ваше имя', trigger: 'blur'},
        {min: 3, max: 20, message: 'Длина должна быть от 3 до 20 зн.', trigger: 'blur'}
      ],
      lastName: [
        {required: true, message: 'Введите вашу фамилию', trigger: 'blur'},
        {min: 3, max: 20, message: 'Длина должна быть от 3 до 20 зн.', trigger: 'blur'}
      ],
      // rating: [
      //   {required: true,  message: 'Поставьте оценку', trigger: 'blur'},
      //   {min: 1,  message: 'Поле не может быть пустым', trigger: 'blur'}
      // ],
      // dateBirthUpdate: [
      //   { type:'string',required: true, message: 'Please pick a date', trigger: 'change'}
      // ],
      /*  registerNumber: [
         {required: true, message: 'Please input register number', trigger: 'blur'},
         {min: 3, max: 100, message: 'Длина должна быть от 3 to 100', trigger: 'blur'}
       ],

       */

    },
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    io.socket.get(`/api/v1/students/list`, function gotResponse(body, response) {
      // console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);


    });
    // Принимаем данные по событию list-*
    io.socket.on('list-student', (data) => {
      this.students = this.editList = this.filterList = _.isNull(data) ? [] : data;
      // console.log('STUDENTS::: ', this.students);
    });
  },
  mounted: async function () {
    this.links = _.sortByOrder(this.loadAll(),['value'], ['asc']);
  },
  filters: {
    dateF: function (value, l, format) {
      if (!value) {
        return '';
      }
      moment.locale(l);
      let formatNew = (!format) ? 'LLL' : format;
      return (moment.parseZone(value).format(formatNew)) ? moment.parseZone(value).format(formatNew) : value;
    },
  },
  //  ╦  ╦╦╦═╗╔╦╗╦ ╦╔═╗╦    ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ╚╗╔╝║╠╦╝ ║ ║ ║╠═╣║    ╠═╝╠═╣║ ╦║╣ ╚═╗
  //   ╚╝ ╩╩╚═ ╩ ╚═╝╩ ╩╩═╝  ╩  ╩ ╩╚═╝╚═╝╚═╝
  // Configure deep-linking (aka client-side routing)
  virtualPagesRegExp: /^\/welcome\/?([^\/]+)?\/?/,
  afterNavigate: async function (virtualPageSlug) {
    // `virtualPageSlug` is determined by the regular expression above, which
    // corresponds with `:unused?` in the server-side route for this page.
    switch (virtualPageSlug) {
      case 'hello':
        this.modal = 'example';
        break;
      default:
        this.modal = '';
    }
  },
  computed: {
    titleAdd: {
      get: function () {
        return !this.buttonUpdate ? 'Добавить' : 'Изменить';
      }
    },
  },
  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

    clickOpenExampleModalButton: async function () {
      // this.buttonUpdate ?  this.$refs['ruleForm'].resetFields() : '';
      console.log(this.$refs['ruleForm']);
      this.goto('/welcome/hello');
    },

    closeExampleModal: async function () {
      this.ruleForm = {domains: [{
          key: 1,
          value: '',
          state: '',
          rating:1
        }],
        };
      this.buttonUpdate = false;
      this.goto('/welcome');
    },
    handleParsingForm: function () {
      // Clear out any pre-existing error messages.
      this.formErrors = {};

      var argins = this.formData;

      // Validate full name:
      if (!argins.fullName) {
        this.formErrors.fullName = true;
      }

      // Validate email:
      if (!argins.emailAddress || !parasails.util.isValidEmailAddress(argins.emailAddress)) {
        this.formErrors.emailAddress = true;
      }

      // Validate password:
      if (!argins.password) {
        this.formErrors.password = true;
      }

      // Validate password confirmation:
      if (argins.password && argins.password !== argins.confirmPassword) {
        this.formErrors.confirmPassword = true;
      }

      // Validate ToS agreement:
      if (!argins.agreed) {
        this.formErrors.agreed = true;
      }

      // If there were any issues, they've already now been communicated to the user,
      // so simply return undefined.  (This signifies that the submission should be
      // cancelled.)
      if (Object.keys(this.formErrors).length > 0) {
        return;
      }

      return argins;
    },

    async submitForm(formName) {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid && !this.buttonUpdate) {
          this.add();
        } else if (valid && this.buttonUpdate) {
          this.update();
        } else {
          console.log('error submit!!');
          return false;
        }
        return false;
      });
    },
    // Create Student
    async add() {
      let data = this.ruleForm;

      console.log('DATA перед отправкой::: ', data);
      await io.socket.post('/api/v1/students/student', data, (data, jwRes) => {
        if (jwRes.statusCode === 200) {
          this.resetForm('ruleForm');
          this.closeExampleModal();
          this.ruleForm.federations = this.resetFederation;
          this.getList();
        } else {
          this.$message({
            type: 'error',
            message: 'Отмена.'
          });
        }
      });
    },
    // Update Student
    update() {
      let data = this.ruleForm;
      data.id = this.ruleForm.id;
      console.log('DATA UPDATE перед отправкой ::: ', data);
      io.socket.put('/api/v1/students/student', data, (data, jwRes) => {
        if (jwRes.statusCode === 200) {
          this.resetForm('ruleForm');
          this.closeExampleModal();
          this.ruleForm.federations = this.resetFederation;
          this.getList();
        } else {
          this.$message({
            type: 'error',
            message: `Обновление не прошло. Ошибка ${jwRes.statusCode}`
          });
        }
      });
    },
    async handleEdit(index, row) {
      this.ruleForm = Object.assign({}, this.ruleForm, row);
      this.clickOpenExampleModalButton();
      this.buttonUpdate = true;
    },
    clickAddButton() {
      this.centerDialogAdded = true;
    },

    tableRowClassName({row, rowIndex}) {
      if (!row.see) {
        return 'warning-row';
      }
      return '';
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
      this.search = '';
    },

    openRemoveDialog(id) {
      this.removeId = id;
      this.$confirm('Это навсегда удалит объект. Продолжить?', 'Внимание', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Отменить',
        type: 'warning'
      }).then(() => {
        this.deleteDog();

      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Отменить'
        });
      });
    },


    deleteDog: async function () {
      io.socket.delete('/api/v1/students/student', {id: this.removeId}, (dataRes, jwRes) => {
        if (jwRes.statusCode === 200) {
          this.getList();
          this.$forceUpdate();
        } else {
          this.$message({
            type: 'Error',
            message: 'Проблемы с удалением.'
          });
        }
      });
    },

    async getList() {
      await io.socket.get(`/api/v1/students/list`, function gotResponse(body, response) {
        // console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
      });

    },
    resetForm(formName) {
      this.$refs.upload ? this.$refs.upload.clearFiles() : '';
      this.$refs[formName].resetFields();
      this.ruleForm.federations = this.resetFederation;
    },

    load(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([
          {
            id: 31,
            date: '2016-05-01',
            name: 'wangxiaohu'
          }, {
            id: 32,
            date: '2016-05-01',
            name: 'wangxiaohu'
          }
        ]);
      }, 1000);
    },
    loadAll() {
      return [
        {'value': 'aлгебра', 'link': 'https://github.com/vuejs/aлгебра'},
        {'value': 'физика', 'link': 'https://github.com/ElemeFE/физика'},
        {'value': 'геометрия', 'link': 'https://github.com/ElemeFE/геометрия'},
        {'value': 'информатика', 'link': 'https://github.com/ElemeFE/информатика'},
        {'value': 'черчение', 'link': 'https://github.com/vuejs/черчение'},
        {'value': 'природоведение', 'link': 'https://github.com/vuejs/природоведение'},
        {'value': 'программирование', 'link': 'https://github.com/babel/программирование'}
      ];
    },
    querySearchAsync(queryString, cb) {
      var links = this.links;
      var results = queryString ? links.filter(this.createFilter(queryString)) : links;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    createFilter(queryString) {
      return (link) => {
        return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      console.log(item);
    },

    handleChange(value) {
      console.log(value);
    },
    addDomain() {
      console.log('domains::: ' ,this.ruleForm.domains );
      this.ruleForm.domains.push({
        key: Date.now(),
        value: '',
        state: '',
        rating:1
      });
      this.$message({
        type: 'Info',
        message: 'Добавлен предмет.'
      });
    },
    removeDomain(item) {
      var index = this.ruleForm.domains.indexOf(item);
      if (index !== -1 && this.ruleForm.domains.length > 1) {
        this.ruleForm.domains.splice(index, 1);
      }
    },



  }
});
