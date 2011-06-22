var dmz =
   { defs: require("dmz/runtime/definitions")
   , object: require("dmz/components/object")
   , objectType: require("dmz/runtime/objectType")
   , module: require("dmz/runtime/module")
   , util: require("dmz/types/util")
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
     }
  , States =
     { SinState: dmz.defs.lookupState("SIN_FUNC")
     , CosState: dmz.defs.lookupState("COS_FUNC")
     , LineState: dmz.defs.lookupState("LINE_FUNC")
     , PolyState: dmz.defs.lookupState("POLY_FUNC")
     }
  ;

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

}());
