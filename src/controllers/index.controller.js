const { response } = require('express');
const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: "johan",
    database: 'empresa',
    port:'5432'
})

/*se realiza todo el crud dentro de este mismo documento, sin embargo cabe aclarar que para realizar un microservicio mas limpio
cuando sea mas complejo, se realizan diferentes documentos dentro de la carpeta controller que contendra cada metodo.*/

const getUser= async (req, res)=> {
   const response =await pool.query('SELECT * FROM empleados'); 
   res.json({
    message: 'Search Succesfully',
    body:{
        response:(response.rows)
    },
    status:200
});
   
};

const getUserById = async(req,res)=>{
    const id=req.params.id;
    const response = await pool.query('SELECT * FROM empleados WHERE codigo = $1', [id]); 
    const respuesta= response.rows;   
    if (JSON.stringify(respuesta)=='[]'){
        res.json({
            message: 'no found data,verify your entry',
            status:400
        });
    }else
    {
        res.json({
            message: 'Search Succesfully',
            body:{
                response:(response.rows)
            },
            status:200
        });
    }
         
};

const createUser = async(req,res)=>{
    try{
        const{codigo,nif,nombre,apellido1,apellido2,codigodepartamento}=req.body;
        const response=await pool.query('INSERT INTO empleados (codigo,nif,nombre,apellido1,apellido2,codigodepartamento) VALUES ($1,$2,$3,$4,$5,$6)', [codigo,nif,nombre,apellido1,apellido2,codigodepartamento]);
        console.log(response);
            res.json({
                message: 'User Added Succesfully',
                body:{
                    user: {codigo,nif,nombre,apellido1,apellido2,codigodepartamento}
                },
            status:200
        });
    }
    catch
    {
        res.json({
            message: 'field validation error',
            status:400
        });
    } 
};

const createDepa = async(req,res)=>{
    try{
        const{codigo,nombre,presupuesto}=req.body;
        const response=await pool.query('INSERT INTO departamento (codigo,nombre,presupuesto) VALUES ($1,$2,$3)', [codigo,nombre,presupuesto]);
        console.log(response);
            res.json({
                message: 'Departament Added Succesfully',
                body:{
                    user: {codigo,nombre,presupuesto}
                },
            status:200
        })
    }
    catch
    {
        res.json({
        message: 'field validation error,verify your entry',
        status:400
    })
    } 
};

const deleteUser = async(req,res)=>{
        const id=req.params.id;
        const response = await pool.query('DELETE FROM empleados WHERE codigo = $1',[id]);
        console.log(response);
        res.json({
        message: `User ${id} delete Succesfully`,
        status:200
    });
};

/*En el update quize realizar un tipo de resticciones el cual solo dejara actualizar nombre,apellido1,apellido2 y el codigo de departamento*/
const updateUser = async (req,res)=>{
    try{
        const id=req.params.id;
        const {nombre,apellido1,apellido2,codigodepartamento}=req.body;
        const response = await pool.query('UPDATE empleados SET nombre = $1, apellido1 = $2, apellido2 = $3, codigodepartamento = $4 WHERE codigo = $5',[nombre,apellido1,apellido2,codigodepartamento,id]);
        console.log(response);
        res.json({
            message:`User ${id} Update Succesfully`,
            body:{
                update:{nombre,apellido1,apellido2,codigodepartamento}
            },
            status:200
        });
    }
    catch{
        res.json({
            message: 'field validation error,verify your entry',
            status:400
        });
    }
}

module.exports ={
    getUser,
    createUser,
    createDepa,
    updateUser,
    getUserById,
    deleteUser
};