(function(){

    const XML = {
        init: function(){
            this.cacheDom();
            this.bindEvent();
        },
        cacheDom: function(){
            this.button = document.getElementById("button");
        },
        bindEvent: function() {
            this.button.addEventListener("click", this.getData.bind(this));
        },
        getData: function(){
            const xhr = new XMLHttpRequest();
            xhr.open("GET", "data.txt", true);

            // ** old method which check readyState **

            // ** ReadyState values
            // 0. request not initalized
            // 1. server connection established
            // 2. request received
            // 3. processing request
            // 4. request finished and response is ready

            // xhr.onreadystatechange = function(){
            //     if(this.status === 200 && this.readyState === 4){
            //         console.log(this.responseText);
            //     }
            // }
            
            // ** optional method which shows progress bar/spinners/loaders
            xhr.onprogress = function(){
                document.getElementById("output").style.display = "none";
            }

            xhr.onload = function(){
                if(this.status === 200){
                    console.log(this.responseText);
                }
            }

            xhr.onerror = function() {
                console.log("Error...")
            }

            xhr.send();
        }
        // HTTP Requests
        // 200: OK
        // 403: "Forbidden"
        // 404: "Not Found"
    }

    XML.init();

})();