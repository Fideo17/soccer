'use strict';
const _ = require('lodash');
const util = require('util');	// Required in swagger sample controller
var controllerHelper = require('../helpers/controller.helper');
var messageHelper = require('../helpers/message.helper');
//var shortid = require('shortid');


const { soccer } = require('../models');	// Sequelize

////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////


// Module Name
const MODULE_NAME = '[gamesystem.controller]';

// Error Messages
const GS_CT_ERR_GAMESYSTEM_NOT_FOUND = 'Gamesystem not found';

// Success Messages
const GS_CT_DELETED_SUCCESSFULLY = 'Gamesystem deleted successfully';

////////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
////////////////////////////////////////////////////////////////////////////////
function getSoccerbyId(req, res) {
  //console.log("operadores.controller getOperadorById");
  try {

    console.log(req.swagger.params.id.value);
    var id = req.swagger.params.id.value;
   
    console.log("soccer by id..." + id);
    //console.log(soccer);

    soccer.findByPk(id)
    .then(mysoccer => {
    console.log(mysoccer);
    res.status(200).send(mysoccer);
   })

  } catch (error) {
    console.log("Was an error");
    controllerHelper.handleErrorResponse(MODULE_NAME, getSoccerbyId.name, error, res);
  }
}

function getSoccers(req, res) {

  try {
        
   console.log("soccer...");
   console.log(soccer);
   soccer.findAll({
    /*include: [{
      model: orderstatus
     
    }]

    include: [{ all: true, nested: true }]*/
      })
   .then((consoles) => {
     console.log(consoles);
     res.status(200).send(consoles);
     //utils.writeJson(res, consoles);
   }, (error) => {
     res.status(500).send(error);
   });

  } catch (error) {
    controllerHelper.handleErrorResponse(MODULE_NAME, getSoccers.name, error, res);
  }
}

function updateSoccer(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  //console.log("operadores.controller getOperadorById");
  try {
    var id = req.swagger.params.id.value;
   
    console.log("params : " + id);
    var myupdatesoccer = req.body;
    console.log("update soccer ... " + myupdatesoccer.name + " " + myupdatesoccer.descripcion);
 

    soccer.findByPk(id)
      .then(mysoccer => {
        console.log("Result of findById: " + mysoccer);
        if (!mysoccer) {
          res.status(401).send(({}));
        
        }
        return mysoccer
          .update({ 
            name: myupdatesoccer.name, 
            team: myupdatesoccer.team,
            league: myupdatesoccer.league,
            dtechnical: myupdatesoccer.dtechnical
            

           })
          .then(() => res.status(200).send(mysoccer) )
          .catch(error => res.status(403).send(mysoccer));
        })
      .catch(error => {
          console.log("There was an error: " + error);
          //resolve(error);
    });

  } catch (error) {
      console.log("Was an error");
      controllerHelper.handleErrorResponse(MODULE_NAME, updateSoccer.name, error, res);
  }

}

function addSoccer(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  try {

    console.log("params : ");
    var mysoccer = req.body;
    console.log("soccer ... " + mysoccer);
 
      return soccer
        .create({
          name: mysoccer.name,
          team: mysoccer.team,
          league: mysoccer.league,
          dtechnical: mysoccer.dtechnical,
          createdAt: mysoccer.createdAt,
          updatedAt: mysoccer.updatedAt

        }, {
        /*  include: [{
            model: order_detail,
            as: 'orderdetail'
          }] */
        })
        .then((mysocc) => {
          res.status(201).send(mysocc);
              
        })
        .catch((error) => res.status(400).send(error));
    

  } catch (error) {
    console.log("Was an error");
    controllerHelper.handleErrorResponse(MODULE_NAME, addSoccer.name, error, res);
  }
}


function deleteSoccer(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  res.header('Access-Control-Allow-Headers', 'Content-Type');
 
  console.log(req.swagger.params.id.value);
  var id = req.swagger.params.id.value;
 
  soccer.findByPk(id)
  //Soccer.findById(id)
    .then(mysoccer => {
      console.log("Result of findById: " + mysoccer);
      if (!mysoccer) {
        res.status(200).send({"success": 0, "description":"not found !"});
      }
      else
      {
      return mysoccer
        .destroy()
        .then(() => res.status(200).send({"success": 1, "description":"deleted!"}))
        .catch(error => res.status(403).send({"success": 0, "description":"error !"}))
      }
    })
    .catch(error => {
      console.log("There was an error: " + error);
    });


}

module.exports = {
  getSoccerbyId,
  getSoccers,
  updateSoccer,
  addSoccer,
  deleteSoccer,
  GS_CT_ERR_GAMESYSTEM_NOT_FOUND,
  GS_CT_DELETED_SUCCESSFULLY,
  MODULE_NAME
}