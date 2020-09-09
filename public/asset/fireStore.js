imgList = [];

function postToFirStore() {
  var sizeList = [];

  // for (var i=0; i<7; i++){
  //   if($("#size"+i).val()=undefined){
  //     console.log($("#size"+i).val())
  //   }
  // }

  if (!imgList[1]) {
    alert("첨부한 이미지의 저장버튼을 누르세요");
  } else {
    //   var user = firebase.auth().currentUser;
    //   if (user) { else면 로그인 페이지로 이동
    console.log("post To FireStore start");

    var _uploadDate = new Date();

    firebase
      .firestore()
      .collection("postProduct")
      .add({
        productName: $("#productName").val(),
        thumbnail_img: imgList[0],
        detail_img: imgList[1],
        ODD_can: $("#onedaydeli_can").is(":checked"),
        uploadDate: _uploadDate,
        sizeList: {
          size0:
            typeof $("#size0").val() == "undefined" ? null : $("#size0").val(),
          size1:
            typeof $("#size1").val() == "undefined" ? null : $("#size1").val(),
          size2:
            typeof $("#size2").val() == "undefined" ? null : $("#size2").val(),
          size3:
            typeof $("#size3").val() == "undefined" ? null : $("#size3").val(),
          size4:
            typeof $("#size4").val() == "undefined" ? null : $("#size4").val(),
          size5:
            typeof $("#size5").val() == "undefined" ? null : $("#size5").val(),
          size6:
            typeof $("#size6").val() == "undefined" ? null : $("#size6").val(),
        },
        sizeDesList: {
          sizeDes0:
            typeof $("#sizeDes0").val() == "undefined"
              ? null
              : $("#sizeDes0").val(),
          sizeDes1:
            typeof $("#sizeDes1").val() == "undefined"
              ? null
              : $("#sizeDes1").val(),
          sizeDes2:
            typeof $("#sizeDes2").val() == "undefined"
              ? null
              : $("#sizeDes2").val(),
          sizeDes3:
            typeof $("#sizeDes3").val() == "undefined"
              ? null
              : $("#sizeDes3").val(),
          sizeDes4:
            typeof $("#sizeDes4").val() == "undefined"
              ? null
              : $("#sizeDes4").val(),
          sizeDes5:
            typeof $("#sizeDes5").val() == "undefined"
              ? null
              : $("#sizeDes5").val(),
          sizeDes6:
            typeof $("#sizeDes6").val() == "undefined"
              ? null
              : $("#sizeDes6").val(),
        },
        style: {
          product_Style: $("#StyleList option:selected").val(),
        },
        category: {
          product_category: $("#category option:selected").val(),
        },

        // StyleList:
        // TypeList:
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
