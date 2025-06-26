# ✈️ World Tour 180 

**A full-stack travel management application** built with Node.js, Express, React, and MySQL for tracking complex travel itineraries with multiple stakeholders.

## 🌟 Key Features
- **Multi-role system** (Travelers, Agents)
- **End-to-end itinerary management** from booking to completion
- **Document management** for tickets and visas

## 🧩 Entity Relationship Diagram
```mermaid
erDiagram
    CUSTOMERS ||--o{ PASSENGERS : "books for"
    CUSTOMERS ||--o{ ITINERARIES : "owns"
    AGENTS ||--o{ ITINERARIES : "manages"
    ITINERARIES ||--o{ ITINERARY_DESTINATIONS : "includes"
    ITINERARIES ||--o{ ITINERARY_PASSENGERS : "has"
    ITINERARIES ||--o{ FLIGHTS : "contains"
    DESTINATIONS ||--o{ ITINERARY_DESTINATIONS : "referenced in"
    PASSENGERS ||--o{ ITINERARY_PASSENGERS : "assigned to"
    AIRLINES ||--o{ FLIGHTS : "operates"
    AIRPORTS ||--o{ FLIGHTS : "departure"
    AIRPORTS ||--o{ FLIGHTS : "arrival"
    
    CUSTOMERS {
        int customerID PK
        varchar firstName
        varchar lastName
        varchar email
        varchar phone
    }
    
    PASSENGERS {
        int passengerID PK
        int customerID FK
        varchar firstName
        varchar lastName
        varchar email
        date passportExpiration
        varchar nationality
    }
    
    AGENTS {
        int agentID PK
        varchar firstName
        varchar lastName
        varchar email
        varchar specialization
    }
    
    ITINERARIES {
        int itineraryID PK
        int customerID FK
        int agentID FK
        varchar title
        date startDate
        date endDate
    }
    
    DESTINATIONS {
        int destinationID PK
        varchar name
        varchar country
        boolean visaRequired
    }
    
    ITINERARY_DESTINATIONS {
        int idID PK
        int itineraryID FK
        int destinationID FK
    }
    
    ITINERARY_PASSENGERS {
        int ipID PK
        int itineraryID FK
        int passengerID FK
    }
    
    AIRLINES {
        int airlineID PK
        varchar airlineName
        varchar website
    }
    
    AIRPORTS {
        int airportID PK
        varchar airportName
        varchar iataCode
        varchar city
    }
    
    FLIGHTS {
        int flightID PK
        int itineraryID FK
        int airlineID FK
        int departureAirport FK
        int arrivalAirport FK
        varchar bookingReferenceNum
        varchar flightNumber
        datetime departureTime
        datetime arrivalTime
    }
```

## 🛠️ Tech Stack
| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, CSS |
| **Backend** | Express 4 |
| **Database** | MySQL |

## 🗃️ Core Entities
1. **People** (Base user entity)
2. **Passengers** (Travelers with passport details)
3. **Agents** (Travel professionals managing trips)
4. **Flights** (Individual flight segments)
5. **Itineraries** (Complete travel plans)
6. **Destinations** (Cities/Countries with attractions)
7. **Airports** (IATA codes, terminals, gates)
8. **Airlines** (Carriers with contact info)

## 🚀 Getting Started

### Prerequisites
- MySQL 8+ (`brew install mysql`)

### Installation
```bash
# 1. Clone repo
git clone https://github.com/earthlydev/World-Tour-180.git

# 2. Set up database (requires MySQL credentials)
mysql -u root -p < database/init.sql

# 3. Install dependencies
npm run setup-all  # Runs concurrent client/server installs

# 4. Configure environment
cp .env.example .env
# Edit with your credentials
```

### Running the App
```bash
# Start in development mode (2 terminal sessions)
npm run dev:server  # Backend on :5000
npm run dev:client  # Frontend on :3000
```

## 🔍 Agent-Specific Features
- **Commission tracking** per booking
- **Document expiration alerts**

## 🤝 Team Collaboration
We use:
- **GitHub Projects** for task tracking
- **Microsoft Teams** for daily standups
- **Conventional commits** for version control
The README now better reflects:
- The professional nature of a travel management system
- The role of agents in the workflow
- Clear technical requirements
- Team development practices
