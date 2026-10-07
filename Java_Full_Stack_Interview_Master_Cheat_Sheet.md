# Java Full Stack Interview Preparation --- Master Cheat Sheet

## Purpose

This is the final interview-preparation guide for the Java Full Stack
training program.

It is designed for:

-   Technical interviews
-   Viva questions
-   Assessment revision
-   Project explanation
-   Tricky follow-up questions
-   Fast last-minute revision

The guide follows the training scope: Java foundations, OOP,
collections, exceptions, multithreading, Java 8+, SQL, JDBC,
Servlets/JSP, JPA/Hibernate, Spring Core, Spring Boot, REST, Spring Data
JPA, Security/JWT concepts, microservices basics, testing, Git, Docker
and deployment concepts.

------------------------------------------------------------------------

# 1. THE GOLDEN INTERVIEW RULE

Do not answer with only a definition.

Use this structure:

> **Definition → Why → Example → Difference/Trap**

Example:

**Q: What is JPA?**

Bad:

> JPA is Java Persistence API.

Better:

> JPA is a Java specification/API for persistence and ORM. It defines
> standard concepts such as Entity, EntityManager and relationship
> annotations. Hibernate is a popular implementation of JPA.

If the interviewer asks a follow-up, give the example.

------------------------------------------------------------------------

# 2. ONE-PAGE TECHNOLOGY MAP

``` text
JAVA
 |
 +-- OOP
 |    +-- Encapsulation
 |    +-- Inheritance
 |    +-- Polymorphism
 |    +-- Abstraction
 |
 +-- Collections
 |    +-- List
 |    +-- Set
 |    +-- Map
 |
 +-- Exceptions
 |
 +-- Threads
 |
 +-- Lambda / Streams
 |
 +-- SQL
 |
 +-- JDBC
 |
 +-- Servlet / JSP
 |
 +-- JPA / Hibernate
 |
 +-- Spring
 |    +-- IoC
 |    +-- DI
 |    +-- Beans
 |    +-- AOP
 |
 +-- Spring Boot
 |    +-- REST
 |    +-- CRUD
 |    +-- Validation
 |    +-- Exception handling
 |
 +-- Spring Data JPA
 |
 +-- Spring Security
 |    +-- Authentication
 |    +-- Authorization
 |    +-- JWT
 |
 +-- Microservices
 |
 +-- Git / Docker / CI-CD
```

------------------------------------------------------------------------

# 3. JAVA FUNDAMENTALS

## 3.1 What is Java?

Java is a high-level, object-oriented, class-based programming language
designed to be portable across platforms through the JVM.

### Java execution flow

``` text
.java
  |
  | javac
  v
.class bytecode
  |
  | JVM
  v
Machine-specific execution
```

------------------------------------------------------------------------

# 4. JDK vs JRE vs JVM

## JVM

Java Virtual Machine.

It executes Java bytecode.

## JRE

Java Runtime Environment.

Conceptually:

``` text
JRE = JVM + runtime libraries
```

Used to run Java applications.

## JDK

Java Development Kit.

Conceptually:

``` text
JDK = JRE/runtime + development tools
```

Used to develop Java applications.

### Interview trap

Modern Java distributions may not package these exactly as the old
textbook diagrams suggest. The safest interview answer is:

> JVM executes bytecode. JRE represents the runtime environment. JDK is
> the development kit containing the tools required to develop and run
> Java applications.

------------------------------------------------------------------------

# 5. Why is Java platform independent?

Java source code is compiled into bytecode.

The bytecode can run on different operating systems as long as a
compatible JVM exists.

``` text
Java code
   ↓
Bytecode
   ↓
JVM on Windows
JVM on Linux
JVM on macOS
```

This is the idea behind:

> Write Once, Run Anywhere.

------------------------------------------------------------------------

# 6. Is Java 100% object-oriented?

No.

Java has primitive data types such as:

``` text
int
char
boolean
double
```

Therefore Java is not considered a purely object-oriented language.

------------------------------------------------------------------------

# 7. `==` vs `.equals()`

## `==`

For primitives:

``` java
int a = 10;
int b = 10;

a == b
```

compares values.

For objects, `==` compares references.

## `.equals()`

Normally used to compare object content when the class implements the
appropriate equality semantics.

Example:

``` java
String a = new String("Java");
String b = new String("Java");

a == b          // false
a.equals(b)     // true
```

### Interview trap

Do not say "`==` always compares memory."

Say:

> For primitives it compares values; for object references it checks
> whether the references refer to the same object.

------------------------------------------------------------------------

# 8. Why is String immutable?

A String object cannot be modified after creation.

``` java
String s = "Java";
s.concat(" Programming");

System.out.println(s);
```

The original value is still:

``` text
Java
```

A new String is created by concatenation.

### Why useful?

Common reasons include:

-   String pool optimization
-   Security
-   Stable hash codes
-   Safe sharing
-   Thread-safety benefits from immutability

------------------------------------------------------------------------

# 9. String vs StringBuilder vs StringBuffer

  Type            Mutable?   Typical use
  --------------- ---------- ----------------------------------------
  String          No         Fixed text
  StringBuilder   Yes        Repeated string modification
  StringBuffer    Yes        Synchronized mutable string operations

### Tricky question

**Why not always use StringBuilder?**

Because String is simpler and appropriate when the value does not need
repeated modification. StringBuilder is useful when
constructing/changing text repeatedly.

------------------------------------------------------------------------

# 10. `final`

## final variable

Cannot be reassigned.

``` java
final int MAX = 100;
```

## final method

Cannot be overridden.

## final class

Cannot be extended.

``` java
final class Student {
}
```

------------------------------------------------------------------------

# 11. `static`

`static` belongs to the class rather than to a particular object.

``` java
class Student {
    static int count;
}
```

Access:

``` java
Student.count;
```

### Tricky question

Can a static method directly access an instance variable?

No.

An instance variable belongs to an object, while a static method can be
called without an object.

------------------------------------------------------------------------

# 12. `this` vs `super`

## `this`

Refers to the current object.

``` java
this.name = name;
```

## `super`

Refers to the parent-class part of the current object.

``` java
super.display();
```

------------------------------------------------------------------------

# 13. OOP MASTER CHEAT SHEET

``` text
Encapsulation  → Protect / bundle data + methods
Inheritance    → Reuse
Polymorphism   → Many forms
Abstraction    → Hide implementation details
Interface      → Contract
```

------------------------------------------------------------------------

# 14. Encapsulation

Wrapping data and behavior inside a class and controlling access.

``` java
class Student {

    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```

### Why private?

To prevent uncontrolled direct access.

------------------------------------------------------------------------

# 15. Inheritance

One class derives from another.

``` java
class Animal {
    void eat() {
    }
}

class Dog extends Animal {
}
```

Dog inherits accessible behavior from Animal.

### Java supports:

-   Single inheritance through classes
-   Multiple inheritance of type through interfaces

Java does not allow a class to extend multiple classes.

------------------------------------------------------------------------

# 16. Overloading vs Overriding

## Overloading

Same method name, different parameter list.

``` java
void add(int a, int b)
void add(int a, int b, int c)
```

Usually resolved at compile time.

## Overriding

Subclass provides a new implementation of an inherited method.

``` java
class Animal {
    void sound() {
    }
}

class Dog extends Animal {
    @Override
    void sound() {
    }
}
```

Runtime polymorphism is involved.

### Tricky question

Can return type alone overload a method?

No.

``` java
int get()
double get()
```

is not valid overloading if the parameter list is identical.

------------------------------------------------------------------------

# 17. Abstract Class vs Interface

  -----------------------------------------------------------------------
  Abstract class                      Interface
  ----------------------------------- -----------------------------------
  Can contain instance state          Primarily defines a contract

  Can have constructors               No normal instance constructor

  Can contain concrete methods        Can contain default/static methods

  A class extends one class           A class can implement multiple
                                      interfaces
  -----------------------------------------------------------------------

### Easy memory

