var dmz =
   { defs: require("dmz/runtime/definitions")
   , object: require("dmz/components/object")
   , objectType: require("dmz/runtime/objectType")
   , module: require("dmz/runtime/module")
   , util: require("dmz/types/util")
   , mask: require("dmz/types/mask")
   , vector: require("dmz/types/vector")
   , message: require("dmz/runtime/messaging")
   }

  , ObjectTypes =
     { FunctionType: dmz.objectType.lookup("equation")
     }
  , Handles =
     { TypeHandle: dmz.defs.createNamedHandle("function_type")
     , XConstHandle: dmz.defs.createNamedHandle("x_const")
     , YConstHandle: dmz.defs.createNamedHandle("y_const")
     , AmpHandle: dmz.defs.createNamedHandle("amp")
     , FreqHandle: dmz.defs.createNamedHandle("freq")
     , XValHandle: dmz.defs.createNamedHandle("x_val")
     , PolyDataHandle: dmz.defs.createNamedHandle("poly_data")
     , PolyDataArrayHandle: dmz.defs.createNamedHandle("data_array")
     , PolyDataArrayLengthHandle: dmz.defs.createNamedHandle("data_array_length")
     , SelectedHandle: dmz.defs.createNamedHandle("selected_handle")
     , FunctionStringHandle: dmz.defs.createNamedHandle("function_string")
     , RGBColorHandle: dmz.defs.createNamedHandle("RGB_value")
     , LinkHandle1: dmz.defs.createNamedHandle("link_handle_1")
     , LinkHandle2: dmz.defs.createNamedHandle("link_handle_2")
     }
  , States =
     { SinState: dmz.defs.lookupState("SIN_FUNC")
     , CosState: dmz.defs.lookupState("COS_FUNC")
     , LineState: dmz.defs.lookupState("LINE_FUNC")
     , PolyState: dmz.defs.lookupState("POLY_FUNC")
     }
  , Functions =
     { functionToString: false
     }
  , Messages =
    { functionCreatedMessage: dmz.message.create("FunctionCreatedMessage")
    , addFunctionButtonMessage: dmz.message.create("AddFunctionButtonMessage")
    }

  , functionToString

  , DEBUG = false;
  ;

functionToString = function (functionHandle) {

   var SinFunctionTypeMask = dmz.mask.create(States.SinState)
     , CosFunctionTypeMask = dmz.mask.create(States.CosState)
     , LineFunctionTypeMask = dmz.mask.create(States.LineState)
     , PolyFunctionTypeMask = dmz.mask.create(States.PolyState)
     , xConst = dmz.object.scalar(functionHandle, Handles.XConstHandle)
     , yConst = dmz.object.scalar(functionHandle, Handles.YConstHandle)
     , amp = dmz.object.scalar(functionHandle, Handles.AmpHandle)
     , freq = dmz.object.scalar(functionHandle, Handles.FreqHandle)
     , xVal = dmz.object.scalar(functionHandle, Handles.XValHandle)
     , currentState = dmz.object.state(functionHandle, Handles.TypeHandle)
     , polyData = dmz.object.data(functionHandle, Handles.PolyDataHandle)
     , polyDataLength
     , equationString = ""
     , itor
     ;

   if (currentState.equal(SinFunctionTypeMask)) {

      equationString = amp + " * sin(" + freq + "x + " + xConst + " ) + " + yConst;
      if (DEBUG) { self.log.warn(equationString); }
   }
   if (currentState.equal(CosFunctionTypeMask)) {

      equationString = amp + " * cos(" + freq + "x + " + xConst + " ) + " + yConst;
      if (DEBUG) { self.log.warn(equationString); }
   }
   if (currentState.equal(LineFunctionTypeMask)) {

      equationString = xConst + "x + " + yConst;
      if (DEBUG) { self.log.warn(equationString); }
   }
   if (currentState.equal(PolyFunctionTypeMask)) {
      polyDataLength = polyData.number(Handles.PolyDataArrayLengthHandle
                                     , Handles.PolyDataArrayLengthHandle)

      for (itor = 0; itor < polyDataLength; itor++) {

         equationString += "(" + polyData.number(Handles.PolyDataArrayHandle, itor)
                                + "x^" + (polyDataLength - itor) + ") + ";
      }
      equationString += yConst;
      if (DEBUG) { self.log.warn(equationString); }
   }
   return equationString;
};

Functions.functionToString = functionToString;

(function () {

   Object.keys(ObjectTypes).forEach(function (objectTypeName) {

      dmz.util.defineConst(exports, objectTypeName, ObjectTypes[objectTypeName]);
   });

   Object.keys(Handles).forEach(function (handleName) {

      dmz.util.defineConst(exports, handleName, Handles[handleName]);
   });

   Object.keys(States).forEach(function (stateName) {

      dmz.util.defineConst(exports, stateName, States[stateName]);
   });

   Object.keys(Functions).forEach(function (fncName) {

      dmz.util.defineConst(exports, fncName, Functions[fncName]);
   });

   Object.keys(Messages).forEach(function (msgName) {

      dmz.util.defineConst(exports, msgName, Messages[msgName]);
   });

}());
