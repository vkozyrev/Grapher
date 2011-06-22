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
   , grapher: require("grapherConst")
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

   // Constants
   , WIDTH = 551
   , HEIGHT = 431
   , MAX_X = 10
   , MAX_Y = 10
   , TOLERANCE = .05

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
     , SinFunctionTypeMask = dmz.mask.create(dmz.grapher.SinState)
     , CosFunctionTypeMask = dmz.mask.create(dmz.grapher.CosState)
     , LineFunctionTypeMask = dmz.mask.create(dmz.grapher.LineState)
     , PolyFunctionTypeMask = dmz.mask.create(dmz.grapher.PolyState)
     , graphScene = dmz.ui.graph.createScene(0, 0, WIDTH, HEIGHT)
     , path = dmz.ui.graph.createPainterPath()
     ;
   graphScene.addLine(0, 216, WIDTH, 216);
   graphScene.addLine(276, 0, 276, HEIGHT);
   path.moveTo(0, 0);
   //path.lineTo (100, 100);

   for (functionItor = 0; functionItor < functions.length; functionItor++){

      equation = functions[functionItor];
      xConst = dmz.object.scalar(equation, dmz.grapher.XConstHandle);
      yConst = dmz.object.scalar(equation, dmz.grapher.YConstHandle);
      amp = dmz.object.scalar(equation, dmz.grapher.AmpHandle);
      freq = dmz.object.scalar(equation, dmz.grapher.FreqHandle);
      xVal = dmz.object.scalar(equation, dmz.grapher.XValHandle);
      currentState = dmz.object.state(equation, dmz.grapher.TypeHandle);
      polyData = dmz.object.data(equation, dmz.grapher.PolyDataHandle);


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
         arrayLength = polyData.number(dmz.grapher.PolyDataArrayLengthHandle
                                     , dmz.grapher.PolyDataArrayLengthHandle);
         xVal = MAX_X * -1;
         yVal = 0;
         for (arrayItor = 0; arrayItor < arrayLength; arrayItor++){

            xPolyVal = polyData.number(dmz.grapher.PolyDataArrayHandle, arrayItor);
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

               xPolyVal = polyData.number(dmz.grapher.PolyDataArrayHandle, arrayItor);
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
   sinFunction = dmz.object.create(dmz.grapher.FunctionType);
   dmz.object.activate(sinFunction);

   dmz.object.state(sinFunction, dmz.grapher.TypeHandle, dmz.grapher.SinState);
   dmz.object.scalar(sinFunction, dmz.grapher.XConstHandle, 0);
   dmz.object.scalar(sinFunction, dmz.grapher.YConstHandle, 0);
   dmz.object.scalar(sinFunction, dmz.grapher.AmpHandle, 4);
   dmz.object.scalar(sinFunction, dmz.grapher.FreqHandle, Math.PI);
   functions.push(sinFunction);

   // create a line function
   lineFunction = dmz.object.create(dmz.grapher.FunctionType);
   dmz.object.activate(lineFunction);

   dmz.object.state(lineFunction, dmz.grapher.TypeHandle, dmz.grapher.LineState);
   dmz.object.scalar(lineFunction, dmz.grapher.YConstHandle, 0);
   dmz.object.scalar(lineFunction, dmz.grapher.XConstHandle, 1)
   functions.push(lineFunction);

   // create initial poly function
   polyFunction = dmz.object.create(dmz.grapher.FunctionType);
   dmz.object.activate(polyFunction);

   polyValues = [-3, -1.5, 2];
   data = dmz.data.create();
   for (itor = 0; itor < polyValues.length; itor++){

      data.number(dmz.grapher.PolyDataArrayHandle, itor, polyValues[itor]);
      data.number(dmz.grapher.PolyDataArrayLengthHandle
                , dmz.grapher.PolyDataArrayLengthHandle
                , polyValues.length);
   }
   dmz.object.state(polyFunction, dmz.grapher.TypeHandle, dmz.grapher.PolyState);
   dmz.object.scalar(polyFunction, dmz.grapher.YConstHandle, 0);
   dmz.object.data(polyFunction, dmz.grapher.PolyDataHandle, data);

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




