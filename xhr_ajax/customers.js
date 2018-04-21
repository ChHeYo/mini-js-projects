(function(){

    const customer = {
        init: function(){
            this.cacheDom();
            this.addEvent();
        },
        cacheDom: function(){
            this.button1 = document.getElementById("button1");
            this.button2 = document.getElementById("button2");
        },
        addEvent: function(){
            this.button1.addEventListener("click", this.getCustomer.bind(this));
            this.button2.addEventListener("click", this.getCustomers.bind(this));
        },
        getCustomer: function(e){
            const xhr = new XMLHttpRequest();
            xhr.open("GET", "customer.json", true);
            xhr.onload = function(){
                if(this.status === 200){
                    const customerJson = JSON.parse(this.responseText);
                    document.getElementById("customer").innerHTML = `
                        <ul>
                            <li>${customerJson.id}</li>
                            <li>${customerJson.name}</li>
                            <li>${customerJson.phonenumber}</li>
                        </ul>
                    `
                }
            }
            xhr.send();
        },
        getCustomers: function(e){
            const xhr = new XMLHttpRequest();
            xhr.open("GET", "customers.json", true);
            xhr.onload = function(){
                if(this.status === 200){
                    let customerList = "";
                    const getCustomers = JSON.parse(this.responseText);
                    getCustomers.forEach(function(customer){
                        customerList += `
                            <ul>
                                <li>${customer.id}</li>
                                <li>${customer.name}</li>
                                <li>${customer.phonenumber}</li>
                            </ul> 
                        `
                    })
                    document.getElementById("customers").innerHTML = customerList;
                }
            }
            xhr.send();
        }
    }

    customer.init();

})();