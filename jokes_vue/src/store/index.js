import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    jokes : [] //niz jokes
  },

  mutations: { //mutacijama menjamo stanje. Kad ocu da menjam ovo jokes i njegove elemente
    set_jokes: function (state, jokes){ //mutacija da popunim jokes niz
      state.jokes = jokes;
    },

    add_joke: function (state, joke){
      state.jokes.push(joke);
    },

    remove_joke: function (state, id){
      for (let j = 0; j < state.jokes.length; j++){
        if(state.jokes[j].id === id){
          state.jokes.splice(j, 1);
          break;
        }
      }
    },

    update_joke: function (state, payload){
      for (let j = 0; j < state.jokes.length; j++){
        if(state.jokes[j].idvic === payload.idvic){
          state.jokes[j].naslov = payload.msg.naslov;
          state.jokes[j].tekst = payload.msg.tekst;
          state.jokes[j].tip = payload.msg.tip;
          break;
        }
      }
    }

  },

  actions: { //sluzi da iz komponenti iz koda pozovem akcije koje ce mutacijama da promene stanje

    load_jokes: function ({commit}) {
      fetch('http://localhost/api/vicevi', { method: 'get' }).then((response) => {
        if (!response.ok)
          throw response;

        return response.json()
      }).then((jsonData) => {
        commit('set_jokes', jsonData) //mutacija
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },


    delete_joke: function ({commit}, message){
      fetch(`http://localhost/api/vic/${id}`, { method: 'delete' }).then((response) => {
        if (!response.ok)
          throw response;

        return response.json()
      }).then((jsonData) => {
        commit('remove_joke', jsonData.idvic)  //DA LI IDVIC ili samo ID?
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },


    new_joke: function ({commit}, message){
      fetch('http://localhost/api/vicevi', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: message
      }).then((response) => {
        if (!response.ok)
          throw response;

        return response.json();
      }).then((jsonData) => {
        commit('add_joke', jsonData); //jsonData nam vrati iz baze kad ga kreiramo
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },


    change_joke: function ({commit}, payload){ //payload kada treba vise podataka da prosledimo
      fetch(`http://localhost/api/vic/${payload.idvic}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: payload.msg
      }).then((response) => {
        if (!response.ok)
          throw response;

        return response.json();
      }).then((jsonData) => {
        commit('update_joke', {idvic: payload.idvic, msg:jsonData});
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    }


  }

})
