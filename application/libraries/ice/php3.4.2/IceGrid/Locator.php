<?php
// **********************************************************************
//
// Copyright (c) 2003-2011 ZeroC, Inc. All rights reserved.
//
// This copy of Ice is licensed to you under the terms described in the
// ICE_LICENSE file included in this distribution.
//
// **********************************************************************
//
// Ice version 3.4.2
//
// <auto-generated>
//
// Generated from file `Locator.ice'
//
// Warning: do not edit this file.
//
// </auto-generated>
//

require_once 'Ice/Locator.php';

if(!isset($IceGrid__t_Registry))
{
    $IceGrid__t_Registry = IcePHP_declareClass('::IceGrid::Registry');
    $IceGrid__t_RegistryPrx = IcePHP_defineProxy($IceGrid__t_Registry);
}

if(!isset($IceGrid__t_Query))
{
    $IceGrid__t_Query = IcePHP_declareClass('::IceGrid::Query');
    $IceGrid__t_QueryPrx = IcePHP_defineProxy($IceGrid__t_Query);
}

if(!interface_exists('IceGrid_Locator'))
{
    interface IceGrid_Locator extends Ice_Locator
    {
        public function getLocalRegistry();
        public function getLocalQuery();
    }

    class IceGrid_LocatorPrxHelper
    {
        public static function checkedCast($proxy, $facetOrCtx=null, $ctx=null)
        {
            return $proxy->ice_checkedCast('::IceGrid::Locator', $facetOrCtx, $ctx);
        }

        public static function uncheckedCast($proxy, $facet=null)
        {
            return $proxy->ice_uncheckedCast('::IceGrid::Locator', $facet);
        }
    }

    $IceGrid__t_Locator = IcePHP_defineClass('::IceGrid::Locator', 'IceGrid_Locator', true, $Ice__t_Object, array($Ice__t_Locator), null);

    $IceGrid__t_LocatorPrx = IcePHP_defineProxy($IceGrid__t_Locator);

    IcePHP_defineOperation($IceGrid__t_Locator, 'getLocalRegistry', 2, 2, null, null, $IceGrid__t_RegistryPrx, null);
    IcePHP_defineOperation($IceGrid__t_Locator, 'getLocalQuery', 2, 2, null, null, $IceGrid__t_QueryPrx, null);
}
?>
