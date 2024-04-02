    // See http://mongoosejs.com/docs/models.html
    // for more of what you can do here.
    module.exports = function (app) {
        const modelName = 'cbStage1';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
                   Ref: { type: Schema.Types.ObjectId, ref: "cBMasterForm" },
       ExternalBody: { type: String, default: null },
       InternalBody: { type: String, default: null },
       DisplayPanel: { type: String, default: null },
       DoorHandle: { type: String, default: null },
       CoinReturnLever: { type: String, default: null },
       CoinReturnPocket: { type: String, default: null },
       DeliveryDoorFlap: { type: String, default: null },
       SecDoorPanel: { type: String, default: null },
       SecDoorFlap: { type: String, default: null },
       ColumnStnd: { type: String, default: null },
       ColumnMod: { type: String, default: null },
       ColumnFlipper: { type: String, default: null },
       ProductChute: { type: String, default: null },
       MachineMaintenance: { type: String, default: null },
       PSUBoard: { type: String, default: null },
       VendBoard: { type: String, default: null },
       RelaySupply: { type: String, default: null },
       MemoryBoard: { type: String, default: null },
       Remote: { type: String, default: null },
       Compressor: { type: String, default: null },
       CoolingFan: { type: String, default: null },
       Wiring: { type: String, default: null },
       Motor: { type: String, default: null },

            
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