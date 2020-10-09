$(document).ready(function () {});

$("#countSize").change(function () {
  sdeNum = Number($("#countSize option:selected").val());
  console.log("사이즈개수 선택: " + sdeNum);

  $(".belowSize").html("");
  for (var i = 0; i < sdeNum; i++) {
    $(".belowSize").append(
      ' <ul><input type="text" id="size' +
        i +
        '" placeholder="사이즈입력 예시)free,small,medium,22,23">' +
        "</ul>"
    );
  }
});

$("#countColor").change(function () {
  deNum = Number($("#countColor option:selected").val());
  console.log("컬러개수 선택: " + deNum);

  $(".belowColor").html("");
  for (var i = 0; i < deNum; i++) {
    $(".belowColor").append(
      ' <ul><input type="text" id="color' +
        i +
        '"placeholder="컬러입력 예시)차골">' +
        "</ul>"
    );
  }
});

var sdeNum;
var deNum;
imgList = [];
var _sizeList = [];
var _colorList = [];

function postToFirStore() {
  for (var i = 0; i < deNum; i++) {
    _colorList.push($("#color" + i).val());
  }

  for (var i = 0; i < sdeNum; i++) {
    _sizeList.push($("#size" + i).val());
  }

  console.log(_sizeList);

  if (!imgList[1]) {
    alert("첨부한 이미지의 저장버튼을 누르세요");
  } else {
    //   var user = firebase.auth().currentUser;
    //   if (user) { else면 로그인 페이지로 이동
    console.log("post To FireStore start");
    var _tep = quill.root.innerHTML;
    var _resultQuill = _tep.replace(/<br>/gi, "");

    var _uploadDate = new Date();

    firebase
      .firestore()
      .collection("uploaded_product")
      .add({
        productName: $("#productName").val(),
        thumbnail_img: imgList[0],
        detail_img: imgList[1],
        ODD_can: $("#onedaydeli_can").is(":checked"),
        uploadDate: _uploadDate,
        productDecription: _resultQuill,
        sizeList: _sizeList,
        colorList: _colorList,
        style: $("#StyleList option:selected").val(),
        category: $("#category option:selected").val(),
      });
  }
  console.log("uploade completed");
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
    //ml로 바꿈 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    var uploadTask = storageRef.child("ml/" + "/" + _name).put(items);
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
