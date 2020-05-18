/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

module.exports.custom = {

  /**************************************************************************
  *                                                                         *
  * The base URL to use during development.                                 *
  *                                                                         *
  * • No trailing slash at the end                                          *
  * • `http://` or `https://` at the beginning.                             *
  *                                                                         *
  * > This is for use in custom logic that builds URLs.                     *
  * > It is particularly handy for building dynamic links in emails,        *
  * > but it can also be used for user-uploaded images, webhooks, etc.      *
  *                                                                         *
  **************************************************************************/
  baseUrl: 'http://localhost:1337',

  /**************************************************************************
  *                                                                         *
  * The TTL (time-to-live) for various sorts of tokens before they expire.  *
  *                                                                         *
  **************************************************************************/
  passwordResetTokenTTL: 24*60*60*1000,// 24 hours
  emailProofTokenTTL:    24*60*60*1000,// 24 hours

  /**************************************************************************
  *                                                                         *
  * The extended length that browsers should retain the session cookie      *
  * if "Remember Me" was checked while logging in.                          *
  *                                                                         *
  **************************************************************************/
  rememberMeCookieMaxAge: 30*24*60*60*1000, // 30 days

  /**************************************************************************
  *                                                                         *
  * Automated email configuration                                           *
  *                                                                         *
  * Sandbox Mailgun credentials for use during development, as well as any  *
  * other default settings related to "how" and "where" automated emails    *
  * are sent.                                                               *
  *                                                                         *
  * (https://app.mailgun.com/app/domains)                                   *
  *                                                                         *
  **************************************************************************/
  // mailgunDomain: 'sandboxaa1234fake678.mailgun.org',
  // mailgunSecret: 'key-fakeb183848139913858e8abd9a3',
  //--------------------------------------------------------------------------
  // /\  Configure these to enable support for automated emails.
  // ||  (Important for password recovery, verification, contact form, etc.)
  //--------------------------------------------------------------------------

  mailgunDomain: '500-word.com',
  mailgunSecret: 'key-973de446f9288ced145244a3dec4a982',


  friendEmailAddress: 'ins09@mail.ru',
  avatar: 'https://d3a1wbnh2r1l7y.cloudfront.net/ava.png',

  // The sender that all outgoing emails will appear to come from.
  // Отправитель, от которого будут исходить все исходящие письма.
  fromEmailAddress: 'info@500-word.com',
  fromName: 'The 500 Word Team',

  // Email address for receiving support messages & other correspondences.
  // Адрес электронной почты для получения сообщений поддержки и другой корреспонденции.
  internalEmailAddress: 'lphp@mail.ru',
  passwordSuperAdmin: '123abc',

  // Whether to require proof of email address ownership any time a new user
  // signs up, or when an existing user attempts to change their email address.
  verifyEmailAddresses: false,

  /**************************************************************************
  *                                                                         *
  * Billing & payments configuration                                        *
  *                                                                         *
  * (https://dashboard.stripe.com/account/apikeys)                          *
  *                                                                         *
  **************************************************************************/
  // stripePublishableKey: 'pk_test_Zzd814nldl91104qor5911gjald',
  // stripeSecret: 'sk_test_Zzd814nldl91104qor5911gjald',
  //--------------------------------------------------------------------------
  // /\  Configure these to enable support for billing features.
  // ||  (Or if you don't need billing, feel free to remove them.)
  //--------------------------------------------------------------------------

  /***************************************************************************
  *                                                                          *
  * Any other custom config this Sails app should use during development.    *
  *                                                                          *
  ***************************************************************************/
  // …
  googleMapKey: 'AIzaSyAUr7qK0Dq4YE52t90itw-EF0XHTkVuCIE',

  descriptionRootPage: 'Get 100% original and high-quality articles/blog posts on your chosen topic(s) - fashion, clothing, home rental, home decor, holidays, travel, health, lifestyle, gaming, or any other – for your blog, website or publication.',
  titleRootPage: 'Get 100% original and high-quality articles/blog posts',
  canonicalRootPage:'https://500-word.com'
};
