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
   , sinFunctionDisplay = mainCreatorWindow.lookup("SinFunctionDisplay")

   , amplitudeInputCos = mainCreatorWindow.lookup("AmplitudeInputCos")
   , frequencyInputCos = mainCreatorWindow.lookup("FrequencyInputCos")
   , xConstInputCos = mainCreatorWindow.lookup("XConstInputCos")
   , yConstInputCos = mainCreatorWindow.lookup("YConstInputCos")
   , rInputCos = mainCreatorWindow.lookup("RInputCos")
   , gInputCos = mainCreatorWindow.lookup("GInputCos")
   , bInputCos = mainCreatorWindow.lookup("BInputCos")
   , createCosButton = mainCreatorWindow.lookup("CreateCosButton")
   , cosFunctionDisplay = mainCreatorWindow.lookup("CosFunctionDisplay")

   , xConstInputLine = mainCreatorWindow.lookup("XConstInputLine")
   , yConstInputLine = mainCreatorWindow.lookup("YConstInputLine")
   , rInputLine = mainCreatorWindow.lookup("RInputLine")
   , gInputLine = mainCreatorWindow.lookup("GInputLine")
   , bInputLine = mainCreatorWindow.lookup("BInputLine")
   , createLineButton = mainCreatorWindow.lookup("CreateLineButton")
   , lineFunctionDisplay = mainCreatorWindow.lookup("LineFunctionDisplay")

   // Functions
   , functionCreated
   , init
   ;

functionCreated = function (handle) {

   dmz.grapher.functionCreatedMessage.send(dmz.data.wrapNumber(handle));
}

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
      functionCreated(sinFunction);
   }
});

createCosButton.observe (self, "clicked", function () {

   var amp = amplitudeInputCos.text()
     , freq = frequencyInputCos.text()
     , xConst = xConstInputCos.text()
     , yConst = yConstInputCos.text()
     , rColor = rInputCos.text()
     , gColor = gInputCos.text()
     , bColor = bInputCos.text()
     , rgbVector
     , cosFunction
     ;
   if (!freq || !xConst || !yConst || !rColor || !gColor || !bColor) {

      self.log.error("ERROR: Please enter all the required fields");
   }
   else {

      cosFunction = dmz.object.create(dmz.grapher.FunctionType);
      dmz.object.activate(cosFunction);

      dmz.object.state(cosFunction, dmz.grapher.TypeHandle, dmz.grapher.CosState);
      dmz.object.scalar(cosFunction, dmz.grapher.AmpHandle, parseFloat(amp));
      dmz.object.scalar(cosFunction, dmz.grapher.FreqHandle, parseFloat(freq));
      dmz.object.scalar(cosFunction, dmz.grapher.XConstHandle, parseFloat(xConst));
      dmz.object.scalar(cosFunction, dmz.grapher.YConstHandle, parseFloat(yConst));
      rgbVector = dmz.vector.create([parseFloat(rColor), parseFloat(gColor), parseFloat(bColor)]);
      dmz.object.vector(cosFunction, dmz.grapher.RGBColorHandle, rgbVector);
      dmz.object.text(cosFunction
                    , dmz.grapher.FunctionStringHandle
                    , dmz.grapher.functionToString(cosFunction));
      dmz.object.flag(cosFunction, dmz.grapher.SelectedHandle, false);
      functionCreated(cosFunction);
   }
});

createLineButton.observe (self, "clicked", function () {
   var xConst = xConstInputLine.text()
     , yConst = yConstInputLine.text()
     , rColor = rInputLine.text()
     , gColor = gInputLine.text()
     , bColor = bInputLine.text()
     , rgbVector
     , lineFunction
     ;

   if (!xConst || !yConst || !rColor || !gColor || !bColor) {

      self.log.error("ERROR: Please endter all the required fields");
   }
   else {

      lineFunction = dmz.object.create(dmz.grapher.FunctionType);
      dmz.object.activate(lineFunction);

      dmz.object.state(lineFunction, dmz.grapher.TypeHandle, dmz.grapher.LineState);
      dmz.object.scalar(lineFunction, dmz.grapher.XConstHandle, parseFloat(xConst));
      dmz.object.scalar(lineFunction, dmz.grapher.YConstHandle, parseFloat(yConst));
      rgbVector = dmz.vector.create([parseFloat(rColor), parseFloat(gColor), parseFloat(bColor)]);
      dmz.object.vector(lineFunction, dmz.grapherRGBColorHandle, rgbVector);
      dmz.object.text(lineFunction
                    , dmz.grapher.FunctionStringHandle
                    , dmz.grapher.functionToString(lineFunction));
      dmz.object.flag(lineFunction, dmz.grapher.SelectedHandle, false);
      functionCreated(lineFunction);
   }
});

dmz.grapher.addFunctionButtonMessage.subscribe(self, function () {

   if (mainCreatorWindow) { mainCreatorWindow.show(); }
   else { self.log.error("ERROR: Failed to initialize the Creator Window."); }
});

init = function () {
   if (mainCreatorWindow) {

      //mainCreatorWindow.show();
   }
   else {

      self.log.error("ERROR: Failed to initialize the Creator Window.");
   }
};

init();
