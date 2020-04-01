# SOLID

Robert C. Martin\
Agile Software Development, Principles, Patterns, and Practices\
2002

## SRP
Robert Martin\
Co-author of the Agile MAnifesto\
Author & mentor.\

Definition of Responsibility
* know your audience
  * Content managers, Analysts, Developers
  * Logging, Authentication, Requests Handling
* theater/actor model
* talk it through and look for the **and** word

## OCP
Bertrand Mayer\
French academic\
Eiffel language author

Naturally follows SRP.\
Starts with identification of vector of change.\
Direct class dependencies also violate OCP because make it impossible to change those dependencies.\
Policy pattern as a way to respect OCP.\
Polymorphic OCP uses interfaces & implementations.

Source of Change
* actor model
* requirements as axes of change

## LSP
Barbarar Liskov\
Professor @ MIT

Herb Sutter\
C++ Architect\
C++ Standard Group

Andrei ALexandrescu\
C++\
Modern C++ Design Book\
D language author

Applies to type systems as well as onto runtime contracts.
Runtime contracts: requirements often cannot be enforced in compile time.\
They can be just documented.

## ISP
SRP for interfaces
Martin Fowler's Role Interfaces

## DIP
More a method to build hierarchies. Opposed to the "top-down decomposition".\
High-level modules, which provide complex logic, should be easily reusable and unaffected by changes in low-level modules, which provide utility features.

Interface naming as a hint: when naming your interfaces, think of them from their clients' perspective, not from the implementation dtail perspective. Interfaces belong to clients.
Almost automatically brings OCP.\
Allows for ISP.