``` text
Abstract class = partial blueprint
Interface      = contract
```

------------------------------------------------------------------------

# 18. Can an abstract class have a constructor?

Yes.

The constructor can initialize the superclass portion when a subclass
object is created.

------------------------------------------------------------------------

# 19. Can an interface have variables?

Yes, interface fields are implicitly:

``` text
public static final
```

------------------------------------------------------------------------

# 20. Access Modifiers

``` text
public
protected
default
private
```

### Visibility

``` text
public     → broadest access
protected  → package + subclasses
default    → same package
private    → same class
```

------------------------------------------------------------------------

# 21. Collections

## List

Ordered collection; duplicates are generally allowed.

Examples:

``` java
ArrayList
LinkedList
```

## Set

Stores unique elements according to the Set's equality rules.

Examples:

``` java
HashSet
LinkedHashSet
TreeSet
```

## Map

Key-value structure.

Examples:

``` java
HashMap
LinkedHashMap
TreeMap
```

------------------------------------------------------------------------

# 22. ArrayList vs LinkedList

### ArrayList

Good for frequent indexed access.

Conceptually backed by a dynamic array.

### LinkedList

Node-based linked structure.

Useful in situations where linked-list insertion/removal characteristics
are beneficial.

### Interview trap

Do not blindly say:

> LinkedList is always faster for insertion.

Insertion/removal depends on where the operation happens and whether you
already have the relevant node/position. Finding an index in a linked
list can itself be O(n).

------------------------------------------------------------------------

# 23. HashMap

``` java
Map<Integer, String> students = new HashMap<>();

students.put(1, "Arun");
students.put(2, "Priya");
```

Conceptually:

``` text
key → value
1   → Arun
2   → Priya
```

### Important

Keys are unique.

Putting a value with an existing key replaces the previous mapping.

------------------------------------------------------------------------

# 24. HashSet

``` java
Set<Integer> numbers = new HashSet<>();

numbers.add(10);
numbers.add(10);
```

Only one logical value `10` remains.

------------------------------------------------------------------------

# 25. HashMap vs Hashtable

Common interview comparison:

-   HashMap is generally not synchronized.
-   Hashtable is a legacy synchronized map.
-   HashMap allows a null key and null values; Hashtable does not allow
    null keys/values in the same way.

Prefer modern concurrent collections such as `ConcurrentHashMap` when
thread-safe concurrent map behavior is required.

------------------------------------------------------------------------

# 26. Comparable vs Comparator

## Comparable

Defines natural ordering inside the class.

``` java
class Student implements Comparable<Student> {
    public int compareTo(Student other) {
        return this.age - other.age;
    }
}
```

## Comparator

Defines an external/custom ordering.

``` java
Comparator<Student> byName =
    Comparator.comparing(Student::getName);
```

### Memory

``` text
Comparable → natural/default ordering
Comparator → custom ordering
```

------------------------------------------------------------------------

# 27. Exception Handling

An exception represents an abnormal condition that disrupts normal
program flow.

``` java
try {
    // risky code
}
catch (Exception e) {
    // handle
}
finally {
    // cleanup
}
```

------------------------------------------------------------------------

# 28. Checked vs Unchecked Exceptions

## Checked

Compiler requires handling/declaring certain checked exceptions.

Examples:

``` text
IOException
SQLException
```

## Unchecked

Subclasses of RuntimeException.

Examples:

``` text
NullPointerException
IllegalArgumentException
IndexOutOfBoundsException
```

### Interview trap

Do not say:

> Checked exceptions happen at compile time.

Better:

> Checked exceptions are checked by the compiler for handling or
> declaration requirements, although the actual exception can occur at
> runtime.

------------------------------------------------------------------------

# 29. `throw` vs `throws`

## throw

Actually throws an exception.

``` java
throw new IllegalArgumentException("Invalid age");
```

## throws

Declares that a method may propagate specified exceptions.

``` java
void readFile() throws IOException {
}
```

------------------------------------------------------------------------

# 30. `finally`

Normally used for cleanup code that should execute whether an exception
occurs or not.

But do not say "finally always executes" as an absolute statement. It
may not execute if the JVM terminates abruptly, for example through
`System.exit()`.

------------------------------------------------------------------------

# 31. Custom Exception

``` java
class StudentNotFoundException
        extends RuntimeException {

    public StudentNotFoundException(String message) {
        super(message);
    }
}
```

Use custom exceptions when the application needs meaningful
domain-specific errors.

------------------------------------------------------------------------

# 32. Multithreading

A thread is a path of execution inside a process.

Multiple threads can execute concurrently.

------------------------------------------------------------------------

# 33. `start()` vs `run()`

This is a classic trick question.

``` java
thread.start();
```

starts a new thread of execution.

``` java
thread.run();
```

is simply a normal method call when invoked directly; it does not itself
start a new thread.

------------------------------------------------------------------------

# 34. `sleep()` vs `wait()`

## sleep()

``` java
Thread.sleep(1000);
```

Pauses the current thread for a period.

It does not release an intrinsic monitor lock merely because it is
sleeping.

## wait()

Used for thread coordination and must be called while owning the
relevant monitor.

It releases that monitor while waiting.

------------------------------------------------------------------------

# 35. `join()`

``` java
thread.join();
```

The current thread waits for the target thread to finish.

------------------------------------------------------------------------

# 36. Race Condition

Occurs when multiple threads access shared mutable state and the result
depends on timing/interleaving.

Example:

``` text
Thread A → count++
Thread B → count++
```

Without appropriate synchronization, updates can be lost.

------------------------------------------------------------------------

# 37. `synchronized`

Used to control concurrent access to critical sections.

``` java
synchronized void increment() {
    count++;
}
```

It provides mutual exclusion around the synchronized monitor region and
also establishes relevant memory-visibility guarantees.

------------------------------------------------------------------------

# 38. Lambda

A lambda provides concise syntax for representing behavior, especially
for functional interfaces.

``` java
Runnable task = () ->
    System.out.println("Running");
```

------------------------------------------------------------------------

# 39. Functional Interface

An interface intended to have one abstract method.

Examples:

``` text
Runnable
Comparator
Predicate
Function
Consumer
Supplier
```

It can still contain default/static methods; the key requirement is one
abstract method.

------------------------------------------------------------------------

# 40. Stream API

Streams provide a declarative way to process data.

Example:

``` java
List<Integer> numbers =
    List.of(10, 20, 30, 40);

List<Integer> result =
    numbers.stream()
           .filter(n -> n > 20)
           .toList();
```

### Important operations

``` text
filter()
map()
sorted()
distinct()
limit()
collect()
toList()
forEach()
reduce()
```

------------------------------------------------------------------------

# 41. `map()` vs `filter()`

## filter

Selects elements.

``` java
.filter(n -> n > 10)
```

Input:

``` text
10 20 30
```

Output:

``` text
20 30
```

## map

Transforms elements.

``` java
.map(n -> n * 2)
```

Input:

``` text
10 20
```

Output:

``` text
20 40
```

### Memory

``` text
filter → keep/remove
map    → transform
```

------------------------------------------------------------------------

# 42. Stream vs Collection

Collection stores data.

Stream processes data.

``` text
Collection → data
Stream     → computation over data
```

A stream is not itself a data structure that stores the source elements.

------------------------------------------------------------------------

# 43. SQL MASTER CHEAT SHEET

## DDL

Defines database structure.

``` text
CREATE
ALTER
DROP
TRUNCATE
```

## DML

Manipulates data.

``` text
INSERT
UPDATE
DELETE
```

## DQL

Commonly used term for querying:

``` text
SELECT
```

------------------------------------------------------------------------

# 44. DELETE vs TRUNCATE vs DROP

  -----------------------------------------------------------------------
  Command                             What it does
  ----------------------------------- -----------------------------------
  DELETE                              Removes selected rows; can use
                                      WHERE

  TRUNCATE                            Removes all rows and resets table
                                      storage/identity behavior according
                                      to DBMS

  DROP                                Removes the database object itself
  -----------------------------------------------------------------------

