$(document).ready(function () {});

$("#prodNum").change(function () {
  var deNum = Number($("#prodNum option:selected").val());

  console.log(typeof deNum);
  console.log(deNum);
  $(".blowDes").html("");
  for (var i = 0; i < deNum; i++) {
    var sizeArr = [
      "Free",
      "Small",
      "Medium",
      "Large",
      "XLarge",
      "XXLarge",
      "XXXLarge",
    ];

    $(".blowDes").append(
      '<ul><label for=""></label>',
      sizeArr[i],
      ": ",
      '<input type="text"  placeholder="실측사이즈작성  예시)허리둘레 69cm(27.1 inch),엉덩이둘레 92cm ,전체길이 84cm"></ul>'
    );
  }
});
