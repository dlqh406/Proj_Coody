$(document).ready(function () {});

$("#countSize").change(function () {
  var deNum = Number($("#countSize option:selected").val());
  console.log("사이즈개수 선택: " + deNum);

  $(".belowSize").html("");
  for (var i = 0; i < deNum; i++) {
    $(".belowSize").append(
      ' <ul><input type="text" id="size' +
        i +
        '" placeholder="사이즈입력 예시)free,small,medium,22,23">' +
        '<input type="text" id="sizeDes' +
        i +
        '"  placeholder="실측사이즈 입력 예시)어깨 , 가슴 , 총기장 , 팔길이 ">' +
        "</ul>"
    );
  }
});

$("#countColor").change(function () {
  var deNum = Number($("#countColor option:selected").val());
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
