import Eight from './_eight';

export default class Router {
  constructor(request, message_sender, callback) {
     this.request  = request;
     this.sender   = message_sender;
     this.callback = callback;
  }
  routing() {
    console.info(`routing: ${this.request}`);
    return this.table[this.request].call(this);
  }
  /* routing table */
  get table() {
    return {
      "icon/show":           this.show_icon,
      "icon/hide":           this.hide_icon,
      "setup":               this.setup,
      "confirmation/agree":  this.agree_confirmation,
      "confirmation/reject": this.reject_confirmation
    };
  }

  /* routing methods */
  show_icon() {
    this.toggle_icon_('show');
  }
  hide_icon() {
    this.toggle_icon_('hide');
  }
  setup() {
    this.check_confirmation_();
  }
  agree_confirmation() {
    Eight.User.confirm().then(
      () => { this.check_confirmation_(); },
      () => { this.render_("popup"); }
    );
  }
  reject_confirmation() {
    this.hide_icon();
  }

  /* private methods */
  render_(view_name) {
    const method = function(tabs) {
      chrome.pageAction.setPopup({
        tabId: tabs[0].id,
        popup: `html/${view_name}.html`
      });
    };
    this.sender.tab ? method([this.sender.tab]) : chrome.tabs.query({
      active: true, currentWindow: true }, method);
  }
  toggle_icon_(name) {
    const method = function(tabs) { chrome.pageAction[name](tabs[0].id); };
    this.sender.tab ? method([this.sender.tab]) : chrome.tabs.query({
      active: true, currentWindow: true }, method);
  }
  check_confirmation_() {
    console.info("check: confirmation");
    return Eight.User.is_confirmed().then(
      () => { this.check_premium_user_(); },
      () => { this.render_("confirm"); }
    );
  }
  check_premium_user_() {
    console.info("check: premium user");
    return Eight.User.is_premium().then(
      () => { this.render_("premium"); },
      () => { this.render_("simple"); }
    );
  }
}
