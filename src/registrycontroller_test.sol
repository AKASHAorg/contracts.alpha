pragma solidity ^0.4.3;

import 'dapple/test.sol';
import 'registrycontroller.sol';

contract RegistryControllerTest is Test {
    RegistryController controller;
    Tester proxy_tester;

    function setUp() {
        controller = new RegistryController();
        proxy_tester = new Tester();
        proxy_tester._target(controller);
    }

    function testOwner() {
       assertEq( address(this), controller.owner() );
    }

    function testIdAlphaNum(){
        var x = controller.check_format(bytes32("abcd"));
        assertTrue(x, 'illegal x characters');
        var xx = controller.check_format(bytes32("abcd123"));
        assertTrue(xx, 'illegal xx characters');
    }

    function testIdSpecialChar1(){
        var x = controller.check_format(bytes32("abc_123"));
        assertTrue(x, 'illegal characters');
        var xx = controller.check_format(bytes32("abc.123"));
        assertTrue(xx, 'illegal xx characters');
        var y = controller.check_format(bytes32("abcefghijkl_nopqrstuvxyz12345.78"));
        assertTrue(y, 'illegal y characters');
    }

    function testIdLength(){
        var x = controller.check_format(bytes32("abc"));
        assertFalse(x, 'bypassed min length');
    }

    function testIdCase(){
        var x = controller.check_format(bytes32("aZcc"));
        assertFalse(x, 'bypassed lower case');
    }

    function testCreation(){
        controller
    }
}

