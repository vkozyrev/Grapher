#include "dmzTestPlugin.h"
#include <dmzQtModuleMainWindow.h>
#include <dmzRuntimeConfigToNamedHandle.h>
#include <dmzRuntimeConfigToTypesBase.h>
#include <dmzRuntimeData.h>
#include <dmzRuntimeDefinitions.h>
#include <dmzRuntimePluginFactoryLinkSymbol.h>
#include <dmzRuntimePluginInfo.h>
#include <QtGui/QMainWindow>
#include <QtWebKit/QWebView>
#include <QtWebKit/QWebFrame>

dmz::DMZTestPlugin::DMZTestPlugin (const PluginInfo &Info, Config &local) {
   Plugin (Info);
   _Log(Info);
}

// Plugin Interface
/*
void
dmz::DMZTestPlugin::update_plugin_state (
      const PluginStateEnum State,
      const UInt32 Level) {

   if (State == PluginStateInit) {

   }
   else if (State == PluginStateStart) {

   }
   else if (State == PluginStateStop) {

   }
   else if (State == PluginStateShutdown) {

   }
}

void
dmz::DMZTestPlugin::discover_plugin (
      const PluginDiscoverEnum Mode,
      const Plugin *PluginPtr) {

   if (Mode == PluginDiscoverAdd) {

      if (!_mainWindow) {

         _mainWindow = QtModuleMainWindow::cast (PluginPtr, _mainWindowName);
      }
   }
   else if (Mode == PluginDiscoverRemove) {

   }
}
*/

extern "C" {

DMZ_PLUGIN_FACTORY_LINK_SYMBOL dmz::Plugin *
create_dmzTestPlugin (
      const dmz::PluginInfo &Info,
      dmz::Config &local,
      dmz::Config &global) {

   return new dmz::DMZTestPlugin (Info, local);
}

};
