const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Vendor = require('../models/vendor');
const VendorCard = require('../models/vendorCard');

const reportRouter = express.Router();

reportRouter.post('/report', (req, res, next) => {     
   var findingData = {
       0: '',
       1: '',
       2: '',
       3: '',
       4: '',
       5: '',
       6: '',
       7: ''
   };  
//----------------------------------TASK 0: Finding all registered vendors and return length of array--------------------------------------
    function task_0(){
        return new Promise((resolve) => {
                   
                if(req.body[0] == 'Registered vendors'){
                    Vendor.find({}, (err, doc) => {
                        if(err){console.log(err);}
                        findingData[0] = doc.length;                                                   
                        resolve();     
                    });                          
                }else {resolve();}                      
                              
        });
    }
//----------------------------------TASK 1: Finding vendors in food groups--------------------------------------
    function task_1(){
        return new Promise((resolve) => {
            let counter = {
                meat: 0,
                fastfood: 0,
                fruit: 0,
            };
                    
                if(req.body[1] == 'Vendors by group'){
                 Vendor.find({}, (err, doc) => {
                    if(err){console.log(err);}
                    for(let i = 0; i < doc.length; i++){
                        if(doc[i].foodGroup == 'Meat'){counter.meat++;}
                        if(doc[i].foodGroup == 'Fastfood'){counter.fastfood++;}
                        if(doc[i].foodGroup == 'Fruit'){counter.fruit++;}                        
                    }
                    findingData[1] = counter;                   
                    resolve();     
                 });                          
                } else{resolve();}                         
                        
        });
    }
//----------------------------------TASK 2: Middle OSS value--------------------------------------
    function task_2(){
      return new Promise((resolve) => {
         
            if(req.body[2] == 'Average OSS'){
                let counter = 0;
                let count = 0;          
              Vendor.find({}, (err, doc) => {
                  if(err){console.log(err);}
                  for(let i = 0; i < doc.length; i++){
                      count+=doc[i].oss;
                  }                  
                  counter = parseFloat((count/doc.length).toFixed(2));
                  findingData[2] = counter;                  
                  resolve();     
               });    
            }else{resolve();} 
          
      });  
    }
//----------------------------------TASK 3: Quantity of 'red flags'--------------------------------------
    function task_3(){
        return new Promise((resolve) => {
            
                if(req.body[3] == 'Total red flags'){
                    let counter = 0;
                    Vendor.find({}, (err, doc) =>{
                        if(err){console.log(err);}
                        for(let i = 0; i < doc.length; i++){
                            if(doc[i].flag == 'redFlagged'){
                                counter++;
                            }
                        }
                        findingData[3] = counter;                        
                        resolve();      
                    });
                }else {resolve();} 
            
        });
    }    
//----------------------------------TASK 4: Average of stars--------------------------------------
    function task_4(){
        return new Promise((resolve) => {
            
                if(req.body[4] == 'Average quality stars'){
                    let counter = 0;
                    Vendor.find({}, (err, doc) => {
                        if(err){console.log(err);}                        
                        for(let i = 0; i < doc.length; i++){
                            counter += doc[i].stars;
                        }
                        findingData[4] = counter;                        
                        resolve();
                    });
                }else{resolve();} 
            
        });
    }
//----------------------------------TASK 5: Quantity of hotline calls--------------------------------------
    function task_5(){
        return new Promise((resolve) => {
            
                if(req.body[5] == 'Hotline calls'){
                    let counter = 0;
                    Vendor.find({}, (err, doc) => {
                        if(err){console.log(err);}                        
                        for(let i = 0; i < doc.length; i++){
                            counter += doc[i].callCount;
                        }
                        findingData[5] = counter;                        
                        resolve();
                    });
                }else {resolve();} 
            
        });
    }
//----------------------------------TASK 6: Map transactions--------------------------------------

//----------------------------------TASK 7: Total revenues--------------------------------------
    function task_7(){
        return new Promise((resolve) => {
            
                if(req.body[7] == 'Total revenues'){ 
                    let counter = {
                        USD : 0,
                        RUR : 0,
                        BUR : 0,
                    }
                    VendorCard.find({}, (err, doc) => {
                        if(err){console.log(err);}  
                        for(let i = 0; i < doc.length; i++){
                            if(doc[i].money == 'USD'){
                                counter.USD += doc[i].cost;
                            }
                            if(doc[i].money == 'RUR'){
                                counter.RUR += doc[i].cost;
                            }
                            if(doc[i].money == 'BUR'){
                                counter.BUR += doc[i].cost;
                            }
                        }
                        findingData[7] = counter;
                        
                        resolve();
                    });
                }else {resolve();} 
            
        });
    }

    task_0()                //Finding all registered vendors and return length of array
    .then(() => task_1())   //Finding vendors in food groups
    .then(() => task_2())   //Middle OSS value
    .then(() => task_3())   //Quantity of 'red flags'
    .then(() => task_4())   //Average of stars
    .then(() => task_5())   //Hotline calls
    .then(() => task_7())   //Total revenues    
    .then(() => res.json(findingData));
});


module.exports = reportRouter;