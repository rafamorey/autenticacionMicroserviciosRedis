// const nanoid = require('nanoid');
const auth = require('../auth');
const TABLA = 'user';
const generateId = () => {
  Math.random().toString(36)
}

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../../store/dummy');
    }

    function list() {
        return store.list(TABLA);
    }

    function get(id) {
        return store.get(TABLA, id);
    }

    async function upsert(body) {
        const user = {
            name: body.name,
            userName: body.userName,
        }

        if (body.id) {
            user.id = body.id;
        } 
        else {
            user.id = Math.random().toString(36)
        }
        if(body.password ||body.userName){
            await auth.upsert({
                id:user.id,
                userName: user.userName,
                password: body.password
            })
        }

        return store.upsert(TABLA, user);
    }
    
    function follow(from, to){
       return store.upsert(TABLA + '_follow', {
        user_from: from,
        user_to: to,
        })
    }


    return {
        list,
        get,
        upsert,
        follow,
    };
}