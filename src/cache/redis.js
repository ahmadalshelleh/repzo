const redis = require('redis')

const client = redis.createClient();

client.connect();

const expirationTime = 300;

async function set(key, data){
     await client.setEx(key, expirationTime, JSON.stringify(data));
}

async function get(key) {
     return JSON.parse(await client.get(key));
}

async function clear(key){
      return await client.del(key);
}

module.exports.get = get
module.exports.set = set
module.exports.clear = clear
