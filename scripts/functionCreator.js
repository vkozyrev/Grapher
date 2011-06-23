var dmz =
   { object: require("dmz/components/object")
   , objectType: require("dmz/runtime/objectType")
   , defs: require("dmz/runtime/definitions")
   , data: require("dmz/runtime/data")
   , mask: require("dmz/types/mask")
   , matrix: require("dmz/types/matrix")
   , message: require("dmz/runtime/messaging")
   , sphere: require("dmz/runtime/sphere")
   , time: require("dmz/runtime/time")
   , ui:
      { loader: require("dmz/ui/uiLoader")
      , mainWindow: require("dmz/ui/mainWindow")
      , consts: require("dmz/ui/consts")
      , graph: require("dmz/ui/graph")
      , listWidget: require("dmz/ui/listWidget")
      }
   , util: require("dmz/types/util")
   , vector: require("dmz/types/vector")
   , graphlib: require("dmz/types/graph")
   , resources: require("dmz/runtime/resources")
   , grapher: require("grapherConst")
   }

   // UI
   , mainCreatorWindow = dmz.ui.loader.load("FunctionCreator.ui")

   , amplitudeInputSin = mainCreatorWindow.lookup("AmplitudeInputSin")
   , frequencyInputSin = mainCreatorWindow.lookup("FrequencyInputSin")
   , xConstInputSin = mainCreatorWindow.lookup("XConstInputSin")
   , yConstInputSin = mainCreatorWindow.lookup("YConstInputSin")
   , rInputSin = mainCreatorWindow.lookup("RInputSin")
   , gInputSin = mainCreatorWindow.lookup("GInputSin")
   , bInputSin = mainCreatorWindow.lookup("BInputSin")
   , createSinButton = mainCreatorWindow.lookup("CreateSinButton")

   , amplitudeInputCos = mainCreatorWindow.lookup("AmplitudeInputCos")
   , frequencyInputCos = mainCreatorWindow.lookup("FrequencyInputCos")
   , xConstInputCos = mainCreatorWindow.lookup("XConstInputCos")
   , yConstInputCos = mainCreatorWindow.lookup("YConstInputCos")
   , rInputCos = mainCreatorWindow.lookup("RInputCos")
   , gInputCos = mainCreatorWindow.lookup("GInputCos")
   , bInputCos = mainCreatorWindow.lookup("BInputCos")
   , createCosButton = mainCreatorWindow.lookup("CreateCosButton")

   , xConstInputLine = mainCreatorWindow.lookup("XConstInputLine")
   , yConstInputLine = mainCreatorWindow.lookup("YConstInputLine")
   , rInputLine = mainCreatorWindow.lookup("RInputLine")
   , gInputLine = mainCreatorWindow.lookup("GInputLine")
   , bInputLine = mainCreatorWindow.lookup("BInputLine")
   , createLineButton = mainCreatorWindow.lookup("CreateLineButton")

   // Functions
   , init
   ;

createSinButton.observe (self, "clicked", function () {

   var amp = amplitudeInputSin.text()
     , freq = frequencyInputSin.text()
     , xConst = xConstInputSin.text()
     , yConst = yConstInputSin.text()
     , rColor = rInputSin.text()
     , gColor = gInputSin.text()
     , bColor = bInputSin.text()
     , rgbVector
     , sinFunction
     ;
   if (!freq || !xConst || !yConst || !rColor || !gColor || !bColor) {

      self.log.error("ERROR: Please enter all the required fields");
   }
   else {

      sinFunction = dmz.object.create(dmz.grapher.FunctionType);
      dmz.object.activate(sinFunction);

      dmz.object.state(sinFunction, dmz.grapher.TypeHandle, dmz.grapher.SinState);
      dmz.object.scalar(sinFunction, dmz.grapher.AmpHandle, parseFloat(amp));
      dmz.object.scalar(sinFunction, dmz.grapher.FreqHandle, parseFloat(freq));
      dmz.object.scalar(sinFunction, dmz.grapher.XConstHandle, parseFloat(xConst));
      dmz.object.scalar(sinFunction, dmz.grapher.YConstHandle, parseFloat(yConst));
      rgbVector = dmz.vector.create([parseFloat(rColor), parseFloat(gColor), parseFloat(bColor)]);
      dmz.object.vector(sinFunction, dmz.grapher.RGBColorHandle, rgbVector);
      dmz.object.text(sinFunction
                    , dmz.grapher.FunctionStringHandle
                    , dmz.grapher.functionToString(sinFunction));
      dmz.object.flag(sinFunction, dmz.grapher.SelectedHandle, false);
   }
});

createCosButton.observe (self, "clicked", function () {


});

createLineButton.observe (self, "clicked", function () {


});

init = function () {
   if (mainCreatorWindow) {

      mainCreatorWindow.show();
   }
   else {

      self.log.error("ERROR: Failed to initialize the Creator Window.")
   }
}

init();

