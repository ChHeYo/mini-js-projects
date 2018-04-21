(function(){
    //using ieff to get rid of global variables
    const people = {
        // object literal
        people: [],
        // separation of concerns
        init: function() {
            this.cacheDom();
            this.bindEvents();
            this.render();
        },
        cacheDom: function() {
            this.el = document.getElementById("peopleModule");
            this.addButton = document.getElementById("addPerson");
            this.nameInput = document.getElementById("nameInput");
            this.ul = document.getElementById("people");
        },
        bindEvents: function() {
            // this context changes so we need to bind it to document or global obj
            this.addButton.addEventListener("click", this.addPerson.bind(this));
        },
        render: function() {

        },
        addPerson: function(event) {
            this.people.push(this.nameInput.value);
            let newPerson = document.createElement("li");
            newPerson.textContent = this.nameInput.value || "John Doe";
            this.ul.appendChild(newPerson);
        },
        deletePerson: function() {

        }
    };

    people.init();

})();