### Trap

`TRUNCATE` is not simply "DELETE but faster" in every database. It has
different transactional, logging and trigger semantics depending on the
DBMS.

------------------------------------------------------------------------

# 45. PRIMARY KEY vs FOREIGN KEY

## Primary key

Uniquely identifies a row.

``` text
students.id
```

## Foreign key

References a key in another table.

``` text
students.department_id
        ↓
departments.id
```

------------------------------------------------------------------------

# 46. INNER JOIN

Returns matching rows from both sides.

``` sql
SELECT s.name, d.name
FROM students s
JOIN departments d
ON s.department_id = d.id;
```

------------------------------------------------------------------------

# 47. LEFT JOIN

Returns all rows from the left table and matching rows from the right
table.

If there is no match, right-side columns can be NULL.

------------------------------------------------------------------------

# 48. WHERE vs HAVING

## WHERE

Filters rows before grouping.

## HAVING

Filters groups after aggregation.

Example:

``` sql
SELECT department_id, COUNT(*)
FROM students
GROUP BY department_id
HAVING COUNT(*) > 5;
```

------------------------------------------------------------------------

# 49. GROUP BY

Groups rows so aggregate functions can operate per group.

Common aggregates:

``` text
COUNT
SUM
AVG
MIN
MAX
```

------------------------------------------------------------------------

# 50. Normalization

Normalization organizes relational data to reduce unnecessary
duplication and update anomalies.

Common levels:

``` text
1NF
2NF
3NF
```

For beginner interviews, understand the goal rather than memorizing
textbook wording only.

------------------------------------------------------------------------

# 51. Index

An index can speed up searches on indexed columns, at the cost of
storage and additional work for writes/maintenance.

### Tricky question

Should every column be indexed?

No.

Too many indexes can increase storage and slow inserts/updates/deletes.

------------------------------------------------------------------------

# 52. JDBC

JDBC is the Java API used to interact with relational databases.

Typical flow:

``` text
Load/configure driver
       ↓
Get Connection
       ↓
Create PreparedStatement
       ↓
Execute query/update
       ↓
Process ResultSet
       ↓
Close resources
```

------------------------------------------------------------------------

# 53. Statement vs PreparedStatement

Prefer `PreparedStatement` for parameterized queries.

``` java
PreparedStatement ps =
    connection.prepareStatement(
        "SELECT * FROM students WHERE id = ?");
```

Then:

``` java
ps.setInt(1, id);
```

### Why?

-   Parameterization
-   Helps prevent SQL injection
-   Better handling of repeated statements
-   Clearer separation between SQL and values

------------------------------------------------------------------------

# 54. ResultSet

Represents tabular data returned by a JDBC query.

``` java
while (rs.next()) {
    String name = rs.getString("name");
}
```

------------------------------------------------------------------------

# 55. JDBC vs JPA/Hibernate

## JDBC

You work directly with:

``` text
Connection
PreparedStatement
ResultSet
SQL
```

## JPA/Hibernate

You work more with:

``` text
Entity
EntityManager
Repository
JPQL
Relationships
Persistence Context
```

Hibernate/JPA still ultimately communicate with relational databases
through JDBC/SQL underneath.

------------------------------------------------------------------------

# 56. SERVLET

A Servlet is a Java component that handles web requests and responses in
a servlet-based web application.

Typical lifecycle concept:

``` text
load/create
   ↓
init()
   ↓
service()
   ↓
destroy()
```

For HTTP servlets, `service()` dispatches to methods such as:

``` text
doGet()
doPost()
doPut()
doDelete()
```

------------------------------------------------------------------------

# 57. `doGet()` vs `doPost()`

## GET

Usually used to retrieve data.

## POST

Usually used to submit data/create a resource.

Important: HTTP semantics matter more than the simplistic rule "GET is
safe, POST is not." GET is intended to be safe; POST is not generally
safe and is commonly used for state-changing operations.

------------------------------------------------------------------------

# 58. RequestDispatcher

Used to forward a request from one server-side resource to another.

``` java
request.setAttribute("student", student);

RequestDispatcher dispatcher =
    request.getRequestDispatcher("student.jsp");

dispatcher.forward(request, response);
```

### Important

`setAttribute()` stores data in the request scope.

`forward()` transfers server-side processing while keeping the same
request/response objects.

------------------------------------------------------------------------

# 59. Redirect vs Forward

## Forward

``` text
Browser
  ↓
Servlet
  ↓
JSP
```

Server-side transfer.

URL generally does not change to the JSP target.

## Redirect

``` text
Browser
  ↓
Server
  ↓
3xx response
  ↓
Browser makes another request
```

The URL changes and a new HTTP request is made.

------------------------------------------------------------------------

# 60. JSP

JSP is a server-side view technology historically used to generate
dynamic HTML.

Modern Spring Boot REST applications commonly return JSON rather than
using JSP for API responses.

------------------------------------------------------------------------

# 61. MVC

``` text
Model
View
Controller
```

Typical idea:

``` text
Request
  ↓
Controller
  ↓
Model/Service
  ↓
View
```

For REST:

``` text
Client
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
JSON response
```

------------------------------------------------------------------------

# 62. JPA

JPA = Jakarta Persistence.

It is a specification/API for persistence and ORM in Java.

It defines concepts such as:

``` text
@Entity
@Id
@OneToMany
@ManyToOne
EntityManager
```

------------------------------------------------------------------------

# 63. Hibernate

Hibernate is an ORM framework and a major implementation/provider of
JPA.

### Most important interview answer

``` text
JPA       = specification
Hibernate = implementation/provider
```

Do not say:

> JPA is a framework like Hibernate.

JPA is the standard/specification; Hibernate is an implementation.

------------------------------------------------------------------------

# 64. ORM

ORM = Object Relational Mapping.

It maps object-oriented Java entities to relational database structures.

``` text
Java object
     ↕
Database row
```

------------------------------------------------------------------------

# 65. Entity

A JPA entity is a class whose instances are managed for persistence.

Example:

``` java
@Entity
public class Student {
}
```

------------------------------------------------------------------------

# 66. `@Id`

Marks the entity's identifier.

``` java
@Id
private Long id;
```

------------------------------------------------------------------------

# 67. `@GeneratedValue`

Defines ID generation strategy.

Example:

``` java
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
```

------------------------------------------------------------------------

# 68. EntityManager

`EntityManager` provides APIs for interacting with the persistence
context and managing entities.

Common operations:

``` text
persist()
find()
merge()
remove()
```

------------------------------------------------------------------------

# 69. `persist()` vs `merge()`

## persist()

Used to make a new entity managed/persistent.

## merge()

Copies state from a detached/new entity into a managed instance and
returns the managed instance.

### Tricky question

Does `merge()` make the passed object managed?

Not necessarily.

The returned instance is the managed instance.

``` java
Student managed = entityManager.merge(detached);
```

Do not assume `detached` itself becomes managed.

------------------------------------------------------------------------

# 70. `find()`

``` java
Student student =
    entityManager.find(Student.class, 1L);
```

Retrieves an entity by primary key.

------------------------------------------------------------------------

# 71. `remove()`

Marks a managed entity for deletion.

``` java
entityManager.remove(student);
```

------------------------------------------------------------------------

# 72. Persistence Context

The persistence context is the environment in which JPA manages entity
instances.

Think:

``` text
EntityManager
     ↓
Persistence Context
     ↓
Managed entities
```

It enables features such as:

-   Identity guarantee within the context
-   Dirty checking
-   First-level cache behavior
-   Entity state management

------------------------------------------------------------------------

# 73. Entity Lifecycle

Common states:

``` text
NEW
 ↓ persist
MANAGED
 ↓ detach/clear/close
DETACHED
 ↓ remove
REMOVED
```

------------------------------------------------------------------------

# 74. Dirty Checking

If an entity is managed:

``` java
Student student =
    entityManager.find(Student.class, 1L);

student.setName("Arun Kumar");
```

You may not need to call an explicit update operation.

