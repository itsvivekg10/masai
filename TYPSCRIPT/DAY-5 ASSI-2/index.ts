

import { EventEmitter } from "events";


enum Direction {
  Up = "UP",
  Down = "DOWN",
  Idle = "IDLE",
}

enum ElevatorState {
  Moving = "MOVING",
  OpenDoor = "OPEN",
  CloseDoor = "CLOSED",
}

type RequestId = number;

interface Request {
  id: RequestId;
  from: number;
  to: number;
  passengerCount: number;
  passengerWeightKg: number;
  timestamp: number;
}


class Elevator extends EventEmitter {
  readonly id: number;
  currentFloor: number = 1;
  state: ElevatorState = ElevatorState.CloseDoor;
  direction: Direction = Direction.Idle;

  private destinations: Set<number> = new Set();

  passengerCount: number = 0;
  passengerWeightKg: number = 0;
  readonly MAX_PEOPLE = 8;
  readonly MAX_WEIGHT_KG = 680;

  // Simulation params (milliseconds)
  private readonly timePerFloorMs: number;
  private readonly doorOpenDurationMs: number;

  // movement timer
  private movingTimer: NodeJS.Timeout | null = null;

  constructor(id: number, timePerFloorMs = 800, doorOpenDurationMs = 1200) {
    super();
    this.id = id;
    this.timePerFloorMs = timePerFloorMs;
    this.doorOpenDurationMs = doorOpenDurationMs;
  }

  // Mark a floor as a destination (pickup or dropoff)
  addDestination(floor: number) {
    this.destinations.add(floor);
    this.updateDirection();
  }

  // Remove destination (after serviced)
  private removeDestination(floor: number) {
    this.destinations.delete(floor);
    this.updateDirection();
  }

  // Returns true if elevator can accept more passengers (both count & weight)
  canBoard(passengerCount: number, passengerWeightKg: number): boolean {
    if (this.passengerCount + passengerCount > this.MAX_PEOPLE) return false;
    if (this.passengerWeightKg + passengerWeightKg > this.MAX_WEIGHT_KG) return false;
    return true;
  }

  // Board passengers — returns boolean indicating success
  boardPassengers(passengerCount: number, passengerWeightKg: number): boolean {
    if (!this.canBoard(passengerCount, passengerWeightKg)) return false;
    this.passengerCount += passengerCount;
    this.passengerWeightKg += passengerWeightKg;
    return true;
  }

  // Alight passengers (simple decrement — in a real system we'd track individuals)
  alightPassengers(passengerCount: number, passengerWeightKg: number) {
    this.passengerCount = Math.max(0, this.passengerCount - passengerCount);
    this.passengerWeightKg = Math.max(0, this.passengerWeightKg - passengerWeightKg);
  }

  // Returns if elevator is idle (no destinations and closed doors and no movement)
  isIdle(): boolean {
    return (
      this.destinations.size === 0 &&
      this.state === ElevatorState.CloseDoor &&
      this.direction === Direction.Idle
    );
  }

  // Decide direction based on nearest destinations
  private updateDirection() {
    if (this.destinations.size === 0) {
      this.direction = Direction.Idle;
      return;
    }
    // pick direction towards nearest destination
    let nearest: number | null = null;
    let minDist = Infinity;
    for (const f of this.destinations) {
      const d = Math.abs(this.currentFloor - f);
      if (d < minDist) {
        minDist = d;
        nearest = f;
      }
    }
    if (nearest === null) {
      this.direction = Direction.Idle;
      return;
    }
    if (nearest > this.currentFloor) this.direction = Direction.Up;
    else if (nearest < this.currentFloor) this.direction = Direction.Down;
    else this.direction = Direction.Idle;
  }

  // One step: move one floor if needed. The controller will call step() periodically.
  step() {
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
    } else if (this.direction === Direction.Down) {
      this.currentFloor -= 1;
    } else {
      // idle but has destination (same floor), open doors
      // will be handled by arrival check below
    }

