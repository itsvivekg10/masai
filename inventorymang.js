let Input= [

    { name: "Laptop", category: "Electronics", stock: 50, pricePerUnit: 1000 },
    
    { name: "Phone", category: "Electronics", stock: 150, pricePerUnit: 500 },
    
    { name: "T-shirt", category: "Clothing", stock: 40, pricePerUnit: 20 },
    
    { name: "Jeans", category: "Clothing", stock: 90, pricePerUnit: 40 },
    
    { name: "Watch", category: "Accessories", stock: 70, pricePerUnit: 150 } ]
    
    
    function findOutInventory(){
        let filterRes= Input.filter((ele,i)=>{ return ele.pricePerUnit>100})
        let mapRes = filterRes.map((ele,i)=>{return ele.pricePerUnit*(100-ele.stock)})
        console.log(mapRes)
    }
    findOutInventory(Input)
    
    