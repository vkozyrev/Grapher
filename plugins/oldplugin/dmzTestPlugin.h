#ifndef DMZ_TEST_PLUGIN_H
#define DMZ_TEST_PLUGIN_H

#include <dmzRuntimeLog.h>
//#include <dmzRuntimeMessaging.h>
#include <dmzRuntimePlugin.h>
//#include <QtCore/QObject>
//#include <QtCore/QMap>
//#include <QtCore/QVariant>

namespace dmz {

   class DMZTestPlugin : public Plugin {

      public:
         DMZTestPlugin (const PluginInfo &Info, Config &local);

         // Plugin Interface
         virtual void update_plugin_state (
            const PluginStateEnum State,
            const UInt32 Level) {;}

         virtual void discover_plugin (
            const PluginDiscoverEnum Mode,
            const Plugin *PluginPtr) {;}

         int x;

      protected:
         void _init (Config &local);

         Log _log;
   };
}

#endif
