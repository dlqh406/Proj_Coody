function postProdToFireStore() {
  //   var user = firebase.auth().currentUser;
  //   if (user) { else면 로그인 페이지로 이동

  console.log("postProdToFireStore()");
  var d = new Date();
  // fire Storage
  //   var storage = firebase.app().storage("gs://coody-f21eb.appspot.com");
  //   var storageRef = storage.ref();
  //   var imagesRef = storageRef.child("images");

  // 이미지 저장
  // get방식 가져오기
  //사이즈 다층구조, 컬러 다층 구조
  firebase
    .firestore()
    .collection("postProduct")
    .add({
      // productName:
      // analysis_img:
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
    })
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
}

$("#introProduct_img").on("change", function () {
  console.log("img input detected");

  // send to img obj
  onloadImage(this);
});
812;
function onloadImage(input) {
  if (input.files && input.files[0]) {
    var items = input.files[0];

    // 사이즈 제한
    // var _size = items.size;
    var _itemsize = Math.round(items.size / 1024 / 1024);
    console.log("파일 용량: " + _itemsize);
    saveToStorage(items);
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
        console.log(downloadURL);
      });
    }
  );
}
