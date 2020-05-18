const language = window.navigator.userLanguage || window.navigator.language;
console.log('LANG::: ', language);
let lang = ELEMENT.lang.en;
console.log('LANG2::: ', lang);
if((!SAILS_LOCALS.me)){
  lang = language === 'en' ? lang : ELEMENT.lang.ruRU;
}else{
  lang = (SAILS_LOCALS.me && SAILS_LOCALS.me.preferredLocale === 'ru') ? ELEMENT.lang.ruRU : lang;
}
console.log('Присваеваем::: ', lang);
ELEMENT.locale(lang);


(!!SAILS_LOCALS.me) ? moment.locale(SAILS_LOCALS.me.preferredLocale) : '';
