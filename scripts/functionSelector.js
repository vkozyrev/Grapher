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
   , functionList = mainCreatorWindow.lookup("FunctionList")

   // Globals
   , functions = []

   // Functions
   , populateFunctionList
   , init
   ;

populateFunctionList = function () {

   var objects
     , item
     ;
   objects = dmz.object.getObjects();
   for (item in objects) {

      if ( dmz.grapher.FunctionType.isOfExactType (dmz.object.type(objects[item]))) {

         functionList.addItem(dmz.object.text(objects[item], dmz.grapher.FunctionStringHandle));
      }
   }
};

functionList.observe (self, "currentItemChanged", function (current, previous) {
   var item
     , objects = dmz.object.getObjects()
     , handle
     ;
   for (item in objects) {

      handle = objects[item];
      if(dmz.grapher.FunctionType.isOfExactType (dmz.object.type(handle))) {
         if (!previous) {

            if (dmz.object.text(handle, dmz.grapher.FunctionStringHandle) === current.text()) {

               dmz.object.flag(handle, dmz.grapher.SelectedHandle, true)
            }
            //self.log.warn("New Selection:", current.text());
         }
         else {
            if (dmz.object.text(handle, dmz.grapher.FunctionStringHandle) === previous.text()) {

               dmz.object.flag(handle, dmz.grapher.SelectedHandle, false)
            }
            if (dmz.object.text(handle, dmz.grapher.FunctionStringHandle) === current.text()) {

               dmz.object.flag(handle, dmz.grapher.SelectedHandle, true)
            }
            //self.log.warn("New Selection:", current.text(), "<--> Previous Selection:", previous.text());
         }
      }
   }
});

init = function () {

   mainCreatorWindow.show();
   populateFunctionList();
};

init();
