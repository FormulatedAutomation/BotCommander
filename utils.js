export const botKey = (botInfo) => {
  switch (botInfo.type) {
    case 'uipath':
      return botInfo.properties.Id;
    case 'robocloud':
      return botInfo.processId;
    default:
      return botInfo.id;
  }
}
