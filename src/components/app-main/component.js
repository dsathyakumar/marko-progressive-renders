
export default class {
  onInput(input) {
    this.state = {
      renderMode: input.renderMode || 'progressive-out-of-order',
      startTime: Date.now(),
      iframeUrl: 'about:blank'
    };
  }
  newWindowClick() { // this is fine
    const url = '/iframe?renderMode=' + this.state.renderMode;
      window.open(url, '_blank');
  }
  refreshPage(url) { // window load and refresh button handler
    const loadingEl = this.getEl('loading');
    const loadingMessageEl = this.getEl('loadingMessage');

    loadingMessageEl.innerHTML = 'Page loading...';
    loadingEl.className = 'loading';

    this.setState('startTime', Date.now());

    if (typeof url !== 'string') {
      url = '/iframe?renderMode=' + this.state.renderMode +
        '&ts=' + this.state.startTime;
    }
    this.setState('iframeUrl', url);
  }
  handleOnload() { // iframe load handler
    const loadingEl = this.getEl('loading');
    const loadingMessageEl = this.getEl('loadingMessage');
    const elapsedTime = Date.now() - this.state.startTime;
    loadingMessageEl.innerHTML = 'Loaded in ' + elapsedTime + 'ms';
    loadingEl.className = 'loading-done';
  }
};
