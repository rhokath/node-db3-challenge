const db = require('../data/db-config');

module.exports = {
    find,
    findById, 
    findSteps,
    add, 
    update, remove,
    addStep
}

function find(){
    //returns a promise that resolves to an array of all schemes in db
    return db('schemes');
}

function findById(id){
    //expects a scheme id as a param, resolves to a single scheme obj, 
    //on invalid id, resolves to null
    return db('schemes').where({id}).first()

}

function findSteps(id){
    //expects a scheme id, resolves to an array of ordered steps for a given scheme
    //array should include scheme_name not the scheme_id
    //select * steps a s
    //join schemes as sc on sc.scheme_id = s.scheme_id
    //where s.id
    return db('schemes')
        .join('steps', 'schemes.id', 'steps.scheme_id')
        .where({scheme_id: id})
        .select('steps.id', 'steps.step_number', 'steps.instructions', 'schemes.scheme_name')
        .orderBy('steps.step_number')
        .then(steps => {
            return steps;
        })

}

function add(scheme){
    //expects a scheme obj, inserts a scheme into the db, resolves to the newly insert scheme including id
    return db('schemes')
        .insert(scheme)
        // .then(([id])=> {
        //    findById(id)
        // })
        
        
        
}

function update(changes, id){
    return db('schemes')
    .where({id})
    .update(changes, 'id')
        .then(updated=>{
            return updated;
        })

}

function remove(id){
    return db('schemes')
    .where({id})
    .del()

}

function addStep(stepData, id){
    //accepts an object and a scheme id, inserts a new step into the db linking to scheme
    return db('steps')
    .innerJoin('schemes', 'steps.scheme_id','=', 'schemes.id')
    .where({scheme_id: id})
    .insert(stepData)
}