    this.emitStatus(`Moved one floor to ${this.currentFloor}.`);
    // After moving, check if we reached any destination
    if (this.destinations.has(this.currentFloor)) {
      // arrive and open doors
      this.arriveAtFloor(this.currentFloor);
    } else {
      // continue moving on next tick; controller handles timing
      this.updateDirection();
    }
  }

  // Called when elevator arrives at a floor that is a destination
  private arriveAtFloor(floor: number) {
    this.state = ElevatorState.OpenDoor;
    this.direction = Direction.Idle; // briefly idle while doors are open
    this.emitStatus(`Arrived at floor ${floor}. Doors opening.`);
    // simulate door open duration
    setTimeout(() => {
      // after doors open for a while, close them
      this.closeDoors(floor);
    }, this.doorOpenDurationMs);
  }

  private closeDoors(floor: number) {
    // do necessary drop-offs / pickups will be handled by controller using events
    this.emit("doorsClosed", { elevatorId: this.id, floor });
    this.removeDestination(floor);
    this.state = ElevatorState.CloseDoor;
    this.emitStatus(`Doors closed at floor ${floor}.`);
    // update direction after closing
    this.updateDirection();
  }

  // Called by controller to explicitly open doors (e.g. if elevator already at requested floor)
  forceOpenDoors(floor: number) {
    if (this.state === ElevatorState.Moving) {
      // safety: don't open while moving
      this.emitStatus("Attempted to open while moving — ignored.");
      return;
    }
    this.state = ElevatorState.OpenDoor;
    this.emitStatus(`Doors opening at floor ${floor} (forced).`);
    setTimeout(() => {
      this.closeDoors(floor);
    }, this.doorOpenDurationMs);
  }

  // Helper to produce status for monitoring
  getStatus() {
    return {
      id: this.id,
      currentFloor: this.currentFloor,
      state: this.state,
      direction: this.direction,
      destinations: Array.from(this.destinations).sort((a, b) => a - b),
      passengerCount: this.passengerCount,
      passengerWeightKg: this.passengerWeightKg,
    };
  }

  private emitStatus(msg: string) {
    this.emit("status", { elevatorId: this.id, msg, status: this.getStatus() });
  }
}

/**
 * ElevatorController: manages multiple elevators and request assignment.
 */
class ElevatorController extends EventEmitter {
  private elevators: Elevator[] = [];
  private pendingRequests: Request[] = [];
  private nextRequestId: number = 1;
  private floors: number;
  private tickIntervalMs: number;
  private tickTimer: NodeJS.Timeout | null = null;

  constructor(numElevators: number, floors: number, tickIntervalMs = 900) {
    super();
    this.floors = floors;
    this.tickIntervalMs = tickIntervalMs;
    for (let i = 0; i < numElevators; i++) {
      const e = new Elevator(i + 1);
      // attach listeners for logging
      e.on("status", (d) => this.onElevatorStatus(d));
      e.on("doorsClosed", (d) => this.onDoorsClosed(d));
      this.elevators.push(e);
    }
  }

  startSimulation() {
    if (this.tickTimer) return;
    this.tickTimer = setInterval(() => this.tick(), this.tickIntervalMs);
    console.log("Simulation started.");
  }

  stopSimulation() {
    if (!this.tickTimer) return;
    clearInterval(this.tickTimer);
    this.tickTimer = null;
    console.log("Simulation stopped.");
  }

  // Create a request (from floor -> to floor) with occupant info
  createRequest(from: number, to: number, passengerCount = 1, passengerWeightKg = 70) {
    const id = this.nextRequestId++;
    const req: Request = {
      id,
      from,
      to,
      passengerCount,
      passengerWeightKg,
      timestamp: Date.now(),
    };
    this.emit("log", `New request #${id} from ${from} -> ${to}, ${passengerCount} pax (${passengerWeightKg} kg).`);
    this.assignRequest(req);
  }

