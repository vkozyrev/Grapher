#!/bin/sh

. ../scripts/envsetup.sh

export DMZ_APP_NAME=grapher

$RUN_DEBUG$BIN_HOME/dmzAppQt -f config/common.xml config/js.xml config/resource.xml config/runtime.xml $*
