export const botKey = (botInfo) => {
  console.log(botInfo);
  switch (botInfo.type) {
    case 'uipath':
      return botInfo.name;
    case 'robocloud':
      return botInfo.processId;
    default:
      return botInfo.id;
  }
}
