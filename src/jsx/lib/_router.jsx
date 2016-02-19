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
      "icon/show": this.show_icon,
      "icon/hide": this.hide_icon,
      "setup": this.setup,
      "confirmation/agree": this.agree_confirmation,
      "confirmation/reject": this.reject_confirmation
    };
  }

  /* routing methods */
  show_icon() {
    chrome.pageAction.show(this.sender.tab.id);
  }
  hide_icon() {
    chrome.pageAction.hide(this.sender.tab.id);
  }
  setup() {
    this.check_confirmation();
  }
  agree_confirmation() {
    Eight.User.confirm().then(
      () => { this.check_confirmation(); },
      () => { this.render("popup"); }
    );
  }
  reject_confirmation() {
    // todo: sender.tab is undefined
    //this.hide_icon();
  }

  render(view_name) {
    chrome.pageAction.setPopup({
      tabId: this.sender.tab.id,
      popup: `html/${view_name}.html`
    });
  }

  check_confirmation() {
    console.info("check: confirmation");
    return Eight.User.is_confirmed().then(
      () => { this.check_premium_user(); },
      () => { this.render("confirm"); }
    );
  }
  check_premium_user() {
    console.info("check: premium user");
    return Eight.User.is_premium().then(
      () => { this.render("premium"); },
      () => { this.render("simple"); }
    );
  }
}
