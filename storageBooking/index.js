const express=require('express'),fs=require('fs'),app=express(),PORT=3000,DB='./db.json';app.use(express.json());

const read=()=>JSON.parse(fs.readFileSync(DB)).books,write=(data)=>fs.writeFileSync(DB,JSON.stringify({books:data},null,2));

app.post('/books',(req,res)=>{let b=read(),n={...req.body,id:b.length?b[b.length-1].id+1:1};b.push(n);write(b);res.status(201).json(n);});

app.get('/books',(req,res)=>res.json(read()));

app.get('/books/:id',(req,res)=>{let b=read().find(x=>x.id==req.params.id);b?res.json(b):res.status(404).json({message:'Book not found'});});

app.put('/books/:id',(req,res)=>{let b=read(),i=b.findIndex(x=>x.id==req.params.id);if(i==-1)return res.status(404).json({message:'Book not found'});b[i]={...b[i],...req.body,id:b[i].id};write(b);res.json(b[i]);});

app.delete('/books/:id',(req,res)=>{let b=read(),i=b.findIndex(x=>x.id==req.params.id);if(i==-1)return res.status(404).json({message:'Book not found'});let d=b.splice(i,1);write(b);res.json(d[0]);});

app.get('/books/search',(req,res)=>{let q=read(),{author:a,title:t}=req.query,f=q.filter(x=>(a&&x.author.toLowerCase().includes(a.toLowerCase()))||(t&&x.title.toLowerCase().includes(t.toLowerCase())));f.length?res.json(f):res.json({message:'No books found'});});

app.use((req,res)=>res.status(404).json({error:'404 Not Found'}));

app.listen(PORT,()=>console.log(`Server running @ http://localhost:${PORT}`));