At flush/commit, Hibernate can detect the change and generate an UPDATE.

This is called dirty checking.

------------------------------------------------------------------------

# 75. First-Level Cache

The persistence context acts as the first-level cache.

Within the same persistence context:

``` java
em.find(Student.class, 1L);
em.find(Student.class, 1L);
```

The second lookup can return the same managed entity instance rather
than requiring another database hit.

### Important

First-level cache is associated with the persistence
context/EntityManager, not a global application-wide cache.

------------------------------------------------------------------------

# 76. Lazy vs Eager Loading

## Lazy

Related data is loaded when accessed, subject to mapping/provider
behavior.

## Eager

Related data is loaded eagerly according to the mapping/provider
behavior.

### Interview trap

Don't say:

> Lazy always means exactly one extra SQL query.

The actual SQL depends on mappings, fetch plans, joins, provider
behavior and how the relationship is accessed.

------------------------------------------------------------------------

# 77. `@ManyToOne`

Many records relate to one record.

Example:

``` text
Student * ───── 1 Department
```

``` java
@ManyToOne
@JoinColumn(name = "department_id")
private Department department;
```

------------------------------------------------------------------------

# 78. `@OneToMany`

One entity relates to many entities.

``` text
Department 1 ───── * Student
```

Example:

``` java
@OneToMany(mappedBy = "department")
private List<Student> students;
```

------------------------------------------------------------------------

# 79. Owning Side

The owning side is the side that controls the relationship
mapping/foreign-key update in a bidirectional association.

If Student contains:

``` java
@ManyToOne
@JoinColumn(name = "department_id")
private Department department;
```

Student is normally the owning side because it contains the foreign-key
mapping.

------------------------------------------------------------------------

# 80. `mappedBy`

``` java
@OneToMany(mappedBy = "department")
```

means the relationship is mapped by the `department` field on the
Student side.

It does not mean "create a column called mappedBy."

------------------------------------------------------------------------

# 81. `@JoinColumn`

``` java
@JoinColumn(name = "department_id")
```

Specifies the database join/foreign-key column used for the
relationship.

------------------------------------------------------------------------

# 82. Cascade

Cascade controls whether certain entity operations propagate from one
entity to associated entities.

Examples:

``` text
PERSIST
MERGE
REMOVE
ALL
```

### Trap

Cascade is not the same as database foreign-key cascade.

------------------------------------------------------------------------

# 83. Orphan Removal

`orphanRemoval = true` can cause a child entity that is removed from the
relationship to be deleted from the database, depending on the mapping
and lifecycle.

Do not confuse it with cascade remove.

------------------------------------------------------------------------

# 84. JPQL

JPQL queries entities and their fields rather than database tables and
columns.

Example:

``` sql
SELECT s
FROM Student s
WHERE s.name = :name
```

Here:

``` text
Student → entity
name    → entity attribute
```

------------------------------------------------------------------------

# 85. SQL vs JPQL

``` text
SQL
→ tables
→ columns

JPQL
→ entities
→ entity attributes
```

------------------------------------------------------------------------

# 86. Is SQL gone when using JPA?

No.

Conceptually:

``` text
JPQL / JPA API
      ↓
Hibernate
      ↓
SQL
      ↓
JDBC
      ↓
Database
```

JPA abstracts persistence; it does not remove the relational database or
SQL from the underlying system.

------------------------------------------------------------------------

# 87. Transaction

A transaction is a logical unit of work that should satisfy transaction
guarantees such as atomicity and consistency, subject to the
database/system configuration.

Typical operations:

``` text
BEGIN
   ↓
multiple operations
   ↓
COMMIT
```

or:

``` text
BEGIN
   ↓
error
   ↓
ROLLBACK
```

------------------------------------------------------------------------

# 88. ACID

``` text
A → Atomicity
C → Consistency
I → Isolation
D → Durability
```

### Atomicity

All-or-nothing transaction behavior.

### Consistency

A committed transaction preserves defined data integrity rules.

### Isolation

Concurrent transactions are isolated according to the chosen isolation
level.

### Durability

Committed data is intended to survive failures according to the
database's durability guarantees.

------------------------------------------------------------------------

# 89. SPRING MASTER CHEAT SHEET

## Spring

A broad Java ecosystem/framework family for building enterprise
applications.

## Spring Core

Provides core concepts such as:

``` text
IoC
DI
Beans
ApplicationContext
```

## Spring MVC

Web framework for handling HTTP requests.

## Spring Boot

Simplifies Spring application setup, configuration and running.

## Spring Data JPA

Simplifies repository-based data access using JPA.

## Spring Security

Provides authentication and authorization infrastructure.

------------------------------------------------------------------------

# 90. IoC

IoC = Inversion of Control.

Normally application code may control object creation:

``` java
Engine engine = new Engine();
```

With a dependency injection container, the container takes
responsibility for creating/managing objects and supplying dependencies.

------------------------------------------------------------------------

# 91. Dependency Injection

A dependency is an object another class needs.

``` java
class Car {

    private Engine engine;

    Car(Engine engine) {
        this.engine = engine;
    }
}
```

The Engine is injected into Car.

### Constructor injection

Preferred in most Spring applications.

``` java
public StudentService(
        StudentRepository studentRepository) {

    this.studentRepository = studentRepository;
}
```

------------------------------------------------------------------------

# 92. IoC vs DI

This is a common tricky question.

> IoC is the broader principle where control is inverted to the
> framework/container. Dependency Injection is one important technique
> for implementing IoC by supplying required dependencies from outside.

Memory:

``` text
IoC → principle
DI  → technique
```

------------------------------------------------------------------------

# 93. Bean

A Spring Bean is an object managed by the Spring IoC container.

Examples:

``` java
@Service
public class StudentService {
}
```

Spring can create/manage the StudentService object as a bean.

------------------------------------------------------------------------

# 94. Spring Container

The Spring container creates/manages beans and wires their dependencies.

Important interface:

``` text
ApplicationContext
```

------------------------------------------------------------------------

# 95. `@Component`, `@Service`, `@Repository`, `@Controller`

All are stereotype annotations used for component scanning, with
semantic roles.

``` text
@Component  → generic component
@Service    → service/business layer
@Repository → persistence/repository layer
@Controller → MVC controller
```

`@RestController` is commonly used for REST controllers.

------------------------------------------------------------------------

# 96. `@RestController`

Conceptually combines:

``` text
@Controller
+
@ResponseBody
```

It is used for REST APIs where method return values are written to the
HTTP response body.

------------------------------------------------------------------------

# 97. `@Autowired`

Spring can use `@Autowired` for dependency injection.

But if a class has one constructor, modern Spring can use that
constructor for injection without explicitly writing `@Autowired`.

Preferred style:

``` java
@Service
public class StudentService {

    private final StudentRepository repository;

    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }
}
```

------------------------------------------------------------------------

# 98. Field vs Setter vs Constructor Injection

## Field injection

``` java
@Autowired
private StudentRepository repository;
```

Simple, but harder to test and hides the dependency.

## Setter injection

Useful when dependency is optional/changeable.

## Constructor injection

Preferred for required dependencies.

Advantages:

-   Dependencies are explicit
-   Easier testing
-   Supports immutable fields
-   Object cannot be constructed without required dependencies

------------------------------------------------------------------------

# 99. Component Scanning

Spring scans configured packages for components such as:

``` text
@Component
@Service
@Repository
@Controller
```

and registers discovered classes as beans.

------------------------------------------------------------------------

# 100. ApplicationContext

`ApplicationContext` is a Spring container interface providing bean
management and additional application features.

------------------------------------------------------------------------

# 101. Spring Bean Lifecycle

High-level:

``` text
Bean creation
   ↓
Dependency injection
   ↓
Initialization callbacks
   ↓
Bean ready
   ↓
Destruction callbacks
```

Do not memorize every lifecycle hook unless specifically asked.

------------------------------------------------------------------------

# 102. AOP

AOP = Aspect-Oriented Programming.

Used for cross-cutting concerns such as:

``` text
Logging
Security-related concerns
Transactions
Auditing
```

Instead of scattering the same concern through many business methods, it
can be expressed as an aspect.

------------------------------------------------------------------------

# 103. Spring Boot

Spring Boot simplifies Spring application development through:

-   Starters
-   Auto-configuration
-   Embedded server support
-   Convention-based setup
-   Externalized configuration

------------------------------------------------------------------------

# 104. `@SpringBootApplication`

It is a convenience annotation that combines key configuration behavior
including:

``` text
@Configuration
@EnableAutoConfiguration
@ComponentScan
```

Do not say it "contains every Spring annotation." It combines these
major annotations.

------------------------------------------------------------------------

# 105. Starter Dependency

Example:

``` text
spring-boot-starter-web
```

provides a convenient dependency set for web application development.

Starters reduce manual dependency selection.

------------------------------------------------------------------------

# 106. Auto-Configuration

Spring Boot examines the classpath and configuration and automatically
configures many common components when appropriate.

### Tricky question

Does auto-configuration mean Spring Boot configures everything blindly?

No.

It is conditional and can be backed off/replaced by user configuration
when conditions indicate that custom configuration is present.

------------------------------------------------------------------------

# 107. Embedded Server

Spring Boot web applications can run with an embedded servlet container.

Therefore we commonly run:

``` text
java -jar application.jar
```

rather than manually deploying a WAR to an externally installed server
for a standard Boot setup.

------------------------------------------------------------------------

# 108. REST

REST is an architectural style for designing networked applications
around resources and standard HTTP semantics.

Example:

``` text
/students
```

Operations:

``` text
GET    /students
POST   /students
GET    /students/1
PUT    /students/1
DELETE /students/1
```

------------------------------------------------------------------------

# 109. HTTP METHODS

``` text
GET     → retrieve
POST    → create/process submission
PUT     → replace/update a resource
PATCH   → partial update
DELETE  → delete
```

### PUT vs PATCH

PUT is generally used for replacement/full update semantics.

PATCH is designed for partial modification.

------------------------------------------------------------------------

# 110. `@GetMapping`

Maps GET requests.

``` java
@GetMapping
public List<Student> getStudents() {
    return service.getAllStudents();
}
```

------------------------------------------------------------------------

# 111. `@PostMapping`

Maps POST requests.

``` java
@PostMapping
public Student createStudent(
        @RequestBody Student student) {
    return service.createStudent(student);
}
```

------------------------------------------------------------------------

# 112. `@PutMapping`

Maps PUT requests.

``` java
@PutMapping("/{id}")
```

------------------------------------------------------------------------

# 113. `@DeleteMapping`

Maps DELETE requests.

``` java
@DeleteMapping("/{id}")
```

------------------------------------------------------------------------

# 114. `@RequestBody`

Reads request body data and converts JSON into a Java object through
HTTP message conversion.

``` java
@RequestBody Student student
```

Flow:

``` text
JSON
 ↓
@RequestBody
 ↓
Student object
```

------------------------------------------------------------------------

# 115. `@PathVariable`

Reads a value from the URL path.

``` text
GET /students/10
```

``` java
@PathVariable Long id
```

------------------------------------------------------------------------

# 116. `@RequestParam`

Reads query-string parameters.

``` text
GET /students/search?name=Arun
```

``` java
@RequestParam String name
```

### Memory

``` text
PathVariable → /students/10
RequestParam → /students?name=Arun
RequestBody   → JSON body
```

------------------------------------------------------------------------

# 117. Controller vs Service vs Repository

``` text
Controller
→ HTTP/API layer

Service
→ Business logic

Repository
→ Data access
```

Do not put all business logic directly inside the controller.

------------------------------------------------------------------------

# 118. Spring Data JPA

Spring Data JPA provides repository abstractions over JPA.

Example:

``` java
public interface StudentRepository
        extends JpaRepository<Student, Long> {
}
```

It gives ready-made operations such as:

``` text
save()
findAll()
findById()
deleteById()
```

------------------------------------------------------------------------

# 119. Spring Data JPA vs Hibernate

``` text
Spring Data JPA
→ repository abstraction/convenience

JPA
→ persistence specification/API

Hibernate
→ JPA implementation/provider
```

### Interview trap

Do not say:

> Spring Data JPA is Hibernate.

They are different layers.

------------------------------------------------------------------------

# 120. Derived Query

Example:

``` java
List<Student>
findByNameContainingIgnoreCase(String name);
```

Spring Data can derive a query from the method name.

This avoids writing boilerplate query code for many common cases.

------------------------------------------------------------------------

# 121. `save()` --- Insert or Update?

`save()` can be used for both.

Conceptually:

``` text
new entity
   ↓
INSERT

existing entity
   ↓
UPDATE
```

The exact new/existing determination depends on entity state/identifier
and Spring Data JPA's entity-information strategy.

------------------------------------------------------------------------

# 122. Validation

Common annotations:

``` text
@NotNull
@NotBlank
@NotEmpty
@Email
@Min
@Max
@Size
```

Example:

``` java
@NotBlank
private String name;

@Email
private String email;

@Min(18)
private int age;
```

------------------------------------------------------------------------

# 123. `@Valid`

Triggers validation of the request object.

``` java
public Student create(
        @Valid @RequestBody Student student) {
}
```

------------------------------------------------------------------------

# 124. Exception Handling in Spring Boot

A clean REST API should return controlled error responses.

Custom exception:

``` java
public class StudentNotFoundException
        extends RuntimeException {
}
```

Global handler:

``` java
@RestControllerAdvice
public class GlobalExceptionHandler {
}
```

------------------------------------------------------------------------

# 125. `@RestControllerAdvice`

Provides centralized exception handling for REST controllers.

Example:

``` java
@ExceptionHandler(StudentNotFoundException.class)
@ResponseStatus(HttpStatus.NOT_FOUND)
public Map<String, String> handle(...) {
}
```

------------------------------------------------------------------------

# 126. HTTP STATUS CODES

``` text
200 OK
201 Created
204 No Content
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
500 Internal Server Error
```

### 401 vs 403

This is a very common interview question.

``` text
401 → authentication is required/failed
403 → request understood but access is forbidden
```

------------------------------------------------------------------------

# 127. SPRING SECURITY

Spring Security handles application security concerns such as:

``` text
Authentication
Authorization
Protection mechanisms
Security filters
```

------------------------------------------------------------------------

# 128. Authentication vs Authorization

``` text
Authentication
→ Who are you?

Authorization
→ What are you allowed to do?
```

Example:

``` text
Login
 ↓
Authentication

Admin endpoint
 ↓
Authorization
```

------------------------------------------------------------------------

# 129. JWT

JWT = JSON Web Token.

Common structure:

``` text
header.payload.signature
```

Used in many stateless authentication architectures.

Typical flow:

``` text
User login
   ↓
Server validates credentials
   ↓
Server issues token
   ↓
Client stores token
   ↓
Client sends token with future requests
   ↓
Server validates token
```

### Important

JWT itself does not automatically mean an application is secure. Token
storage, expiration, signing keys, refresh strategy, revocation,
transport security and authorization design still matter.

------------------------------------------------------------------------

# 130. Session vs JWT

## Session-based

Server maintains session state.

``` text
Client
 ↓ session ID
Server
 ↓
Session store
```

## JWT-based stateless style

Server can validate signed token information without maintaining
traditional server-side login session state.

But real systems may still maintain revocation/refresh/session-related
state.

------------------------------------------------------------------------

# 131. CORS

CORS = Cross-Origin Resource Sharing.

It controls whether a browser allows a frontend from one origin to make
certain requests to another origin.

Example:

``` text
React
http://localhost:3000

Spring Boot
http://localhost:8080
```

These are different origins.

CORS configuration can allow the required cross-origin requests.

------------------------------------------------------------------------

# 132. Microservices

Microservices architecture decomposes an application into independently
deployable services around business capabilities.

Example:

