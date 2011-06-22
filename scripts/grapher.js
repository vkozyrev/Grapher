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
      }
   , util: require("dmz/types/util")
   , vector: require("dmz/types/vector")
   , graphlib: require("dmz/types/graph")
   , resources: require("dmz/runtime/resources")
   }

   //UI
   , mainWindow = dmz.ui.loader.load("Grapher.ui")
   , grapherView = mainWindow.lookup("grapherView")
   , addNewFunctionButton = mainWindow.lookup("addNewFunctionButton")
   , nextFrameButton = mainWindow.lookup("nextFrameButton")
   , ampSlider = mainWindow.lookup("ampSlider")
   , freqSlider = mainWindow.lookup("freqSlider")

   // DMZ Function Object Definition
   , functions = []
   /*
   type = {sin, cos, linear, polynomial}

   for all: yConst, xConst
   for sin&cos: amp, freq
   for linear and parabolic: xVal
   */

   // DMZ Objects Types
   , FunctionType = dmz.objectType.lookup("equation")

   // DMZ States
   , SinState = dmz.defs.lookupState("SIN_FUNC")
   , CosState = dmz.defs.lookupState("COS_FUNC")
   , LineState = dmz.defs.lookupState("LINE_FUNC")
   , PolyState = dmz.defs.lookupState("POLY_FUNC")

   // DMZ Handles
   , TypeHandle = dmz.defs.createNamedHandle("function_type")
   , XConstHandle = dmz.defs.createNamedHandle("x_const")
   , YConstHandle = dmz.defs.createNamedHandle("y_const")
   , AmpHandle = dmz.defs.createNamedHandle("amp")
   , FreqHandle = dmz.defs.createNamedHandle("freq")
   , XValHandle = dmz.defs.createNamedHandle("x_val")
   , PolyDataHandle = dmz.defs.createNamedHandle("poly_data")
   , PolyDataArrayHandle = dmz.defs.createNamedHandle("data_array")
   , PolyDataArrayLengthHandle = dmz.defs.createNamedHandle("Data_array_length")

   // Constants
   , WIDTH = 551
   , HEIGHT = 431
   , MAX_X = 10
   , MAX_Y = 10
   , TOLERANCE = .05

   // Globals

   // Functions
   , drawFunction
   , xToScreenX
   , yToScreenY
   , init
   ;

xToScreenX = function (x) { return (WIDTH / (2 * MAX_X)) * (x + MAX_X); };

yToScreenY = function (y) { return HEIGHT - ((HEIGHT / (2 * MAX_Y)) * (y + MAX_Y)); };

