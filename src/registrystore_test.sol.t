pragma solidity ^0.4.8;

import 'dapple/test.sol';
import 'registrystore.sol';

contract RegistryStoreTest is Test {
    RegistryStore store;
    Tester proxy_tester;

    function setUp() {
        store = new RegistryStore();
        proxy_tester = new Tester();
        proxy_tester._target(store);
    }
    function testOwner() {
       assertEq( address(this), store.owner() );
    }
    function testAdd() logs_gas {
    var x = store.add(bytes32('coco'), address(0x0), address(0x0));
    assertTrue(x, 'could not add');
    }

    function testFailAdd() {
      store.setOwner(address(0x0));
      store.add(bytes32('coco1'), address(0x0), address(0x0));
    }

    function testDuplicateAdd() {
        var x = store.add(bytes32('coco1'), address(0x1), address(0x2));
        var y = store.add(bytes32('coco1'), address(0x1), address(0x2));
        assertTrue(x, 'could not add to store');
        assertFalse(y, 'added duplicate username');
    }

    function testRemove(){
        var x = store.add(bytes32('coco1'), address(0x1), address(0x2));
        var y = store.remove(bytes32('coco'), address(0x1));
        var z = store.remove(bytes32('coco1'), address(0x1));
        assertFalse(y, 'removed other id');
        assertTrue(z, 'could not remove owned id');
    }
}