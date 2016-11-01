pragma solidity ^0.4.4;

library DLinked {

    struct List {
        uint256 size;
        mapping(uint256 => uint256) next;
        mapping(uint256 => uint256) prev;
    }

    function insert(List storage list, uint256 value) returns (bool inserted) {
        if (!exists(list, value)) {
            inserted = true;
            list.prev[list.next[0]] = value;
            list.next[value] = list.next[0];
            list.prev[value] = 0;
            list.next[0] = value;
            list.size++;
        }
        return inserted;
    }

    function remove(List storage list, uint256 value) returns (bool removed) {
        if (exists(list, value)) {
            removed = true;
            list.next[list.prev[value]] = list.next[value];
            list.prev[list.next[value]] = list.prev[value];
            delete list.prev[value];
            delete list.next[value];
            list.size--;
        }
        return removed;
    }

    function exists(List storage list, uint256 value) constant returns (bool) {
        if(value == 0){
            throw;
        }
        return list.prev[value] != 0 || list.next[value] != 0 || list.next[0] == value;
    }

    function prev(List storage list, uint256 value) constant returns (uint256) {
        return list.prev[value];
    }

    function next(List storage list, uint256 value) constant returns (uint256) {
        return list.next[value];
    }

    function size(List storage list) constant returns (uint256) {
        return list.size;
    }

    function first(List storage list) constant returns (uint256) {
        return list.next[0];
    }

    function last(List storage list) constant returns (uint256) {
        return list.prev[0];
    }
}