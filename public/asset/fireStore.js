function postProdToFireStore() {
  //   var user = firebase.auth().currentUser;
  //   if (user) { else면 로그인 페이지로 이동

  $("#detail_img").val(function () {
    console.log("img input detected");
    console.log(this);
    // send to img obj
    onloadImage(this);
  });
  function onloadImage(input) {
    if (input.files && input.files[0]) {
      var items = input.files[0];
      var _itemsize = Math.round(items.size / 1024 / 1024);
      console.log("파일 용량: " + _itemsize + "mb");
      saveToStorage(items);
    } else {
      alert("jpg 또는 png 파일을 첨부해주세요!");
    }
  }

  function saveToStorage(items) {
    //   var user = firebase.auth().currentUser;
    //   if (user) { else면 로그인 페이지로 이동
    var storageRef = firebase.storage().ref();
    var _name = items.name.replace(
      /[~`!#$%\^&*+=\-\[\]\\';,/{}()|\\":<>\?]/g,
      ""
    );
    var uploadTask = storageRef.child("data/" + "/" + _name).put(items);
    // .child("data/" + user.uid + "/" + _name)

    uploadTask.on(
      "state_changed",
      function (snapshot) {},
      function (error) {
        console.log(error);
      },
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          var detail_imgUrl = downloadURL;
          console.log("detail_img" + downloadURL);

          console.log("post To FireStore start");
          var d = new Date();
          firebase
            .firestore()
            .collection("postProduct")
            .add({
              // productName:
              // thumbnail_img:
              // introProduct_img:
              // sizeList:
              // sizeDetail:
              // colorList:
              // ODD_can:
              // StyleList:
              // TypeList:
              // uploadDate:

              first: "Alan",
              middle: d,
              last: "Turing",
              born: 1912,
              detail_img: detail_imgUrl,
              thumbnail_img: thumbnail_imgUrl,
            })
            .then(function (docRef) {
              console.log("Document written with ID: ", docRef.id);
            })
            .catch(function (error) {
              console.error("Error adding document: ", error);
            });
        });
      }
    );
  }

  //사이즈 다층구조, 컬러 다층 구조
}

//   // thumbnail_img
//   $("#detail_img").val(function () {
//     console.log("img input detected");
//     console.log(this);
//     // send to img obj
//     onloadImage2(this);
//   });

//   function onloadImage2(input) {
//     if (input.files && input.files[0]) {
//       var items = input.files[0];
//       var _itemsize = Math.round(items.size / 1024 / 1024);
//       console.log("파일 용량: " + _itemsize + "mb");
//       saveToStorage(items);
//     } else {
//       alert("jpg 또는 png 파일을 첨부해주세요!");
//     }
//   }
