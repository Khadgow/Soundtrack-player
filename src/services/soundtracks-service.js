export default class SoundtracksService {
      getSoundtracks () {
        return fetch("https://gkst-bdae3.firebaseio.com/GKST/-MAunQMGdZkZDNL7TJ6a.json").then( response => {
            return response.json();
        })
    }
}
