const MyModule = {
    name: "Will",
    age: 34,
    sayName: function(){
        alert(this.name);
    },
    setName: function(name){
        this.name = name;
    }
}