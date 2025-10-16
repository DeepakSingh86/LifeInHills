// Google Apps Script — Drive Upload Web App with optional Sheet logging
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var fileName = data.fileName || ('upload_' + new Date().getTime());
    var mimeType = data.mimeType || 'application/octet-stream';
    var contentBase64 = data.content;
    var sheetId = data.sheetId || null; // optional: Google Sheet ID to log metadata
    var folderName = data.folderName || 'LifeInHills_media';

    var folders = DriveApp.getFoldersByName(folderName);
    var folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(folderName);

    var blob = Utilities.newBlob(Utilities.base64Decode(contentBase64), mimeType, fileName);
    var file = folder.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

    var result = {
      success: true,
      url: file.getUrl(),
      id: file.getId(),
      name: file.getName()
    };

    // optional: append to sheet
    if (sheetId) {
      try {
        var ss = SpreadsheetApp.openById(sheetId);
        var sh = ss.getSheets()[0];
        sh.appendRow([new Date(), file.getName(), file.getUrl(), file.getId(), mimeType]);
      } catch (e) {
        // ignore sheet errors
      }
    }

    return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ success:false, error: err.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}