  // Assignment logic (best-effort)
  private assignRequest(req: Request) {
    // If invalid floors, log and ignore
    if (req.from < 1 || req.from > this.floors || req.to < 1 || req.to > this.floors) {
      this.emit("log", `Request #${req.id} invalid floor(s). Logged and ignored.`);
      return;
    }

    // If elevator already at the requested floor and door closed, open immediately (prefer one with capacity)
    const immediateCandidates = this.elevators.filter(e => e.currentFloor === req.from && e.state !== ElevatorState.Moving && e.canBoard(req.passengerCount, req.passengerWeightKg));
    if (immediateCandidates.length > 0) {
      const chosen = immediateCandidates[0]; // tie-breaker: lowest id
      chosen.addDestination(req.to); // drop-off
      // force doors open for pickup
      chosen.forceOpenDoors(req.from);
      // board passengers immediately (simplified)
      const boarded = chosen.boardPassengers(req.passengerCount, req.passengerWeightKg);
      if (!boarded) {
        this.emit("log", `Request #${req.id}: elevator ${chosen.id} couldn't board due to capacity.`);
        this.pendingRequests.push(req);
      } else {
        this.emit("log", `Request #${req.id} served immediately by elevator ${chosen.id}.`);
      }
      return;
    }

    // Candidate selection:
    // 1) Elevators moving towards the 'from' floor and in same direction as the requested travel
    const requestedDir = req.to > req.from ? Direction.Up : Direction.Down;
    const movingTowards = this.elevators.filter(e =>
      e.direction === requestedDir &&
      ((requestedDir === Direction.Up && e.currentFloor <= req.from) ||
        (requestedDir === Direction.Down && e.currentFloor >= req.from)) &&
      e.canBoard(req.passengerCount, req.passengerWeightKg)
    );

    if (movingTowards.length > 0) {
      // choose nearest among these
      movingTowards.sort((a, b) => Math.abs(a.currentFloor - req.from) - Math.abs(b.currentFloor - req.from));
      const chosen = movingTowards[0];
      chosen.addDestination(req.from); // pickup
      chosen.addDestination(req.to); // dropoff
      this.emit("log", `Request #${req.id} assigned to moving elevator ${chosen.id}.`);
      return;
    }

    // 2) Idle elevators (closest)
    const idleElevators = this.elevators.filter(e => e.isIdle() && e.canBoard(req.passengerCount, req.passengerWeightKg));
    if (idleElevators.length > 0) {
      idleElevators.sort((a, b) => Math.abs(a.currentFloor - req.from) - Math.abs(b.currentFloor - req.from));
      const chosen = idleElevators[0];
      chosen.addDestination(req.from);
      chosen.addDestination(req.to);
      this.emit("log", `Request #${req.id} assigned to idle elevator ${chosen.id}.`);
      return;
    }

    // 3) Otherwise, try any elevator that can take (non-full) and will get to the floor soonest (best effort)
    const capableElevators = this.elevators.filter(e => e.canBoard(req.passengerCount, req.passengerWeightKg));
    if (capableElevators.length > 0) {
      capableElevators.sort((a, b) => {
        const estA = Math.abs(a.currentFloor - req.from);
        const estB = Math.abs(b.currentFloor - req.from);
        return estA - estB;
      });
      const chosen = capableElevators[0];
      chosen.addDestination(req.from);
      chosen.addDestination(req.to);
      this.emit("log", `Request #${req.id} assigned to elevator ${chosen.id} (best-effort).`);
      return;
    }

    this.pendingRequests.push(req);
    this.emit("log", `Request #${req.id} queued — no elevator available right now.`);
  }

  private tick() {
    for (const e of this.elevators) {
      e.step();
    }

    if (this.pendingRequests.length > 0) {
      const copy = [...this.pendingRequests];
      this.pendingRequests = [];
      for (const req of copy) {
        this.assignRequest(req);
      }
    }

    this.emit("status", this.getStatus());
  }

  private onElevatorStatus(d: any) {
    this.emit("log", `[Elevator ${d.status.id}] ${d.msg}`);
  }

  private onDoorsClosed(d: { elevatorId: number; floor: number }) {
    const elevator = this.elevators.find((x) => x.id === d.elevatorId);
    if (!elevator) return;
    this.emit("log", `Elevator ${d.elevatorId} doors closed at floor ${d.floor}.`);
  }

  // Monitoring helper
  getStatus() {
    return {
      elevators: this.elevators.map((e) => e.getStatus()),
      queuedRequests: this.pendingRequests.map((r) => ({ id: r.id, from: r.from, to: r.to })),
    };
  }

  // For demo / integration, expose elevators
  getElevators() {
    return this.elevators;
  }
}


function demo() {
  const floors = 12;
  const controller = new ElevatorController(3, floors);

  controller.on("log", (m: any) => console.log("[LOG]", m));
  controller.on("status", (m: any) => {
    const s = m as any;
    const snapshot = s.elevators.map((el: any) => `E${el.id}@F${el.currentFloor}(${el.direction}, ${el.state}, pax:${el.passengerCount})`);
    console.log("[STATUS]", snapshot.join(" | "), "Queued:", s.queuedRequests.length);
  });

  controller.startSimulation();

  // Create some requests
  setTimeout(() => controller.createRequest(1, 8, 2, 140), 200); // from ground to 8th floor
  setTimeout(() => controller.createRequest(3, 6, 1, 75), 700);
  setTimeout(() => controller.createRequest(10, 2, 3, 210), 1600);
  setTimeout(() => controller.createRequest(5, 12, 2, 150), 3000);
  setTimeout(() => controller.createRequest(2, 7, 9, 800), 3800); // should be queued / refused to board
  setTimeout(() => {
    controller.stopSimulation();
    console.log("Final Snapshot:", controller.getStatus());
  }, 14000);
}

if (require.main === module) {
  demo();
}
