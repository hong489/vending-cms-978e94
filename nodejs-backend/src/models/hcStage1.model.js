    // See http://mongoosejs.com/docs/models.html
    // for more of what you can do here.
    module.exports = function (app) {
        const modelName = 'hcStage1';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
                   Ref: { type: Schema.Types.ObjectId, ref: "hCMasterForm" },
       ExternalBody: { type: String , enum: ["average","good"] },
       InternalBody: { type: String, default: null },
       DisplayPanel: { type: String, default: null },
       DoorHandle: { type: String, default: null },
       CoinReturnLever: { type: String, default: null },
       CoinReturnPocket: { type: String, default: null },
       DeliveryDoorflap: { type: String, default: null },
       SelectorButton: { type: String, default: null },
       BodySticker: { type: String, default: null },
       ProductCanister: { type: String, default: null },
       Chute: { type: String, default: null },
       Tube: { type: String, default: null },
       CarbonationUnit: { type: String, default: null },
       SyrupCanister: { type: String, default: null },
       Valve: { type: String, default: null },
       MachineFloorBoard: { type: String, default: null },
       PaymentDevice: { type: String, default: null },
       CashlessUnit: { type: String, default: null },
       PSUBoard: { type: String, default: null },
       VendBoard: { type: String, default: null },
       RelaySupply: { type: String, default: null },
       MemoryBoard: { type: String, default: null },
       Remote: { type: String, default: null },
       Compressor: { type: String, default: null },
       CoolingFan: { type: String, default: null },
       IceMaker: { type: String, default: null },

            
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