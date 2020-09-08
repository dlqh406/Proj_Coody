imgList = [];

function postToFirStore() {
  if (!imgList[1]) {
    alert("첨부한 이미지의 저장버튼을 누르세요");
  } else {
    //   var user = firebase.auth().currentUser;
    //   if (user) { else면 로그인 페이지로 이동
    console.log("post To FireStore start");

    var d = new Date();
    firebase.firestore().collection("postProduct").add({
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
      detail_img: imgList[1],
      thumbnail_img: imgList[0],
    });
  }
}

function create_detailUrl() {
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
  $("#belowDetail").html("<span>상세 이미지 저장완료</span>");
  function saveToStorage(items) {
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
          imgList[0] = downloadURL;

          console.log("0: " + imgList[0]);
          console.log("1: " + imgList[1]);
        });
      }
    );
  }
}

function create_thumbnailUrl() {
  $("#thumbnail_img").val(function () {
    console.log("img input detected");
    onloadImage(this);
    // postToFirStore(imgList[0], imgList[1]);
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
  $("#belowthumnail").html("<span>썸네일 이미지 저장완료</span>");

  function saveToStorage(items) {
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
          imgList[1] = downloadURL;

          console.log("0: " + imgList[0]);
          console.log("1: " + imgList[1]);
        });
      }
    );
  }
}
