type Key = string

const sessionCache = {
    set (key:Key, value:any) {
      if (!sessionStorage) {
        return
      }
      if (key != null && value != null) {
        sessionStorage.setItem(key, value)
      }
    },
    get (key:Key) {
      if (!sessionStorage) {
        return null
      }
      if (key == null) {
        return null
      }
      return sessionStorage.getItem(key)
    },
    setJSON (key:Key, jsonValue) {
      if (jsonValue != null) {
        this.set(key, JSON.stringify(jsonValue))
      }
    },
    getJSON (key:Key) {
      const value = this.get(key)
      if (value != null) {
        return JSON.parse(value)
      }
    },
    remove (key:Key) {
      sessionStorage.removeItem(key);
    }
  }
  const localCache = {
    set (key:Key, value) {
      if (!localStorage) {
        return
      }
      if (key != null && value != null) {
        localStorage.setItem(key, value)
      }
    },
    get (key:Key) {
      if (!localStorage) {
        return null
      }
      if (key == null) {
        return null
      }
      return localStorage.getItem(key)
    },
    setJSON (key:Key, jsonValue) {
      if (jsonValue != null) {
        this.set(key, JSON.stringify(jsonValue))
      }
    },
    getJSON (key:Key) {
      const value = this.get(key)
      if (value != null) {
        return JSON.parse(value)
      }
    },
    remove (key:Key) {
      localStorage.removeItem(key);
    }
  }
  export default {
    session: sessionCache,
    local: localCache
  }
  