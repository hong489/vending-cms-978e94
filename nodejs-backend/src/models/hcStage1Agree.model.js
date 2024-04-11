    // See http://mongoosejs.com/docs/models.html
    // for more of what you can do here.
    module.exports = function (app) {
        const modelName = 'hcStage1Agree';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
                   Ref: { type: Schema.Types.ObjectId, ref: "hCMasterForm" },
       TechName: { type: String, default: null },
       TechSign: { type: String, default: null },
       TechDate: { type: Date, default: null },
       TechProceed: { type: Boolean, default: null },
       SvName: { type: String, default: null },
       SvSign: { type: String, default: null },
       SvDate: { type: Date, default: null },
       SvProceed: { type: Boolean, default: null },
       ManagerName: { type: String, default: null },
       ManagerSign: { type: String, default: null },
       ManagerDate: { type: Date, default: null },
       ManagerProceed: { type: Boolean, default: null },
       Remarks: { type: String, default: null },

            
          },
          {
            timestamps: true
        });
      
        // This is necessary to avoid model compilation errors in watch mode
        // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };