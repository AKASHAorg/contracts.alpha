pragma solidity ^0.4.9;

library DLinked {

    struct List {
        uint256 size;
        mapping(uint256 => uint256) next;
        mapping(uint256 => uint256) prev;
    }

    function insert(List storage self, uint256 value) returns (bool inserted) {
        if (!exists(self, value)) {
            inserted = true;
            self.prev[self.next[0]] = value;
            self.next[value] = self.next[0];
            self.prev[value] = 0;
            self.next[0] = value;
            self.size++;
        }
        return inserted;
    }

    function remove(List storage self, uint256 value) returns (bool removed) {
        if (exists(self, value)) {
            removed = true;
            self.next[self.prev[value]] = self.next[value];
            self.prev[self.next[value]] = self.prev[value];
            delete self.prev[value];
            delete self.next[value];
            self.size--;
        }
        return removed;
    }

    function exists(List storage self, uint256 value) constant returns (bool) {
        if(value == 0){
            throw;
        }
        return self.prev[value] != 0 || self.next[value] != 0 || self.next[0] == value;
    }

    function getPrev(List storage self, uint256 value) constant returns (uint256) {
        return self.prev[value];
    }

    function getNext(List storage self, uint256 value) constant returns (uint256) {
        return self.next[value];
    }

    function getSize(List storage self) constant returns (uint256) {
        return self.size;
    }

    function getFirst(List storage self) constant returns (uint256) {
        return self.next[0];
    }

    function getLast(List storage self) constant returns (uint256) {
        return self.prev[0];
    }
}