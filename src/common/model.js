var Backbone = require('backbone');
var Radio = require('backbone.radio');

var flashesChannel = Radio.channel('flashes');

module.exports = Backbone.Model.extend({
  constructor() {
    Backbone.Model.apply(this, arguments);
    this.on('request', this.handleRequest);
    this.on('error', this.handleError);
  },

  handleRequest() {
    flashesChannel.command('remove', this.serverError);
    delete this.serverError;
  },

  handleError() {
    this.serverError = { type: 'danger', title: 'Server Error' };
    flashesChannel.command('add', this.serverError);
  },

  cleanup() {
    if (this.serverError) {
      flashesChannel.command('remove', this.serverError);
    }
    delete this.serverError;
    delete this.validationError;
  }
});
