class ESI {
    // This route expires daily at 11:05
    static async getRegion(regionId) {
        try {
            const response = await cachedFetch(`https://esi.evetech.net/latest/universe/regions/${regionId}/?datasource=tranquility&language=en-us`);
            if (!response.ok) {
                throw Error(response.statusText);
            }
    
            return response.json();
        }
        catch (error) {
            console.log(error);
        }
    }

    // This route expires daily at 11:05
    static async getRegionList() {
        try {
            const response = await cachedFetch(`https://esi.evetech.net/latest/universe/regions/?datasource=tranquility`);
            if (!response.ok) {
                throw Error(response.statusText);
            }
    
            return response.json();
        }
        catch (error) {
            console.log(error);
        }
    }

    // This route expires daily at 11:05
    static async getStation(stationId) {
        try {
            const response = await cachedFetch(`https://esi.evetech.net/latest/universe/stations/${stationId}/?datasource=tranquility`);
            if (!response.ok) {
                throw Error(response.statusText);
            }
    
            return response.json();
        }
        catch (error) {
            console.log(error);
        }
    }

    // This route expires daily at 11:05
    static async getSystem(systemId) {
        try {
            const response = await cachedFetch(`https://esi.evetech.net/latest/universe/systems/${systemId}/?datasource=tranquility&language=en-us`);
            if (!response.ok) {
                throw Error(response.statusText);
            }
    
            return response.json();
        }
        catch (error) {
            console.log(error);
        }
    }

    // This route is cached for up to 3600 seconds
    static async getCharacter(characterId) {
        try {
            const response = await cachedFetch(`https://esi.evetech.net/latest/characters/${characterId}/?datasource=tranquility`, 3600);
            if (!response.ok) {
                throw Error(response.statusText);
            }
    
            return response.json();
        }
        catch (error) {
            console.log(error);
        }
    }

    // This route is cached for up to 3600 seconds
    static async getCorporation(corporationId) {
        try {
            const response = await cachedFetch(`https://esi.evetech.net/latest/corporations/${corporationId}/?datasource=tranquility`);
            if (!response.ok) {
                throw Error(response.statusText);
            }
    
            return response.json();
        }
        catch (error) {
            console.log(error);
        }
    }

    // This route is cached for up to 1800 seconds
    static async getContracts(regionId, page) {
        try {
            const response = await cachedFetch(`https://esi.evetech.net/latest/contracts/public/${regionId}/?datasource=tranquility&page=${page}`, 1800);
            if (!response.ok) {
                throw Error(response.statusText);
            }
    
            return response.json();
        }
        catch (error) {
            console.log(error);
        }
    }

   // This route is cached for up to 3600 seconds
   static async getContractItemList(contractId, page) {
        try {
            const response = await cachedFetch(`https://esi.evetech.net/latest/contracts/public/items/${contractId}/?datasource=tranquility&page=${page}`, 3600);
            if (!response.ok) {
                throw Error(response.statusText);
            }

            return response.json();
        }
        catch (error) {
            console.log(error);
        }
    }  
    
    // This route expires daily at 11:05
    static async getType(typeId) {
        try {
            const response = await cachedFetch(`https://esi.evetech.net/latest/universe/types/${typeId}/?datasource=tranquility&language=en-us
            `);
            if (!response.ok) {
                throw Error(response.statusText);
            }
    
            return response.json();
        }
        catch (error) {
            console.log(error);
        }
    }
}

// cachedFetch taken from https://www.sitepoint.com/cache-fetched-ajax-requests/
const cachedFetch = (url, options) => {
    let expiry = 5 * 60 // 5 min default
    if (typeof options === 'number') {
      expiry = options
      options = undefined
    } else if (typeof options === 'object') {
      // I hope you didn't set it to 0 seconds
      expiry = options.seconds || expiry
    }
    // Use the URL as the cache key to sessionStorage
    let cacheKey = url
    let cached = localStorage.getItem(cacheKey)
    let whenCached = localStorage.getItem(cacheKey + ':ts')
    if (cached !== null && whenCached !== null) {
      // it was in sessionStorage! Yay!
      // Even though 'whenCached' is a string, this operation
      // works because the minus sign converts the
      // string to an integer and it will work.
      let age = (Date.now() - whenCached) / 1000
      if (age < expiry) {
        let response = new Response(new Blob([cached]))
        return Promise.resolve(response)
      } else {
        // We need to clean up this old key
        localStorage.removeItem(cacheKey)
        localStorage.removeItem(cacheKey + ':ts')
      }
    }
  
    return fetch(url, options).then(response => {
      // let's only store in cache if the content-type is
      // JSON or something non-binary
      if (response.status === 200) {
        let ct = response.headers.get('Content-Type')
        if (ct && (ct.match(/application\/json/i) || ct.match(/text\//i))) {
          // There is a .json() instead of .text() but
          // we're going to store it in sessionStorage as
          // string anyway.
          // If we don't clone the response, it will be
          // consumed by the time it's returned. This
          // way we're being un-intrusive.
          response.clone().text().then(content => {
            localStorage.setItem(cacheKey, content)
            localStorage.setItem(cacheKey+':ts', Date.now())
          })
        }
      }
      return response
    })
  }

export default ESI;