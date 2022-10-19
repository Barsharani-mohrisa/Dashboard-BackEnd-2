//const { user } = require('../models');
var db = require('../models');
const { sequelize } = require("../models"); 


const user = db.user;
const community = db.community;
const communityStaff = db.communityStaff;
const file = db.file;
const notice = db.notice;
const notice_file = db.notice_file;
const resident = db.resident;


const {res} = require('express');

var addUser = async (req,res)=>{
    let [data,created] = await user.findOrCreate({
        where:{first_name:'Barsha'},
        defaults:{ last_name:'Rath', employeeid:'AR001'
}
});
   // data.first_name = 'dummy';
    //data.save();


    console.log(data.dataValues);
    let response = {
        data:data,
        add:created
    }
    res.status(200).json(response)
}
/*
let UserId= null;
var addDepartmentUser = async(req,res) =>{ await  user.create({first_name:'Prasant', last_name:'Paichha', employeeid:'AR028'}
    ).then(data=>{
        console.log(data);
        UserId = data.id
        return user.createdepartment({name:'Math'});
    })
    .then(department=>{
        console.log(department);
        return department.findAll({ where: UserId});

    })
    .then(all => {
        console.log("All the user details are : ",all);
      })
    let response = {
        data:data
    }
    res.status(200).json(response)
}
*/


var User = async (req,res)=>{
    let data = await user.findAll({
      
});
   // data.first_name = 'dummy';
    //data.save();


   
    res.status(200).json(data)
}



var add_supervisior = async (req,res)=>{
    let transaction;
    try {
        transaction = await sequelize.transaction();
            // chain all your queries here. make sure you return them.
            const data = await user.create({
                first_name:req.body.first_name, 
                last_name:req.body.last_name, 
                email:req.body.email,
                phone:"+91"+req.body.phone,
                password:req.body.password,
                date_joined:req.body.date_joined,
                is_active:'1',
                is_admin_approved:'1',
                is_staff:'1',
                is_superuser:'0'
            }, { transaction });
            await communityStaff.create({
                role: 'management',
                community_id:req.body.community_id,
                user_id: data.id
            }, { transaction });
            
        
        console.log('success');
        await transaction.commit(); 
    } catch (error) {
        console.log('error');
       
       
    }
    res.status(200).json(user)

}

var add_security = async (req,res)=>{
    let transaction;
    try {
        transaction = await sequelize.transaction();
            // chain all your queries here. make sure you return them.
            const data = await user.create({
                first_name:req.body.first_name, 
                last_name:req.body.last_name, 
                email:req.body.email,
                phone:"+91"+req.body.phone,
                password:req.body.password,
                date_joined:req.body.date_joined,
                is_active:'1',
                is_admin_approved:'1',
                is_staff:'1',
                is_superuser:'0'
            }, { transaction });
            await communityStaff.create({
                role: 'security',
                community_id:req.body.community_id,
                user_id: data.id
            }, { transaction });
        console.log('success');
        await transaction.commit(); 
    } catch (error) {
        console.log('error');  
    }
    res.status(200).json(user)

}
var add_staff = async (req,res)=>{
    let transaction;
    try {
        transaction = await sequelize.transaction();
            // chain all your queries here. make sure you return them.
            const data = await user.create({
                first_name:req.body.first_name, 
                last_name:req.body.last_name, 
                email:req.body.email,
                phone:"+91"+req.body.phone,
                password:req.body.password,
                date_joined:req.body.date_joined,
                is_active:'1',
                is_admin_approved:'1',
                is_staff:'1',
                is_superuser:'0'
            }, { transaction });
            await resident.create({
                role: req.body.role,
                occupancy_status:req.body.occupancy_status,
                flat_id:req.body.flat_id,
                user_id: data.id
            }, { transaction });
            
        
        console.log('success');
        await transaction.commit(); 
    } catch (error) {
        console.log('error');
       
       
    }
    res.status(200).json(user)

}



/*
  try {
        await sequelize.transaction(async function (transaction) {
            // chain all your queries here. make sure you return them.
            const user = await User.create({
                name: 'Van Helsing'
            }, { transaction });
            
            await ShippingAddress.create({
                address: 'Transylvania',
                user_id: user.id
            }, { transaction });
            
            return user;
        });
        console.log('success');
    } catch (error) {
        console.log('error');
    }
}
*/

var Validationconst = async (req,res)=>{
    try{
    let data = await user.create({first_name:'Barsha', last_name:'Rath', employeeid:'AR009'});
    }catch(err){
        console.log(err);
        const messages = {};
        err.errors.forEach((error)=>{
            let message;
            switch (error.validatorKey){
            case 'not_unique':
                message = 'Duplicate Employeeid';
                break;
       } 
       messages[error.path]=message;
       console.log(messages);
      })
    }
   // data.first_name = 'dummy';
    //data.save();



    let response = {
        data:'val'
    }
    res.status(200).json(response)
}

var oneToOne = async (req,resp)=>{

    let data = await user.findAll({
        attributes:['first_name','last_name'],
        include:[{
            model:department,
            as:'Department Details',
            attributes:['name']
        }],
       where:{id:1} 
        
    });
    resp.status(200).json(data);
}
var belongsTo = async (req,resp)=>{

    let data = await department.findAll({
      include:user
        
    });
    resp.status(200).json(data);
}

var oneToMany = async (req,resp)=>{

    let data = await user.findAll({
        attributes:['first_name','last_name'],
        include:[{
            model:department,
            as:'Department Details',
            attributes:['name']
        }],
       where:{id:1} 
    });
    resp.status(200).json(data);
}

var belongsTo = async (req,resp)=>{

    let data = await department.findAll({
        attributes:['first_name','last_name'],
        include:[{
            model:user,
            as:'userInfo',
            attributes:['first_name','last_name']
        }]
    });
    resp.status(200).json(data);
}

var manyToMany = async (req,resp)=>{

    let data = await user.findAll({
        attributes:['first_name','last_name'],
        include:[{
            model:department,
           as:'Department Details',
           attributes:['name']
        }],
    
    });
    resp.status(200).json(data);
}

var create_notice = async (req,res)=>{
    let transaction;
    try {
        transaction = await sequelize.transaction();
            // chain all your queries here. make sure you return them.
            const data = await notice.create({
                subject:req.body.subject, 
                message:req.body.message,
                author_id:"11",
                community_id:"1"
            }, { transaction });
            console.log(data);

            const image= await file.create({
                media: req.file.filename,
                owner_id: "11"
            },
             { transaction });
            console.log(image);

            await notice_file.create({
                notice_id: data.id,
                file_id: image.id
            }, { transaction });
            
        
        console.log('success');
        await transaction.commit(); 
    } catch (error) {
        console.log(error);
       
       
    }
    res.status(200).json({message:'uploaded'})

}
    var multer = async (req,res)=>{
       console.log(req.file);
       let data = await file.create({
           profile_pic:req.file.filename    
       });
       try{
           data = await data.save();
       }catch(err){
           console.log(err,'error');
       }
        res.status(200).json({message:'uploaded'})
    }

module.exports ={
   addUser,
   User,
   Validationconst,
   add_supervisior,
   add_security,
   add_staff,
   oneToOne,
   belongsTo,
   oneToMany,
   manyToMany,
   create_notice,
   multer
}