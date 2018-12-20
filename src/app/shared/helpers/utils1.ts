export class Utils1 {
  static isValidFileFormat(suffix: string) {
    switch (suffix) {
      case "png":
      case "jpg":
      case "jpeg":
      case "gif":
      case "magics":
      case "stl":
      case "prt":
      case "slm":
        return true;
      default:
        return false;
    }
  }

  static removeSuffix(fileName: string): string {
    if (fileName != null) {
      return fileName.slice(0, fileName.lastIndexOf("."));
    } else {
      return "";
    }
  }

  static getSuffix(fileName: string): string {
    if (fileName != null) {
      let lastDotIndex = fileName.lastIndexOf(".");
      if (lastDotIndex > -1) {
        return fileName.substring(lastDotIndex + 1);
      }
    }
    return "";
  }

  static getPathFromSuffix(suffix: string) {
    switch (suffix) {
      case "magics":
        return "magic";
      case "png":
      case "jpg":
      case "jpeg":
      case "gif":
        return "magicscreenshot";
      default:
        return suffix;
    }
  }

  // Attribution: http://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
  static generateID(len: number = 5) {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < len; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}
