export const utils = {

    parseQueryString(url: string): Object {
      const values = url.split(/[?#]{1,2}/)[1].split('&')

      return values.reduce((map, value) => {
        const [paramName, paramValue] = value.split('=')
        map[decodeURIComponent(paramName)] = decodeURIComponent(paramValue)

        return map
      }, {})
    },

    defaults(target: Object, ...sources: Object[]) {
      sources.forEach(source => {
        for (const prop in source) {
          if (!target.hasOwnProperty(prop)) {
            target[prop] = source[prop];
          }
        }
      });

      return target;
    }

};
