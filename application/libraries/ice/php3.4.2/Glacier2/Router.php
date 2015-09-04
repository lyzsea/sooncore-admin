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
// Generated from file `Router.ice'
//
// Warning: do not edit this file.
//
// </auto-generated>
//

require_once 'Ice/Router.php';
require_once 'Glacier2/Session.php';

if(!class_exists('Glacier2_PermissionDeniedException'))
{
    class Glacier2_PermissionDeniedException extends Ice_UserException
    {
        public function __construct($reason='')
        {
            $this->reason = $reason;
        }

        public function ice_name()
        {
            return 'Glacier2::PermissionDeniedException';
        }

        public function __toString()
        {
            global $Glacier2__t_PermissionDeniedException;
            return IcePHP_stringifyException($this, $Glacier2__t_PermissionDeniedException);
        }

        public $reason;
    }

    $Glacier2__t_PermissionDeniedException = IcePHP_defineException('::Glacier2::PermissionDeniedException', 'Glacier2_PermissionDeniedException', null, array(
        array('reason', $IcePHP__t_string)));
}

if(!class_exists('Glacier2_SessionNotExistException'))
{
    class Glacier2_SessionNotExistException extends Ice_UserException
    {
        public function __construct()
        {
        }

        public function ice_name()
        {
            return 'Glacier2::SessionNotExistException';
        }

        public function __toString()
        {
            global $Glacier2__t_SessionNotExistException;
            return IcePHP_stringifyException($this, $Glacier2__t_SessionNotExistException);
        }
    }

    $Glacier2__t_SessionNotExistException = IcePHP_defineException('::Glacier2::SessionNotExistException', 'Glacier2_SessionNotExistException', null, null);
}

if(!interface_exists('Glacier2_Router'))
{
    interface Glacier2_Router extends Ice_Router
    {
        public function getCategoryForClient();
        public function createSession($userId, $password);
        public function createSessionFromSecureConnection();
        public function refreshSession();
        public function destroySession();
        public function getSessionTimeout();
    }

    class Glacier2_RouterPrxHelper
    {
        public static function checkedCast($proxy, $facetOrCtx=null, $ctx=null)
        {
            return $proxy->ice_checkedCast('::Glacier2::Router', $facetOrCtx, $ctx);
        }

        public static function uncheckedCast($proxy, $facet=null)
        {
            return $proxy->ice_uncheckedCast('::Glacier2::Router', $facet);
        }
    }

    $Glacier2__t_Router = IcePHP_defineClass('::Glacier2::Router', 'Glacier2_Router', true, $Ice__t_Object, array($Ice__t_Router), null);

    $Glacier2__t_RouterPrx = IcePHP_defineProxy($Glacier2__t_Router);

    IcePHP_defineOperation($Glacier2__t_Router, 'getCategoryForClient', 2, 1, null, null, $IcePHP__t_string, null);
    IcePHP_defineOperation($Glacier2__t_Router, 'createSession', 0, 0, array($IcePHP__t_string, $IcePHP__t_string), null, $Glacier2__t_SessionPrx, array($Glacier2__t_PermissionDeniedException, $Glacier2__t_CannotCreateSessionException));
    IcePHP_defineOperation($Glacier2__t_Router, 'createSessionFromSecureConnection', 0, 0, null, null, $Glacier2__t_SessionPrx, array($Glacier2__t_PermissionDeniedException, $Glacier2__t_CannotCreateSessionException));
    IcePHP_defineOperation($Glacier2__t_Router, 'refreshSession', 0, 0, null, null, null, array($Glacier2__t_SessionNotExistException));
    IcePHP_defineOperation($Glacier2__t_Router, 'destroySession', 0, 0, null, null, null, array($Glacier2__t_SessionNotExistException));
    IcePHP_defineOperation($Glacier2__t_Router, 'getSessionTimeout', 2, 1, null, null, $IcePHP__t_long, null);
}

if(!interface_exists('Glacier2_Admin'))
{
    interface Glacier2_Admin
    {
        public function shutdown();
    }

    class Glacier2_AdminPrxHelper
    {
        public static function checkedCast($proxy, $facetOrCtx=null, $ctx=null)
        {
            return $proxy->ice_checkedCast('::Glacier2::Admin', $facetOrCtx, $ctx);
        }

        public static function uncheckedCast($proxy, $facet=null)
        {
            return $proxy->ice_uncheckedCast('::Glacier2::Admin', $facet);
        }
    }

    $Glacier2__t_Admin = IcePHP_defineClass('::Glacier2::Admin', 'Glacier2_Admin', true, $Ice__t_Object, null, null);

    $Glacier2__t_AdminPrx = IcePHP_defineProxy($Glacier2__t_Admin);

    IcePHP_defineOperation($Glacier2__t_Admin, 'shutdown', 0, 0, null, null, null, null);
}
?>