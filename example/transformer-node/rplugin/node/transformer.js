function onFileType() {
  debugger;
  console.log('onFileType set');
}
module.exports = (plugin) => {
  debugger;
  plugin.registerAutocmd('FileType', onFileType, { pattern: '*' });
}