``` text
User Service
Order Service
Payment Service
Notification Service
```

### Monolith

``` text
One application
 ├── User
 ├── Order
 ├── Payment
 └── Notification
```

### Microservices

``` text
User Service
Order Service
Payment Service
Notification Service
```

------------------------------------------------------------------------

# 133. Monolith vs Microservices

  Monolith                          Microservices
  --------------------------------- ------------------------------
  One deployable application        Multiple deployable services
  Simpler initial development       More operational complexity
  Usually simpler local debugging   Distributed debugging
  One application boundary          Multiple service boundaries

### Tricky question

Are microservices always better?

No.

They introduce network calls, distributed transactions, observability,
deployment and operational complexity. They are useful when the
architecture/team/business needs those characteristics.

------------------------------------------------------------------------

# 134. API GATEWAY

An API Gateway can act as an entry point for clients and handle concerns
such as:

-   Routing
-   Authentication integration
-   Rate limiting
-   Request aggregation
-   Cross-cutting policies

------------------------------------------------------------------------

# 135. SERVICE DISCOVERY

In dynamic microservice environments, service discovery helps services
locate other service instances.

Concept:

``` text
Service A
   ↓
Discovery mechanism
   ↓
Service B instance
```

------------------------------------------------------------------------

# 136. Git

Git is a distributed version-control system.

Basic commands:

``` bash
git init
git status
git add .
git commit -m "message"
git log
git branch
git switch
git merge
git pull
git push
```

------------------------------------------------------------------------

# 137. Git `fetch` vs `pull`

``` text
git fetch
→ downloads remote changes/references without merging into current branch

git pull
→ fetch + integrate changes
```

------------------------------------------------------------------------

# 138. Merge Conflict

Occurs when Git cannot automatically reconcile competing changes.

Typical resolution:

``` text
Pull/merge
 ↓
Conflict
 ↓
Edit files
 ↓
git add
 ↓
git commit
```

------------------------------------------------------------------------

# 139. Docker

Docker packages applications and dependencies into containers.

``` text
Application
+
Dependencies
+
Runtime configuration
        ↓
Container image
        ↓
Container
```

### Image vs Container

``` text
Image     → template/package
Container → running instance
```

------------------------------------------------------------------------

# 140. Dockerfile

Defines instructions for building an image.

Typical flow:

``` text
Dockerfile
   ↓
docker build
   ↓
Image
   ↓
docker run
   ↓
Container
```

------------------------------------------------------------------------

# 141. CI/CD

CI = Continuous Integration.

Frequent code integration with automated build/test checks.

CD can refer to Continuous Delivery or Continuous Deployment depending
on the organization.

General pipeline:

``` text
Code
 ↓
Build
 ↓
Test
 ↓
Package
 ↓
Deploy
```

------------------------------------------------------------------------

# 142. TESTING

## Unit test

Tests a small unit in isolation.

Example:

``` text
StudentService.calculateGrade()
```

## Integration test

Tests interaction between components/resources.

Example:

``` text
Service + Repository + Database
```

## API test

Tests HTTP endpoints.

Tools may include:

``` text
Postman
JUnit
Mockito
```

------------------------------------------------------------------------

# 143. Mockito

Mockito is used to create mocks for tests.

Example concept:

``` text
StudentService
      ↓
mock StudentRepository
```

This allows the service to be tested without calling a real database.

------------------------------------------------------------------------

# 144. PROJECT EXPLANATION --- 60-SECOND ANSWER

If asked:

> "Explain your project."

Use:

> "I worked on a Campus Student Management System. The application
> manages students and departments. In the initial implementation I used
> Java, Servlets/JSP, JDBC and later JPA/Hibernate with PostgreSQL. For
> the Spring Boot implementation, I built a REST API using a
> Controller-Service-Repository architecture. Student and Department are
> JPA entities with a many-to-one relationship. Spring Data JPA provides
> repository operations, Hibernate handles ORM, and PostgreSQL stores
> the data. The API supports CRUD operations, search, validation and
> centralized exception handling."

------------------------------------------------------------------------

# 145. PROJECT ARCHITECTURE ANSWER

``` text
Client / Postman
       ↓
REST Controller
       ↓
Service
       ↓
Spring Data Repository
       ↓
JPA
       ↓
Hibernate
       ↓
JDBC
       ↓
PostgreSQL
```

Explain each:

``` text
Controller → HTTP
Service    → business logic
Repository → database access
JPA        → persistence API
Hibernate  → ORM implementation
JDBC       → database connectivity underneath
PostgreSQL → actual database
```

------------------------------------------------------------------------

# 146. TRICKY DIFFERENCE QUESTIONS

## JDK vs JRE vs JVM

``` text
JDK → development
JRE → runtime
JVM → executes bytecode
```

## `==` vs `.equals()`

``` text
==       → primitive values / object reference identity
equals() → logical/content equality when implemented
```

## Overloading vs Overriding

``` text
Overloading → same class/name, different parameters
Overriding  → subclass replaces inherited implementation
```

## Abstract class vs Interface

``` text
Abstract class → partial implementation/state possible
Interface      → contract; multiple interfaces can be implemented
```

## ArrayList vs LinkedList

``` text
ArrayList  → dynamic array, good random access
LinkedList → linked nodes, different insertion/removal characteristics
```

## HashMap vs HashSet

``` text
HashMap → key-value
HashSet → unique values
```

## String vs StringBuilder

``` text
String        → immutable
StringBuilder → mutable
```

## Checked vs Unchecked exception

``` text
Checked   → compiler requires handling/declaration
Unchecked → RuntimeException family
```

## `throw` vs `throws`

``` text
throw  → actually throws
throws → declares possibility
```

## `start()` vs `run()`

``` text
start() → starts new thread
run()   → normal method call if invoked directly
```

## JDBC vs JPA

``` text
JDBC → lower-level database API
JPA  → persistence/ORM specification
```

## JPA vs Hibernate

``` text
JPA       → specification
Hibernate → implementation/provider
```

## JPA vs Spring Data JPA

``` text
JPA             → persistence specification
Spring Data JPA → repository abstraction/convenience over JPA
```

## Spring vs Spring Boot

``` text
Spring     → framework/ecosystem
Spring Boot → simplifies Spring application setup/configuration
```

## IoC vs DI

``` text
IoC → principle
DI  → technique
```

## `@Controller` vs `@RestController`

``` text
@Controller     → MVC controller, commonly views
@RestController → REST response body
```

## `@PathVariable` vs `@RequestParam`

``` text
/students/10
→ PathVariable

/students?name=Arun
→ RequestParam
```

## Authentication vs Authorization

``` text
Authentication → Who are you?
Authorization  → What can you access?
```

## 401 vs 403

``` text
401 → authentication problem/required
403 → authenticated/known request but not allowed
```

## Forward vs Redirect

``` text
Forward   → server-side transfer, same request
Redirect  → client receives redirect and makes another request
```

------------------------------------------------------------------------

# 147. TRICKY "WHY" QUESTIONS

## Why use Service layer if Repository already works?

Because business logic should not be tightly coupled to HTTP or database
code. The Service layer gives a place for business rules and
orchestration.

## Why use Repository instead of SQL directly in Controller?

Separation of concerns. The controller handles HTTP; repository handles
persistence.

## Why constructor injection?

Dependencies are explicit, required dependencies can be final, and
testing becomes easier.

## Why use JPA?

It reduces repetitive persistence code and lets developers work with
entities/relationships instead of manually mapping every ResultSet.

## Why use Hibernate?

It implements JPA and provides ORM functionality.

## Why use Spring Boot?

To reduce configuration/setup effort and quickly create production-style
Spring applications.

## Why use DTOs?

To control the API contract and avoid exposing persistence entities
directly. DTOs can also help with validation, security and shaping
responses.

## Why validation?

To reject invalid input before bad data reaches business logic/database
operations.

## Why global exception handling?

To keep error handling consistent instead of repeating try/catch logic
in every controller.

------------------------------------------------------------------------