drawFunction = function (tolerance) {
   var equation
     , xConst
     , yConst
     , amp
     , freq
     , xVal
     , yVal
     , currentState
     , polyData
     , xCoor
     , yCoor
     , itor
     , arrayItor
     , functionItor
     , xPolyVal
     , xStart
     , yStart
     , xEnd
     , yEnd
     , arrayLength
     , SinFunctionTypeMask = dmz.mask.create(SinState)
     , CosFunctionTypeMask = dmz.mask.create(CosState)
     , LineFunctionTypeMask = dmz.mask.create(LineState)
     , PolyFunctionTypeMask = dmz.mask.create(PolyState)
     , graphScene = dmz.ui.graph.createScene(0, 0, WIDTH, HEIGHT)
     , path = dmz.ui.graph.createPainterPath()
     ;
   graphScene.addLine(0, 216, WIDTH, 216);
   graphScene.addLine(276, 0, 276, HEIGHT);
   path.moveTo(0, 0);
   //path.lineTo (100, 100);

   for (functionItor = 0; functionItor < functions.length; functionItor++){

      equation = functions[functionItor];
      xConst = dmz.object.scalar(equation, XConstHandle);
      yConst = dmz.object.scalar(equation, YConstHandle);
      amp = dmz.object.scalar(equation, AmpHandle);
      freq = dmz.object.scalar(equation, FreqHandle);
      xVal = dmz.object.scalar(equation, XValHandle);
      currentState = dmz.object.state(equation, TypeHandle);
      polyData = dmz.object.data(equation, PolyDataHandle);


      if (currentState.equal(SinFunctionTypeMask)) {

         self.log.warn ("Sin State");
         xCoor = MAX_X * -1;
         yCoor = amp * (Math.sin((freq * xCoor) + xConst)) + yConst;
         xCoor = xToScreenX(xCoor);
         yCoor = yToScreenY(yCoor);
         path.moveTo(Math.floor(xCoor), Math.floor(yCoor));
         for (itor = (MAX_X * -1) + tolerance; itor < MAX_X ; itor += tolerance) {

            xCoor = itor;
            yCoor = amp * (Math.sin((freq * xCoor) + xConst)) + yConst;
            xCoor = xToScreenX(xCoor);
            yCoor = yToScreenY(yCoor);
            path.lineTo(Math.floor(xCoor), Math.floor(yCoor));
         }
      }

      if (currentState.equal(CosFunctionTypeMask)) {

         self.log.warn("Cos State");
         xCoor = MAX_X * -1;
         yCoor = amp * (Math.cos ((freq * xCoor) + xConst)) + yConst;
         xCoor = xToScreenX(xCoor);
         yCoor = yToScreenY(yCoor);
         path.moveTo (Math.floor(xCoor), Math.floor(yCoor));
         for (itor = (MAX_X * -1) + tolerance; itor < MAX_X ; itor += tolerance) {

            xCoor = itor;
            yCoor = amp * (Math.cos ((freq * xCoor) + xConst)) + yConst;
            xCoor = xToScreenX(xCoor);
            yCoor = yToScreenY(yCoor);
            path.lineTo(Math.floor (xCoor), Math.floor (yCoor));
         }
      }

      if (currentState.equal(LineFunctionTypeMask)) {

         self.log.warn("Line State");
         xStart = MAX_X * -1;
         xEnd = MAX_X;
         yStart = (xConst * xStart) + yConst
         yEnd = (xConst * xEnd) + yConst
         xStart = xToScreenX(xStart);
         xEnd = xToScreenX(xEnd);
         yStart = yToScreenY(yStart);
         yEnd = yToScreenY(yEnd);
         path.moveTo(Math.floor(xStart), Math.floor(yStart));
         path.lineTo(Math.floor(xEnd), Math.floor(yEnd));
      }

      if (currentState.equal(PolyFunctionTypeMask)) {

         self.log.warn("Polynomic State");
         arrayLength = polyData.number(PolyDataArrayLengthHandle, PolyDataArrayLengthHandle);
         xVal = MAX_X * -1;
         yVal = 0;
         for (arrayItor = 0; arrayItor < arrayLength; arrayItor++){

            xPolyVal = polyData.number(PolyDataArrayHandle, arrayItor);
            yVal += xPolyVal * Math.pow(xVal, arrayLength - arrayItor);
         }
         yVal += yConst;
         self.log.warn(xVal, yVal);
         xVal = xToScreenX(xVal);
         yVal = yToScreenY(yVal);
         path.moveTo(xVal, yVal);
         for (itor = (MAX_X * -1) + tolerance; itor < MAX_X; itor += tolerance){

            xVal = itor;
            yVal = 0;
            for (arrayItor = 0; arrayItor < arrayLength; arrayItor++){

               xPolyVal = polyData.number(PolyDataArrayHandle, arrayItor);
               yVal += xPolyVal * Math.pow(xVal, arrayLength - arrayItor);
            }
            yVal += yConst;
            self.log.warn(xVal, yVal);
            xVal = xToScreenX(xVal);
            yVal = yToScreenY(yVal);
            path.lineTo(xVal, yVal);
            yVal = 0;
         }
      }
   }
   graphScene.addPath(path);
   grapherView.scene(graphScene);
};

init = function () {
   var sinFunction
     , polyFunction
     , lineFunction
     , data
     , polyValues
     , itor
     , graphScene
     ;

   // create initial sin function
   sinFunction = dmz.object.create(FunctionType);
   dmz.object.activate(sinFunction);

   dmz.object.state(sinFunction, TypeHandle, SinState);
   dmz.object.scalar(sinFunction, XConstHandle, 0);
   dmz.object.scalar(sinFunction, YConstHandle, 0);
   dmz.object.scalar(sinFunction, AmpHandle, 4);
   dmz.object.scalar(sinFunction, FreqHandle, Math.PI);
   functions.push(sinFunction);

   // create a line function
   lineFunction = dmz.object.create(FunctionType);
   dmz.object.activate(lineFunction);

   dmz.object.state(lineFunction, TypeHandle, LineState);
   dmz.object.scalar(lineFunction, YConstHandle, 0);
   dmz.object.scalar(lineFunction, XConstHandle, 1)
   functions.push(lineFunction);

   // create initial poly function
   polyFunction = dmz.object.create(FunctionType);
   dmz.object.activate(polyFunction);

   polyValues = [-3, -1.5, 2];
   data = dmz.data.create();
   for (itor = 0; itor < polyValues.length; itor++){

      data.number(PolyDataArrayHandle, itor, polyValues[itor]);
      data.number(PolyDataArrayLengthHandle, PolyDataArrayLengthHandle, polyValues.length);
   }
   dmz.object.state(polyFunction, TypeHandle, PolyState);
   dmz.object.scalar(polyFunction, YConstHandle, 0);
   dmz.object.data(polyFunction, PolyDataHandle, data);

   functions.push(polyFunction);

   //set up window
   dmz.ui.mainWindow.centralWidget(mainWindow);
   if (mainWindow) {

      graphScene = dmz.ui.graph.createScene(0, 0, WIDTH, HEIGHT);
      grapherView.scene(graphScene);
      drawFunction(TOLERANCE);
   }
};

init();




