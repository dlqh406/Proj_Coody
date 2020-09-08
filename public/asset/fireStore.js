function postProdToFireStore() {
    console.log("postProdToFireStore")
    var d = new Date();
    // var newPostKey = firebase.firestore().ref().child("post/").push().key;
    firebase.firestore().collection('post').add({
            // uid: user.uid,
            // userName: "leebosung",
            // createdAt: d.getTime(),
            // contents: $("#message").val()
            first: "Alan",
            middle: d,
            last: "Turing",
            born: 1912
        })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });

}