// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = "hcStage2Agree";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      Ref: { type: Schema.Types.ObjectId, ref: "hCMasterForm" },
      TechName: { type: String, default: null },
      TechSign: { type: String, default: null },
      TechDate: { type: Date, default: null },
      TechTrade: { type: String, default: null },
      SvName: { type: String, default: null },
      SvSign: { type: String, default: null },
      SvDate: { type: Date, default: null },
      SvTrade: { type: String, default: null },
      MngrName: { type: String, default: null },
      MngrSign: { type: String, default: null },
      MngrDate: { type: Date, default: null },
      MngrTrade: { type: String, default: null },
      Remarks: { type: String, default: null },
    },
    {
      timestamps: true,
    },
  );

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
};
