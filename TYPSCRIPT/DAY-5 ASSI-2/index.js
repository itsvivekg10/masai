"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var Direction;
(function (Direction) {
    Direction["Up"] = "UP";
    Direction["Down"] = "DOWN";
    Direction["Idle"] = "IDLE";
})(Direction || (Direction = {}));
var ElevatorState;
(function (ElevatorState) {
    ElevatorState["Moving"] = "MOVING";
    ElevatorState["OpenDoor"] = "OPEN";
    ElevatorState["CloseDoor"] = "CLOSED";
})(ElevatorState || (ElevatorState = {}));
var Elevator = /** @class */ (function (_super) {
    __extends(Elevator, _super);
    function Elevator(id, timePerFloorMs, doorOpenDurationMs) {
        if (timePerFloorMs === void 0) { timePerFloorMs = 800; }
        if (doorOpenDurationMs === void 0) { doorOpenDurationMs = 1200; }
        var _this = _super.call(this) || this;
        _this.currentFloor = 1;
        _this.state = ElevatorState.CloseDoor;
        _this.direction = Direction.Idle;
        _this.destinations = new Set();
        _this.passengerCount = 0;
        _this.passengerWeightKg = 0;
        _this.MAX_PEOPLE = 8;
        _this.MAX_WEIGHT_KG = 680;
        // movement timer
        _this.movingTimer = null;
        _this.id = id;
        _this.timePerFloorMs = timePerFloorMs;
        _this.doorOpenDurationMs = doorOpenDurationMs;
        return _this;
    }
    // Mark a floor as a destination (pickup or dropoff)
    Elevator.prototype.addDestination = function (floor) {
        this.destinations.add(floor);
        this.updateDirection();
    };
    // Remove destination (after serviced)
    Elevator.prototype.removeDestination = function (floor) {
        this.destinations.delete(floor);
        this.updateDirection();
    };
    // Returns true if elevator can accept more passengers (both count & weight)
    Elevator.prototype.canBoard = function (passengerCount, passengerWeightKg) {
        if (this.passengerCount + passengerCount > this.MAX_PEOPLE)
            return false;
        if (this.passengerWeightKg + passengerWeightKg > this.MAX_WEIGHT_KG)
            return false;
        return true;
    };
    // Board passengers — returns boolean indicating success
    Elevator.prototype.boardPassengers = function (passengerCount, passengerWeightKg) {
        if (!this.canBoard(passengerCount, passengerWeightKg))
            return false;
        this.passengerCount += passengerCount;
        this.passengerWeightKg += passengerWeightKg;
        return true;
    };
    // Alight passengers (simple decrement — in a real system we'd track individuals)
    Elevator.prototype.alightPassengers = function (passengerCount, passengerWeightKg) {
        this.passengerCount = Math.max(0, this.passengerCount - passengerCount);
        this.passengerWeightKg = Math.max(0, this.passengerWeightKg - passengerWeightKg);
    };
    // Returns if elevator is idle (no destinations and closed doors and no movement)
    Elevator.prototype.isIdle = function () {
        return (this.destinations.size === 0 &&
            this.state === ElevatorState.CloseDoor &&
            this.direction === Direction.Idle);
    };
    // Decide direction based on nearest destinations
    Elevator.prototype.updateDirection = function () {
        if (this.destinations.size === 0) {
            this.direction = Direction.Idle;
            return;
        }
        // pick direction towards nearest destination
        var nearest = null;
        var minDist = Infinity;
        for (var _i = 0, _a = this.destinations; _i < _a.length; _i++) {
            var f = _a[_i];
            var d = Math.abs(this.currentFloor - f);
            if (d < minDist) {
                minDist = d;
                nearest = f;
            }
        }
        if (nearest === null) {
            this.direction = Direction.Idle;
            return;
        }
        if (nearest > this.currentFloor)
            this.direction = Direction.Up;
        else if (nearest < this.currentFloor)
            this.direction = Direction.Down;
        else
            this.direction = Direction.Idle;
    };
    // One step: move one floor if needed. The controller will call step() periodically.
    Elevator.prototype.step = function () {
        // If doors are open, we don't move.
        if (this.state === ElevatorState.OpenDoor) {
            // doors open — no movement until closed
            return;
        }
        if (this.destinations.size === 0) {
            // nothing to do
            this.direction = Direction.Idle;
            return;
        }
        // set state to moving
        this.state = ElevatorState.Moving;
        // move one floor in direction
        if (this.direction === Direction.Up) {
            this.currentFloor += 1;
        }
        else if (this.direction === Direction.Down) {
            this.currentFloor -= 1;
        }
        else {
            // idle but has destination (same floor), open doors
            // will be handled by arrival check below
        }
        this.emitStatus("Moved one floor to ".concat(this.currentFloor, "."));
        // After moving, check if we reached any destination
        if (this.destinations.has(this.currentFloor)) {
            // arrive and open doors
            this.arriveAtFloor(this.currentFloor);
        }
        else {
            // continue moving on next tick; controller handles timing
            this.updateDirection();
        }
    };
    // Called when elevator arrives at a floor that is a destination
    Elevator.prototype.arriveAtFloor = function (floor) {
        var _this = this;
        this.state = ElevatorState.OpenDoor;
        this.direction = Direction.Idle; // briefly idle while doors are open
        this.emitStatus("Arrived at floor ".concat(floor, ". Doors opening."));
        // simulate door open duration
        setTimeout(function () {
            // after doors open for a while, close them
            _this.closeDoors(floor);
        }, this.doorOpenDurationMs);
    };
    Elevator.prototype.closeDoors = function (floor) {
        // do necessary drop-offs / pickups will be handled by controller using events
        this.emit("doorsClosed", { elevatorId: this.id, floor: floor });
        this.removeDestination(floor);
        this.state = ElevatorState.CloseDoor;
        this.emitStatus("Doors closed at floor ".concat(floor, "."));
        // update direction after closing
        this.updateDirection();
    };
    // Called by controller to explicitly open doors (e.g. if elevator already at requested floor)
    Elevator.prototype.forceOpenDoors = function (floor) {
        var _this = this;
        if (this.state === ElevatorState.Moving) {
            // safety: don't open while moving
            this.emitStatus("Attempted to open while moving — ignored.");
            return;
        }
        this.state = ElevatorState.OpenDoor;
        this.emitStatus("Doors opening at floor ".concat(floor, " (forced)."));
        setTimeout(function () {
            _this.closeDoors(floor);
        }, this.doorOpenDurationMs);
    };
    // Helper to produce status for monitoring
    Elevator.prototype.getStatus = function () {
        return {
            id: this.id,
            currentFloor: this.currentFloor,
            state: this.state,
            direction: this.direction,
            destinations: Array.from(this.destinations).sort(function (a, b) { return a - b; }),
            passengerCount: this.passengerCount,
            passengerWeightKg: this.passengerWeightKg,
        };
    };
    Elevator.prototype.emitStatus = function (msg) {
        this.emit("status", { elevatorId: this.id, msg: msg, status: this.getStatus() });
    };
    return Elevator;
}(events_1.EventEmitter));
/**
 * ElevatorController: manages multiple elevators and request assignment.
 */
var ElevatorController = /** @class */ (function (_super) {
    __extends(ElevatorController, _super);
    function ElevatorController(numElevators, floors, tickIntervalMs) {
        if (tickIntervalMs === void 0) { tickIntervalMs = 900; }
        var _this = _super.call(this) || this;
        _this.elevators = [];
        _this.pendingRequests = [];
        _this.nextRequestId = 1;
        _this.tickTimer = null;
        _this.floors = floors;
        _this.tickIntervalMs = tickIntervalMs;
        for (var i = 0; i < numElevators; i++) {
            var e = new Elevator(i + 1);
            // attach listeners for logging
            e.on("status", function (d) { return _this.onElevatorStatus(d); });
            e.on("doorsClosed", function (d) { return _this.onDoorsClosed(d); });
            _this.elevators.push(e);
        }
        return _this;
    }
    ElevatorController.prototype.startSimulation = function () {
        var _this = this;
        if (this.tickTimer)
            return;
        this.tickTimer = setInterval(function () { return _this.tick(); }, this.tickIntervalMs);
        console.log("Simulation started.");
    };
    ElevatorController.prototype.stopSimulation = function () {
        if (!this.tickTimer)
            return;
        clearInterval(this.tickTimer);
        this.tickTimer = null;
        console.log("Simulation stopped.");
    };
    // Create a request (from floor -> to floor) with occupant info
    ElevatorController.prototype.createRequest = function (from, to, passengerCount, passengerWeightKg) {
        if (passengerCount === void 0) { passengerCount = 1; }
        if (passengerWeightKg === void 0) { passengerWeightKg = 70; }
        var id = this.nextRequestId++;
        var req = {
            id: id,
            from: from,
            to: to,
            passengerCount: passengerCount,
            passengerWeightKg: passengerWeightKg,
            timestamp: Date.now(),
        };
        this.emit("log", "New request #".concat(id, " from ").concat(from, " -> ").concat(to, ", ").concat(passengerCount, " pax (").concat(passengerWeightKg, " kg)."));
        this.assignRequest(req);
    };
    // Assignment logic (best-effort)
    ElevatorController.prototype.assignRequest = function (req) {
        // If invalid floors, log and ignore
        if (req.from < 1 || req.from > this.floors || req.to < 1 || req.to > this.floors) {
            this.emit("log", "Request #".concat(req.id, " invalid floor(s). Logged and ignored."));
            return;
        }
        // If elevator already at the requested floor and door closed, open immediately (prefer one with capacity)
        var immediateCandidates = this.elevators.filter(function (e) { return e.currentFloor === req.from && e.state !== ElevatorState.Moving && e.canBoard(req.passengerCount, req.passengerWeightKg); });
        if (immediateCandidates.length > 0) {
            var chosen = immediateCandidates[0]; // tie-breaker: lowest id
            chosen.addDestination(req.to); // drop-off
            // force doors open for pickup
            chosen.forceOpenDoors(req.from);
            // board passengers immediately (simplified)
            var boarded = chosen.boardPassengers(req.passengerCount, req.passengerWeightKg);
            if (!boarded) {
                this.emit("log", "Request #".concat(req.id, ": elevator ").concat(chosen.id, " couldn't board due to capacity."));
                this.pendingRequests.push(req);
            }
            else {
                this.emit("log", "Request #".concat(req.id, " served immediately by elevator ").concat(chosen.id, "."));
            }
            return;
        }
        // Candidate selection:
        // 1) Elevators moving towards the 'from' floor and in same direction as the requested travel
        var requestedDir = req.to > req.from ? Direction.Up : Direction.Down;
        var movingTowards = this.elevators.filter(function (e) {
            return e.direction === requestedDir &&
                ((requestedDir === Direction.Up && e.currentFloor <= req.from) ||
                    (requestedDir === Direction.Down && e.currentFloor >= req.from)) &&
                e.canBoard(req.passengerCount, req.passengerWeightKg);
        });
        if (movingTowards.length > 0) {
            // choose nearest among these
            movingTowards.sort(function (a, b) { return Math.abs(a.currentFloor - req.from) - Math.abs(b.currentFloor - req.from); });
            var chosen = movingTowards[0];
            chosen.addDestination(req.from); // pickup
            chosen.addDestination(req.to); // dropoff
            this.emit("log", "Request #".concat(req.id, " assigned to moving elevator ").concat(chosen.id, "."));
            return;
        }
        // 2) Idle elevators (closest)
        var idleElevators = this.elevators.filter(function (e) { return e.isIdle() && e.canBoard(req.passengerCount, req.passengerWeightKg); });
        if (idleElevators.length > 0) {
            idleElevators.sort(function (a, b) { return Math.abs(a.currentFloor - req.from) - Math.abs(b.currentFloor - req.from); });
            var chosen = idleElevators[0];
            chosen.addDestination(req.from);
            chosen.addDestination(req.to);
            this.emit("log", "Request #".concat(req.id, " assigned to idle elevator ").concat(chosen.id, "."));
            return;
        }
        // 3) Otherwise, try any elevator that can take (non-full) and will get to the floor soonest (best effort)
        var capableElevators = this.elevators.filter(function (e) { return e.canBoard(req.passengerCount, req.passengerWeightKg); });
        if (capableElevators.length > 0) {
            capableElevators.sort(function (a, b) {
                var estA = Math.abs(a.currentFloor - req.from);
                var estB = Math.abs(b.currentFloor - req.from);
                return estA - estB;
            });
            var chosen = capableElevators[0];
            chosen.addDestination(req.from);
            chosen.addDestination(req.to);
            this.emit("log", "Request #".concat(req.id, " assigned to elevator ").concat(chosen.id, " (best-effort)."));
            return;
        }
        this.pendingRequests.push(req);
        this.emit("log", "Request #".concat(req.id, " queued \u2014 no elevator available right now."));
    };
    ElevatorController.prototype.tick = function () {
        for (var _i = 0, _a = this.elevators; _i < _a.length; _i++) {
            var e = _a[_i];
            e.step();
        }
        if (this.pendingRequests.length > 0) {
            var copy = __spreadArray([], this.pendingRequests, true);
            this.pendingRequests = [];
            for (var _b = 0, copy_1 = copy; _b < copy_1.length; _b++) {
                var req = copy_1[_b];
                this.assignRequest(req);
            }
        }
        this.emit("status", this.getStatus());
    };
    ElevatorController.prototype.onElevatorStatus = function (d) {
        this.emit("log", "[Elevator ".concat(d.status.id, "] ").concat(d.msg));
    };
    ElevatorController.prototype.onDoorsClosed = function (d) {
        var elevator = this.elevators.find(function (x) { return x.id === d.elevatorId; });
        if (!elevator)
            return;
        this.emit("log", "Elevator ".concat(d.elevatorId, " doors closed at floor ").concat(d.floor, "."));
    };
    // Monitoring helper
    ElevatorController.prototype.getStatus = function () {
        return {
            elevators: this.elevators.map(function (e) { return e.getStatus(); }),
            queuedRequests: this.pendingRequests.map(function (r) { return ({ id: r.id, from: r.from, to: r.to }); }),
        };
    };
    // For demo / integration, expose elevators
    ElevatorController.prototype.getElevators = function () {
        return this.elevators;
    };
    return ElevatorController;
}(events_1.EventEmitter));
function demo() {
    var floors = 12;
    var controller = new ElevatorController(3, floors);
    controller.on("log", function (m) { return console.log("[LOG]", m); });
    controller.on("status", function (m) {
        var s = m;
        var snapshot = s.elevators.map(function (el) { return "E".concat(el.id, "@F").concat(el.currentFloor, "(").concat(el.direction, ", ").concat(el.state, ", pax:").concat(el.passengerCount, ")"); });
        console.log("[STATUS]", snapshot.join(" | "), "Queued:", s.queuedRequests.length);
    });
    controller.startSimulation();
    // Create some requests
    setTimeout(function () { return controller.createRequest(1, 8, 2, 140); }, 200); // from ground to 8th floor
    setTimeout(function () { return controller.createRequest(3, 6, 1, 75); }, 700);
    setTimeout(function () { return controller.createRequest(10, 2, 3, 210); }, 1600);
    setTimeout(function () { return controller.createRequest(5, 12, 2, 150); }, 3000);
    setTimeout(function () { return controller.createRequest(2, 7, 9, 800); }, 3800); // should be queued / refused to board
    setTimeout(function () {
        controller.stopSimulation();
        console.log("Final Snapshot:", controller.getStatus());
    }, 14000);
}
if (require.main === module) {
    demo();
}
