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
   , mainWindow = dmz.ui.loader.load("FunctionCreator.ui")
   , functionList = mainWindow.lookup("FunctionList")
   ;