# 148. TRICKY SPRING QUESTIONS

### Q: Does Spring create every Java object?

No.

Spring manages objects registered/discovered as beans. Ordinary Java
objects created with `new` are not automatically Spring-managed.

### Q: Is Spring Boot a replacement for Spring?

No.

Spring Boot builds on Spring and simplifies configuration and
application setup.

### Q: Is Spring Data JPA the same as JPA?

No.

Spring Data JPA provides repository abstractions using JPA.

### Q: Is Hibernate a database?

No.

Hibernate is an ORM framework/provider.

### Q: Does Spring Data JPA generate SQL?

It can generate/coordinate persistence operations, with the JPA provider
such as Hibernate ultimately generating/executing SQL.

### Q: Can we use Spring Boot without Hibernate?

Yes.

Spring Boot can be used with different persistence technologies.
Hibernate is commonly used with Spring Data JPA but is not the
definition of Spring Boot.

### Q: Can we use JPA without Spring?

Yes.

JPA can be used in applications without Spring.

### Q: Can we use Hibernate without JPA?

Yes.

Hibernate has native APIs/features in addition to its JPA support.

------------------------------------------------------------------------

# 149. TRICKY JPA/HIBERNATE QUESTIONS

### Q: What is a managed entity?

An entity currently associated with the persistence context and tracked
by JPA.

### Q: What is a detached entity?

An entity that was previously managed but is no longer associated with
the current persistence context.

### Q: What is dirty checking?

Automatic detection of changes to managed entities and synchronization
during flush.

### Q: What is first-level cache?

The persistence context's per-EntityManager cache of managed entities.

### Q: Does `merge()` update the database immediately?

Not necessarily. The state is merged into a managed instance, and
database synchronization normally occurs during flush/transaction
commit.

### Q: What happens if `findById()` cannot find a record?

Spring Data JPA returns an `Optional` for the standard repository
method.

### Q: Why use Optional?

To explicitly represent that a value may be absent rather than returning
a bare null from the repository API.

------------------------------------------------------------------------

# 150. COMMON CODING INTERVIEW PATTERNS

Even for Java Full Stack interviews, basic problem solving can appear.

## Frequency counting

``` java
Map<Integer, Integer> freq = new HashMap<>();

for (int n : numbers) {
    freq.put(n, freq.getOrDefault(n, 0) + 1);
}
```

## Two pointers

Useful for sorted arrays, pair problems, reversing, partition-style
problems.

## Sliding window

Useful for contiguous subarray/substring problems.

Example idea:

``` text
left → window → right
```

Expand right.

When condition breaks, move left.

## HashSet

Useful for:

``` text
duplicate detection
membership checking
unique values
```

## HashMap

Useful for:

``` text
frequency
lookup
index mapping
grouping
```

------------------------------------------------------------------------

# 151. BIG-O QUICK CHEAT SHEET

  Operation                  Typical complexity
  ------------------------ --------------------
  Array index access                       O(1)
  HashMap average lookup                   O(1)
  HashSet average lookup                   O(1)
  Binary search                        O(log n)
  Linear search                            O(n)
  Merge sort                         O(n log n)
  Quick sort average                 O(n log n)
  Quick sort worst case                   O(n²)
  Nested loops over n                     O(n²)

Do not blindly state HashMap is always O(1). The usual interview answer
is average-case O(1), with worst-case behavior depending on
implementation/collision handling.

------------------------------------------------------------------------

# 152. HOW TO ANSWER A CODING QUESTION

Use this sequence:

``` text
1. Clarify the problem
2. Give brute-force idea
3. Discuss complexity
4. Improve using a data structure/pattern
5. Explain with example
6. Code
7. Test edge cases
8. State final complexity
```

### Example

Question:

> Find duplicate elements.

Start:

> "The simplest solution is comparing every pair, which is O(n²). We can
> improve it to O(n) average time using a HashSet."

Then code.

This shows problem-solving rather than just memorized code.

------------------------------------------------------------------------

# 153. EDGE CASES TO MENTION

For coding problems check:

``` text
empty input
single element
duplicates
negative numbers
zero
already sorted
reverse sorted
very large input
null input if applicable
```

------------------------------------------------------------------------

# 154. SQL INTERVIEW TRAPS

### Q: Can WHERE use aggregate functions like COUNT directly?

Normally aggregate filtering belongs in HAVING after GROUP BY.

### Q: INNER JOIN vs LEFT JOIN?

``` text
INNER → matching rows
LEFT  → all left rows + matching right rows
```

### Q: Primary key can be NULL?

No.

### Q: Can a table have multiple candidate keys?

Yes, but one candidate key is selected as the primary key.

### Q: Can a foreign key be NULL?

Yes, unless constrained otherwise, depending on schema design.

### Q: Does an index always improve performance?

No.

It helps appropriate reads but has storage and write-maintenance costs.

------------------------------------------------------------------------

# 155. PROJECT DEBUGGING QUESTIONS

### Application starts but table is not created

Check:

``` text
Database URL
Username/password
JDBC driver
Entity annotation
JPA configuration
DDL setting
Database permissions
```

### 404 endpoint

Check:

``` text
URL
HTTP method
@RequestMapping
@GetMapping/@PostMapping
Server port
Application startup
```

### 400 Bad Request

Usually inspect:

``` text
JSON format
RequestBody mapping
Validation
Data types
```

### 500 Internal Server Error

Check:

``` text
stack trace
service logic
repository/database
null values
constraints
```

### PostgreSQL connection refused

Check:

``` text
PostgreSQL running?
Host?
Port?
Database?
Username?
Password?
Firewall/network?
```

------------------------------------------------------------------------

# 156. PROJECT QUESTIONS THE INTERVIEWER MAY ASK

## Why PostgreSQL?

> It is a relational database suitable for structured transactional data
> and supports SQL, constraints and relationships.

## Why JPA/Hibernate?

> To map Java entities to relational data and reduce repetitive
> persistence code.

## Why Spring Boot?

> To simplify configuration and quickly build REST APIs using Spring's
> ecosystem.

## Why Controller-Service-Repository?

> Separation of concerns and maintainability.

## Why PostgreSQL instead of storing everything in Java objects?

> Java objects are in-memory; a database provides persistent, queryable
> and concurrent storage.

## What happens after POST `/students`?

``` text
HTTP POST
 ↓
Controller
 ↓
@RequestBody converts JSON → Student
 ↓
Service
 ↓
Repository.save()
 ↓
Spring Data JPA
 ↓
Hibernate
 ↓
SQL/JDBC
 ↓
PostgreSQL
 ↓
Response
```

------------------------------------------------------------------------

# 157. COMPLETE PROJECT FLOW --- BEST INTERVIEW ANSWER

If asked:

> "Explain one request from beginning to end."

Say:

> "Suppose the client sends POST `/students` with JSON data. Spring MVC
> maps the request to the controller method. `@RequestBody` converts the
> JSON into a Student object. The controller calls the service layer.
> The service applies business logic and calls the Spring Data JPA
> repository. The repository uses JPA, Hibernate performs the ORM work
> and generates SQL, and the database operation is executed against
> PostgreSQL. The saved entity is then returned and serialized into the
> HTTP response."

This is one of the most important answers in the entire interview.

------------------------------------------------------------------------

# 158. 30 MUST-KNOW QUESTIONS

1.  What is Java?
2.  JDK vs JRE vs JVM?
3.  Why is Java platform independent?
4.  `==` vs `equals()`?
5.  Why is String immutable?
6.  String vs StringBuilder?
7.  What is encapsulation?
8.  Overloading vs overriding?
9.  Abstract class vs interface?
10. What is polymorphism?
11. List vs Set vs Map?
12. ArrayList vs LinkedList?
13. HashMap vs HashSet?
14. Checked vs unchecked exception?
15. `throw` vs `throws`?
16. `start()` vs `run()`?
17. What is a race condition?
18. What is a lambda?
19. `map()` vs `filter()`?
20. What is a Stream?
21. Primary key vs foreign key?
22. INNER JOIN vs LEFT JOIN?
23. WHERE vs HAVING?
24. JDBC vs JPA?
25. JPA vs Hibernate?
26. What is ORM?
27. What is persistence context?
28. What is dirty checking?
29. What is Spring IoC/DI?
30. Explain your project architecture.

