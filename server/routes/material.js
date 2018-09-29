let db = require('../models')

exports.new = function(req, res) {
  res.render('material/new');
};

exports.findAll = function(req, res) {
  let query = db.datastore.createQuery('material');
  db.datastore.runQuery(query).then(materials => {
    //If we find some data storaged
    if (materials[0].length > 0) {
      let materialJson =  [];
      materials[0].forEach(material => {
        materialJson.push({
          "material" : material,
          "id": material[db.datastore.KEY]['id']
        });
      });
      res.render('material/show',{materials: materialJson});
    }else{
      res.render('material/show');
    }
  });
}

exports.find = function(req, res) {
  //Finding material by id
  findMaterial(req.param('id'),res,'');
}

exports.create = function(req, res) {
  //JSON of data
  let materialKey = db.datastore.key('material');// Chave cloud para a entidade
  let material = {
    key: materialKey,
    data: req.body,
  };

  db.datastore.save(material).then(function(item) {
    console.log(`Material ${materialKey.id} created successfully.`);
     /* Rendering back the saved material, note that we can send mutiplies JSON to HTML, here
     * we are sending the Material and Message
     */
     findMaterial(item[0].mutationResults[0].key.path[0]['id'], res, '')
  }, function (error) {
    res.status(500).send('Error! '+error);
  });//End of datastore save
}

exports.update = function(req, res) {
  //Finding material by ID param
  let filter = db.datastore.key(['material', db.datastore.int(req.param('id'))]);
  db.datastore.get(filter, function(err, material){
    if (material) {
      /* Updatind all attributes without refreshing the page
       * If you want to update a few attributes, you can use the example bellow
       * result.updateAttributes({attr1: req.body.name, attr2: req.body.location}).then(function(result) {
       * note that which attr1 correspond to a column in table
       */
      let item = {
        key : filter,
        data : req.body
      }

      db.datastore.save(item).then(function(entity, err) {
        if (entity) {
          //Updated item, now rendering it
            findMaterial(req.param('id'),res,'It is updated!');
          //res.render('material/edit',{material: item, message: ""});
        }else{
          //Sends error if we get
          res.status(500).send('Error! '+err);
        }
      });
    }
  });
}

exports.destroy = function(req, res, next) {
  let filter = db.datastore.key(['material', db.datastore.int(req.param('id'))]);
  //Deleting from database
  db.datastore.delete(filter, function(err, apiResp){
    res.status(200);
    next();
  });
}

function findMaterial(materialID,res, p_message){
  let filter = db.datastore.key(['material', db.datastore.int(''+materialID)]);
  db.datastore.get(filter, function(err, entity){
    if(err){
      res.status(500).send('Error! '+err);
    }else{
      let materialJson =  [];
        materialJson.push({
          "material" : entity,
          "id": entity[db.datastore.KEY]['id']
        });
      res.render('material/edit',{material: materialJson, message : p_message});
    }
  });
}