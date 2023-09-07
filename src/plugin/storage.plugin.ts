const storagePlugin = {
  saveObj(key: string, data = {}) {
    const dataStr = JSON.stringify(data);
    window.localStorage.setItem(key, dataStr);
  },

  saveStr(key: string, str: string) {
    localStorage.setItem(key, str);
  },

  getObj(key: string) {
    if (typeof window !== "undefined") {
      const dataStr = localStorage.getItem(key);

      if (dataStr) {
        const data = JSON.parse(dataStr);

        return data;
      }
    }
  },

  getStr(key: string) {
    if (typeof window !== "undefined") {
      const str = localStorage.getItem(key);

      return str;
    }
  },

  remove(key: string) {
    localStorage.removeItem(key);
  },

  isExist(key: string): boolean {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(key);

      if (data !== null) {
        return true;
      }
    }

    return false;
  },
};

export default storagePlugin;
