# 🚗 Parking Lot System Design (JavaScript)

## 📘 Overview

This project is an extended **Parking Lot System** implemented in **Node.js (JavaScript)**.  
It demonstrates modular design, object-oriented principles, and extensible architecture.

### ✅ Features Implemented

1. **New Parking Strategy — Even Distribution**
   - Ensures cars are parked evenly across floors.
   - Implements the **Strategy Pattern** for flexible strategy selection.

2. **New Vehicle Types**
   - `CAR` (standard)
   - `EV_CAR` (electric vehicle)
   - Also supports `BIKE` and `TRUCK`.

3. **Reserved EV Slots**
   - The **first slot** on each floor is **reserved exclusively for EV Cars**.
   - Non-EV vehicles cannot park in these reserved slots.

4. **Hourly Parking Charges**
   - Charges are calculated based on the total duration of parking.
   - **Hourly rates (in ₹):**
     | Vehicle Type | Rate/hour |
     |---------------|-----------|
     | CAR           | 20        |
     | EV_CAR        | 25        |
     | BIKE          | 10        |
     | TRUCK         | 30        |

5. **Modular & Extensible Design**
   - Easy to add more vehicle types, strategies, or pricing rules.
   - Clean object-oriented structure with small, reusable classes.

---

## 🧩 System Design

### Classes

| Class | Responsibility |
|--------|----------------|
| `Vehicle` | Represents a vehicle with type and number. |
| `ParkingSlot` | Represents an individual parking slot (reserved or general). |
| `ParkingFloor` | Holds multiple slots and handles allocation per floor. |
| `EvenDistributionStrategy` | New parking strategy to distribute vehicles evenly. |
| `Ticket` | Tracks entry/exit time and calculates hourly charges. |
| `ParkingLot` | Main controller managing all operations (park/unpark, floors, etc.). |

---

## ⚙️ Assumptions

1. Each floor has **one reserved EV slot** (the first slot).
2. Charges are **rounded up to the next full hour**.
3. If no EV slot is available, EV cars can park in normal slots.
4. The program runs synchronously (simulation uses `setTimeout` for timing).
5. Time difference in demo is artificially short for testing.

---

## 🧠 Design Pattern Used

**Strategy Pattern:**  
The parking allocation logic is implemented using the Strategy pattern.  
New strategies (e.g., nearest-slot, random, priority-based) can be easily added later.

---

## ▶️ How to Run

### 1. Clone or Download