------------------------------------------------------------------------

# 159. 30 SPRING/JPA MUST-KNOW QUESTIONS

31. Spring vs Spring Boot?
32. What is IoC?
33. What is DI?
34. What is a Bean?
35. What is ApplicationContext?
36. `@Component` vs `@Service`?
37. `@Repository`?
38. `@RestController`?
39. Constructor injection?
40. What is `@SpringBootApplication`?
41. What is auto-configuration?
42. What are starters?
43. What is REST?
44. GET vs POST vs PUT vs PATCH vs DELETE?
45. `@RequestBody`?
46. `@PathVariable`?
47. `@RequestParam`?
48. Controller vs Service vs Repository?
49. What is Spring Data JPA?
50. What is JpaRepository?
51. What does `save()` do?
52. What is `@Entity`?
53. What is `@ManyToOne`?
54. What is `@OneToMany`?
55. What is `mappedBy`?
56. What is `@JoinColumn`?
57. What is validation?
58. What is `@Valid`?
59. What is `@RestControllerAdvice`?
60. Explain the complete request-to-database flow.

------------------------------------------------------------------------

# 160. LAST-MINUTE MEMORY SHEET

``` text
JAVA
JDK → develop
JRE → runtime
JVM → execute bytecode

OOP
Encapsulation → protect
Inheritance → reuse
Polymorphism → many forms
Abstraction → hide
Interface → contract

METHODS
Overload → parameters differ
Override → subclass implementation

COLLECTIONS
List → ordered/duplicates
Set → unique
Map → key/value

EXCEPTION
throw → throw now
throws → declare
finally → cleanup

THREAD
start() → new thread
run() → normal call
join() → wait
sleep() → pause
synchronized → mutual exclusion

DATABASE
PK → identify row
FK → relationship
JOIN → combine tables
WHERE → filter rows
HAVING → filter groups
INDEX → faster suitable reads, extra write/storage cost

JDBC
Connection
PreparedStatement
ResultSet

JPA
Specification/API
Entity
EntityManager
Persistence Context
JPQL

HIBERNATE
JPA implementation/provider
ORM
SQL generation/execution

SPRING
IoC → principle
DI → technique
Bean → Spring-managed object
Container → manages beans

SPRING BOOT
Starters
Auto-configuration
Embedded server
Externalized configuration

REST
GET → read
POST → create/process
PUT → replace/update
PATCH → partial update
DELETE → delete

SPRING MVC
Controller → HTTP

SPRING DATA JPA
Repository abstraction

SECURITY
Authentication → who?
Authorization → what allowed?

JWT
Token-based authentication mechanism

MICROSERVICES
Small independently deployable services
but increased distributed-system complexity

DOCKER
Image → package/template
Container → running instance

GIT
fetch → download remote refs
pull → fetch + integrate
```

------------------------------------------------------------------------

# 161. FINAL 15-MINUTE REVISION

If you have only 15 minutes before the interview, revise these:

### Java

``` text
JDK/JRE/JVM
OOP
String
Collections
Exceptions
Threads
Streams
```

### SQL

``` text
JOIN
GROUP BY
HAVING
Primary/Foreign Key
Index
```

### JPA

``` text
JPA vs Hibernate
Entity
EntityManager
Persistence Context
Dirty Checking
Relationships
JPQL
```

### Spring

``` text
IoC
DI
Bean
ApplicationContext
Controller
Service
Repository
```

### Spring Boot

``` text
@SpringBootApplication
Starter
Auto-configuration
REST
RequestBody
PathVariable
RequestParam
```

### Project

``` text
Controller
 ↓
Service
 ↓
Repository
 ↓
JPA
 ↓
Hibernate
 ↓
JDBC
 ↓
PostgreSQL
```

------------------------------------------------------------------------

# 162. FINAL GOLDEN ANSWERS

### "Tell me about yourself"

Keep it short:

> "I am a Java Full Stack developer with experience in Java, Spring
> Boot, REST APIs, SQL and PostgreSQL. I have worked with JPA/Hibernate
> for persistence and have built CRUD-based applications using layered
> architecture. I focus on writing maintainable code with clear
> separation between controller, service and repository layers."

Adapt the experience claim to your actual background. Never claim
production experience you cannot defend.

------------------------------------------------------------------------

### "What are your strengths?"

Choose technical strengths you can demonstrate:

> "My strengths are understanding backend flow, database integration,
> debugging and breaking a problem into smaller components."

------------------------------------------------------------------------

### "What happens when you call an API?"

Use:

``` text
Request
 ↓
Controller
 ↓
Service
 ↓
Repository
 ↓
JPA/Hibernate
 ↓
JDBC
 ↓
Database
 ↓
Response
```

------------------------------------------------------------------------

### "What is the difference between Spring and Spring Boot?"

> "Spring is the broader framework ecosystem that provides features such
> as IoC, dependency injection and MVC. Spring Boot builds on Spring and
> simplifies application setup using starters, auto-configuration,
> embedded servers and conventions."

------------------------------------------------------------------------

### "What is the difference between JPA and Hibernate?"

> "JPA is a specification/API that defines persistence and ORM concepts.
> Hibernate is a popular implementation/provider of JPA."

------------------------------------------------------------------------

### "Why should we hire you?"

Give evidence, not generic statements:

> "I understand the complete backend flow from HTTP request to database.
> I can work with Java, REST APIs, Spring Boot, JPA/Hibernate and
> PostgreSQL, and I focus on understanding why the code works rather
> than only memorizing syntax."

------------------------------------------------------------------------

# 163. FINAL INTERVIEW STRATEGY

Remember:

``` text
DO NOT:
- Rush
- Give 5-minute answers to simple questions
- Pretend to know something you don't
- Memorize definitions without understanding

DO:
- Think aloud
- Clarify the problem
- Start with the simplest solution
- Explain trade-offs
- Give a small example
- Mention complexity for coding questions
- Connect answers to your project
```

If you don't know something:

> "I haven't worked with that deeply yet, but my understanding is..."

Then explain what you actually know.

That is much better than guessing.

------------------------------------------------------------------------

# 164. THE MOST IMPORTANT 10 ANSWERS TO MASTER

If time is extremely limited, master these ten:

1.  Explain OOP.
2.  Overloading vs overriding.
3.  List vs Set vs Map.
4.  Checked vs unchecked exception.
5.  JDK/JRE/JVM.
6.  JPA vs Hibernate.
7.  IoC vs DI.
8.  Spring vs Spring Boot.
9.  Controller-Service-Repository architecture.
10. Explain your complete project from HTTP request to PostgreSQL.

If these ten are strong, you can handle many follow-up questions
naturally.

------------------------------------------------------------------------

# 165. FINAL ARCHITECTURE TO DRAW IN THE INTERVIEW

``` text
                    CLIENT
                       |
                       | HTTP
                       v
              +----------------+
              |   Controller   |
              +----------------+
                       |
                       v
              +----------------+
              |    Service     |
              +----------------+
                       |
                       v
              +----------------+
              |   Repository   |
              +----------------+
                       |
                       v
              +----------------+
              | Spring Data JPA|
              +----------------+
                       |
                       v
              +----------------+
              |      JPA       |
              +----------------+
                       |
                       v
              +----------------+
              |    Hibernate   |
              +----------------+
                       |
                       v
              +----------------+
              |      JDBC      |
              +----------------+
                       |
                       v
              +----------------+
              |  PostgreSQL    |
              +----------------+
```

## One sentence to remember

> **Controller handles HTTP, Service handles business logic, Repository
> handles data access, JPA defines persistence APIs, Hibernate performs
> ORM, JDBC connects to the database, and PostgreSQL stores the data.**
