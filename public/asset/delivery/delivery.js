function templateBoard(element) {
  return `
  <tr>
  <td>${element.orderCode}</td>
  <td>${element.uid}</td>
  
  <td>${element.productCode}</td>
  <td>${element.orderColor}</td>
  <td>${element.orderSize}</td>
  <td>${element.orderQuantity}</td>
  <td>${element.orderDate}</td>
  <td>${element.totalPrice}</td>

  <td>${element.name}</td>
  <td>${element.phone}</td>
  <td>${element.address}</td>
  <td>${element.etc}</td>


  <td>${element.seller}</td>


  </tr>
  `;
}

$(document).ready(function () {
  var docRef = firebase.firestore().collection("order");
  docRef.get().then((snapshot) => {
    var fir = `
    <table 
        border="1"
        cellpadding="10"
        style="border-collapse: collapse">

    <thead>
    <tr>

      <th>주문번호</th>
      <th>회원코드(암호화)</th>
      
      <th>상품코드</th>
      <th>주문 색상</th>
      <th>주문 사이즈</th>
      <th>주문 수량</th>
      <th>주문 일자</th>
      <th>주문 금액</th>

      <th>이름</th>
      <th>연락처</th>
      <th>주소</th>
      <th>기타 요청사항</th>
      
      <th>판매자</th>
      

    </tr>
    </thead>`;
    snapshot.docs.forEach((element) => {
      console.log(element);
      fir = fir + templateBoard(element.data());
    });
    fir += "</table>";
    $("#board").html(fir);
  });
});
