const loadCustomers=()=>{
   
    $('#table-body').empty();
    const firestore = firebase.firestore();
    firestore
        .collection('customers')
        .get().then((result)=>{
            result.forEach((records)=>{
                const data = records.data();
                const row=`
                <tr>
                    <th>${records.id}</th>
                    <td>${data.name}</td>
                    <td>${data.address}</td>
                    <td>${data.salary}</td>
                    <td>
                        <button class="btn btn-danger btn-sm" onclick="deleteData('${records.id}')">Delete</button> |
                        <button class="btn btn-success btn-sm" onclick="updateData('${records.id}')">Update</button>
                    </td>
                </tr>
                `;
                $('#table-body').append(row);
            });
    });

    
}
createCustomer=()=>{
    const tempCustomer={
        name:$('#name').val(), 
        address:$('#address').val(),
        salary:$('#salary').val()
    };
    const database=firebase.firestore();
    database
    .collection("customers")
    .add(tempCustomer)
    .then((response)=>{
        toastr.options.closeMethod = 'fadeOut';
        toastr.options.closeDuration = 300;
        toastr.options.closeEasing = 'swing';
        toastr.success('Added!', 'success!')
        loadCustomers();
    })
    .catch((error)=>{
        alert("error")
    })
}

customerId=undefined;
const updateData=(id)=>{
    customerId=id;
    const firestore = firebase.firestore();
    firestore
        .collection('customers')
        .doc(customerId)
        .get().then((response)=>{
            if (response.exists) {
                const data = response.data();
                $('#name').val(data.name);
                $('#address').val(data.address);
                $('#salary').val(data.salary)
            }
    })
}
const updateRecord=()=>{
    if (customerId){
        const firestore = firebase.firestore();
        firestore
            .collection('customers')
            .doc(customerId)
            .update({
                name: $('#name').val(),
                address: $('#address').val(),
                salary: $('#salary').val()
            }).then(()=>{
            customerId=undefined;
            loadCustomers();
        })
    }
}

const deleteData=(id)=>{
    if (confirm('Are you sure?')){
        const firestore = firebase.firestore();
        firestore
            .collection('customers')
            .doc(id)
            .delete()
            .then(()=>{

                toastr.options.closeMethod = 'fadeOut';
                toastr.options.closeDuration = 300;
                toastr.options.closeEasing = 'swing';
                toastr.success('Deleted!', 'success!')
                customerId=undefined;
                loadCustomers();
            })
    }
}