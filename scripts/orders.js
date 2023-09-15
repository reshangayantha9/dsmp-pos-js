const loadData=()=>{
    $('#orders-table-body').empty();

    const firestore = firebase.firestore();
    firestore
        .collection('orders')
        .get().then((result)=>{
        result.forEach((records)=>{
            const data = records.data();
            const row=`
                <tr>
                    <td>${records.id}</td>
                    <td>${data.customer.name}</td>
                    <td>${data.orderDate}</td>
                    <td>${data.totalCost}</td>
                    <td>
                        <button class="btn btn-dark btn-sm" onclick="printData('${records.id}')">Print</button>
                    </td>
                </tr>
                `;
            $('#orders-table-body').append(row);
        });
    });
}

const printData=(id)=>{
window.open(`order-details-page.html?id=${id}`);
}