const loadItems=()=>{
   
    $('#table-body').empty();
    const firestore = firebase.firestore();
    firestore
        .collection('items')
        .get().then((result)=>{
            result.forEach((records)=>{
                const data = records.data();
                const row=`
                <tr>
                    <th>${records.id}</th>
                    <td>${data.description}</td>
                    <td>${data.unitPrice}</td>
                    <td>${data.qtyOnHand}</td>
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
createItem=()=>{
    const tempItem={
        description:$('#description').val(), 
        unitPrice: $('#unit-price').val(),
        qtyOnHand:$('#qty-on-hand').val()
    };
    const database=firebase.firestore();
    database
    .collection("items")
    .add(tempItem)
    .then((response)=>{
        toastr.options.closeMethod = 'fadeOut';
        toastr.options.closeDuration = 300;
        toastr.options.closeEasing = 'swing';
        toastr.success('Added!', 'success!')
        loadItems();
        
    })
    .catch((error)=>{
        alert("error")
    })
}

itemId=undefined;
const updateData=(id)=>{
    itemId=id;
    
    const firestore = firebase.firestore();
    firestore
        .collection('items')
        .doc(itemId)
        .get().then((response)=>{
            if (response.exists) {
                const data = response.data();
                $('#description').val(data.description), 
                $('#unit-price').val(data.unitPrice),
                $('#qty-on-hand').val(data.qtyOnHand)
            }

    })
}
const updateRecord=()=>{
    if (itemId){
        const firestore = firebase.firestore();
        firestore
            .collection('items')
            .doc(itemId)
            .update({
                description:$('#description').val(), 
                unitPrice: $('#unit-price').val(),
                qtyOnHand:$('#qty-on-hand').val()
            }).then(()=>{
            customerId=undefined;
            toastr.options.closeMethod = 'fadeOut';
            toastr.options.closeDuration = 300;
            toastr.options.closeEasing = 'swing';
            toastr.success('Updated!', 'success!')
            loadItems();
        })
    }
}

const deleteData=(id)=>{
    if (confirm('Are you sure?')){
        const firestore = firebase.firestore();
        firestore
            .collection('items')
            .doc(id)
            .delete()
            .then(()=>{

                toastr.options.closeMethod = 'fadeOut';
                toastr.options.closeDuration = 300;
                toastr.options.closeEasing = 'swing';
                toastr.success('Deleted!', 'success!')
                customerId=undefined;
                loadItems();
            })
    }
}