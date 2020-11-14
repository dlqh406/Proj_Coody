function templateBoard(element) {
  return `
  <tr>
  <td>${element.uid}</td>
  <td>${element.etc}</td>
  <td>${element.name}</td>
  <td>${element.orderColor}</td>
  <td>${element.orderQuantity}</td>
  <td>${element.orderSize}</td>
  <td>${element.phone}</td>
  <td>${element.productCode}</td>
  <td>${element.productPrice}</td>
  <td>${element.seller}</td>
  <td>${element.address}</td>
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
        style="border-collapse: collapse"
    >
    <thead>
    <tr>
      <th>orderCode</th>
      <th>uid</th>
      <th>etc</th>
      <th>name</th>
      <th>orderColor</th>
      <th>orderQuantity</th>
      <th>orderSize</th>
      <th>phone</th>
      <th>productCode</th>
      <th>productPrice</th>
      <th>seller</th>
      <th>address</th>
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
