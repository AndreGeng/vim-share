class NTransformer {
  constructor(plugin) {
    this.plugin = plugin;

    this.plugin.registerFunction('NSnakeCaseT', [this, this.NSnakeCaseT]);
  }
  async NSnakeCaseT() {
    try {
      let clipboard = await this.plugin.nvim.eval('@+');
      let word = await this.plugin.nvim.eval('expand("<cWORD>")');
      if (/(\w+)-/.test(word) ||
        /([a-zA-Z][a-z0-9]+)[A-Z]/.test(word)) {
        await this.plugin.nvim.eval('execute("normal! ma")');
        if (/(\w+)-/.test(word)) {
          let wSC = word.replace(/-/g, '_').toLowerCase();
          await this.plugin.nvim.eval(`execute("let @+ = '${wSC}'")`);
        } else if (/([a-zA-Z][a-z0-9]+)[A-Z]/.test(word)) {
          let wSC = word.replace(/([a-zA-Z][a-z0-9]+)([A-Z])/g, '$1_$2').toLowerCase();
          await this.plugin.nvim.eval(`execute("let @+ = '${wSC}'")`);
        }
        await this.plugin.nvim.eval('execute("normal! viWp")');
        await this.plugin.nvim.eval('execute("normal! `a")');
        await this.plugin.nvim.eval(`execute("let @+ = '${clipboard}'")`);
      }
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = (plugin) => new NTransformer(plugin);
