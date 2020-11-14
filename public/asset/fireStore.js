$("#countSize").change(function () {
  sdeNum = Number($("#countSize option:selected").val());
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
var _thumnailImgList = [];
var _sizeList = [];
var _colorList = [];
var _detialImgList = [];

function postToFirStore() {
  for (var i = 0; i < deNum; i++) {
    _colorList.push($("#color" + i).val());
  }

  for (var i = 0; i < sdeNum; i++) {
    _sizeList.push($("#size" + i).val());
  }

  var _tep = quill.root.innerHTML;
  var _resultQuill = _tep.replace(/<br>/gi, "");

  if (!_thumnailImgList && !_detialImgList) {
    alert("첨부한 이미지의 저장버튼을 누르세요");
  } else {
    console.log("post To FireStore start");

    var _uploadDate = new Date();

    firebase
      .firestore()
      .collection("uploaded_product")
      .add({
        productName: $("#productName").val(),
        price: $("#productPrice").val(),
        thumbnail_img: _thumnailImgList[0],
        detail_img: _detialImgList,
        ODD_can: $("#onedaydeli_can").is(":checked"),
        uploadDate: _uploadDate,
        soldCount: 0,
        productDecription: _resultQuill,
        sizeList: _sizeList,
        colorList: _colorList,
        style: $("#StyleList option:selected").val(),
        category: $("#category option:selected").val(),
        seller: "셀러이름을 설정해주세요",
      });
    console.log("uploade completed");
  }
}

function create_detailUrl() {
  $("#detail_img").val(function () {
    console.log("img input detected");
    console.log(this);
    for (var i = 0; i < this.files.length; i++) {
      if (
        this.files[i].type != "image/png" &&
        this.files[i].type != "video/mp4" &&
        this.files[i].type != "image/jpeg"
      ) {
        console.log(this.files[i].type);
        alert(this.files[i].name + "을 jpg/png 파일로 올려주세요 ");
        break;
      } else {
        onloadImage(this.files[i], i);
      }
    }

    // send to img obj
  });

  function onloadImage(input, index) {
    var items = input;
    var _itemsize = Math.round(items.size / 1024 / 1024);
    console.log("파일 용량: " + _itemsize + "mb");

    console.log(items);
    saveToStorage(input, index);
  }

  function saveToStorage(items, index) {
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
          _detialImgList[index] = downloadURL;
          for (var i = 0; i < _detialImgList.length; i++) {
            console.log("_detialImgList:" + "[" + i + "]" + _detialImgList[i]);
          }
        });
      }
    );
    $("#belowDetail").html("<span>상세 이미지 저장완료</span>");
  }
}

function create_thumbnailUrl() {
  $("#thumbnail_img").val(function () {
    console.log("img input detected");
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
  $("#belowthumnail").html("<span>썸네일 이미지 저장완료</span>");

  function saveToStorage(items) {
    var storageRef = firebase.storage().ref();
    var _name = items.name.replace(
      /[~`!#$%\^&*+=\-\[\]\\';,/{}()|\\":<>\?]/g,
      ""
    );
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
          _thumnailImgList.push(downloadURL);
        });
      }
    );
  }
}
