class IntegerSet {
    constructor(maxValue) {
        this.maxValue = maxValue;
        this.set = new Array(maxValue + 1).fill(false);
    }

    insert(element) {
        if (element >= 0 && element <= this.maxValue) {
            this.set[element] = true;
        } else {
            throw new Error("Element out of bounds");
        }
    }

    remove(element) {
        if (element >= 0 && element <= this.maxValue) {
            this.set[element] = false;
        } else {
            throw new Error("Element out of bounds");
        }
    }

    union(otherSet) {
        if (this.maxValue !== otherSet.maxValue) {
            throw new Error("Sets must have the same maxValue");
        }
        const resultSet = new IntegerSet(this.maxValue);
        for (let i = 0; i <= this.maxValue; i++) {
            resultSet.set[i] = this.set[i] || otherSet.set[i];
        }
        return resultSet;
    }

    intersection(otherSet) {
        if (this.maxValue !== otherSet.maxValue) {
            throw new Error("Sets must have the same maxValue");
        }
        const resultSet = new IntegerSet(this.maxValue);
        for (let i = 0; i <= this.maxValue; i++) {
            resultSet.set[i] = this.set[i] && otherSet.set[i];
        }
        return resultSet;
    }

    difference(otherSet) {
        if (this.maxValue !== otherSet.maxValue) {
            throw new Error("Sets must have the same maxValue");
        }
        const resultSet = new IntegerSet(this.maxValue);
        for (let i = 0; i <= this.maxValue; i++) {
            resultSet.set[i] = this.set[i] && !otherSet.set[i];
        }
        return resultSet;
    }

    toString() {
        const elements = [];
        for (let i = 0; i <= this.maxValue; i++) {
            if (this.set[i]) {
                elements.push(i);
            }
        }
        return `{ ${elements.join(", ")} }`;
    }
}

// Test application
const setA = new IntegerSet(10);
const setB = new IntegerSet(10);

setA.insert(1);
setA.insert(3);
setA.insert(5);

setB.insert(3);
setB.insert(4);
setB.insert(5);

console.log("Set A:", setA.toString());
console.log("Set B:", setB.toString());

const unionSet = setA.union(setB);
console.log("Union:", unionSet.toString());

const intersectionSet = setA.intersection(setB);
console.log("Intersection:", intersectionSet.toString());

const differenceSet = setA.difference(setB);
console.log("Difference (A - B):", differenceSet.toString());