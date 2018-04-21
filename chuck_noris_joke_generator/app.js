(function(){

    const jokes = {
        init: function(){
            this.cacheDom();
            this.bindEvent();
        },
        cacheDom: function(){
            this.button = document.querySelector(".get-jokes");
            this.input = document.getElementById("number");
        },
        bindEvent: function(){
            this.button.addEventListener("click", this.getJokes.bind(this));
        },
        getJokes: function(e){
            const xhr = new XMLHttpRequest();
            let number = this.input.value || 1;
            xhr.open("GET", `http://api.icndb.com/jokes/random/${number}`, true);
            xhr.onload = function(){
                if(this.status === 200){
                    const data = JSON.parse(this.responseText);
                    let jokes = "";
                    if (data.type === "success"){
                        data.value.forEach(function(joke){
                            jokes += `
                                <li>${joke.joke}</li>
                            `
                        })
                    } else {
                        jokes = "<li>Something went wrong</li>";
                    }
                    document.querySelector(".jokes").innerHTML = jokes;
                }
            }
            xhr.send();
            e.preventDefault();
        }
    }

    jokes.init();

})();