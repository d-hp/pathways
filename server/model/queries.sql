--drop existing table
DROP TABLE nameOfTable;

--create tables
CREATE TABLE employee (
  emp_id INT PRIMARY KEY,
  first_name varchar(20),
  last_name varchar(20),
  birthday DATE,
  sex varchar(1),
  salary INT,
  super_id INT,
  branch_id INT
);

CREATE TABLE branch {
  branch_id INT PRIMARY KEY,
  branch_name VARCHAR(40),
  mgr_id INT,
  mgr_start_date DATE,
  FOREIGN KEY(mgr_id) REFERENCES employee(emp_id) ON DELETE SET NULL
}

--set super_id & branch_id of the employee table as foreign keys
ALTER TABLE employee
ADD FOREIGN KEY (branch_id)
REFERENCES branch(branch_id)
ON DELETE SET NULL;

ALTER TABLE employee
ADD PRIMARY KEY(super_id)
REFERENCES employee(emp_id)
ON DELETE SET NULL;

--create client table
CREATE TABLE client (
  client_id INT PRIMARY KEY,
  client_name VARCHAR(40),
  branch_id INT,
  FOREIGN KEY (branch_id) REFERENCES branch(branch_id) ON DELETE SET NULL
);

--create works_with table (note: composite key of two foreign keys)
CREATE TABLE works_with (
  emp_id INT,
  client_id INT,
  total_sales INT,
  PRIMARY KEY (emp_id, client_id),
  FOREIGN KEY (emp_id) REFERENCES employee(emp_id) ON DELETE CASCADE,
  FOREIGN KEY (client_id) REFERENCES client(client_id) ON DELETE CASCADE,
);

--create branch supplier table
CREATE TABLE branch_supplier (
  branch_id INT,
  supplier_name varchar(40),
  supply_type varchar(40),
  PRIMARY KEY (branch_id, supplier_name),
  FOREIGN KEY (branch_id) REFERENCES branch(branch_id) ON DELETE CASCADE
);

--INSERTING INTO COMPLEX TABLES REQUIRES SPECIFIC ORDER OF QUERIES
INSERT INTO employee VALUES(100, 'David', 'Wallace', '1967-11-17', 'M', 250000, NULL, NULL);

--mgr_id on branch table is a foreign key to the employee table, so we create the supervisor employee first so
--upon creating our first branch entry, we can specify '100' as the supervisor does already exist (no need to do NULL then update later)
INSERT INTO branch VALUES(1, 'Corporate', 100, 2006-02-09);

--The employee branch_id foreign key is initially set to NULL because the branch table had no values
UPDATE employee
SET branch_id = 1
WHERE emp_id = 100;

INSERT INTO employee VALUES(101, 'Jan', 'Levinson', '1961-05-11', 'F', 110000, 100, 1);

--find all employees
SELECT * FROM employee;

--find all employees ordered by descending salary (default is ASC)
SELECT *
FROM employee
ORDER BY salary DESC;

--find all employees ordered by sex then name (query will order by sex, then first name, then last name)
SELECT *
FROM employee
ORDER BY sex, first_name, last_name;

--find first 5 employees in the table
SELECT *
FROM employee
LIMIT 5;

--find the first and last names of all employees (as forename and surname)
SELECT first_name AS forename, last_name AS surname,
FROM employee

--find out all the different genders
SELECT DISTINCT sex
FROM employee;

--BASIC SQL FUNCTION EXAMPLES

--find the # of employees in employee table
SELECT COUNT(emp_id)
FROM employee;

--count how many employees have supervisors in the employee table
SELECT COUNT(super_id)
FROM employee;
--returns 9 rather than 10 because one employee has super_id set to NULL

--find the number of female employees born after 1970
SELECT COUNT(emp_id)
FROM employee
WHERE sex = 'F' AND birthday > '1970-01-01';

--find the average of all employee salaries who are male
SELECT AVG(salary)
FROM employee
WHERE sex = 'M';

--find the sum of all employee salaries
SELECT SUM(salary)
FROM employee;

--SQL AGGREGATE FUNCTION EXAMPLES
--'aggregation' is when we use these functions to display the data returned in a more helpful way

--find out how many males & females are in the company
SELECT COUNT(sex), sex --SELECT COUNT(sex) by itself would simply return the amount of records with a sex defined, however, adding an additional sex column will now create a gender column that will not show a COUNT() output but rather just a typical value of the record so in this case (M or F)
FROM employee
GROUP BY sex --the above two lines are not enough to achieve our desired query output, we also have to specify that we want our COUNT function to group its count based on sex aka M or F
--output: COUNT(SEX) ... sex
--            3           F
--            6           M

--find the total sales of each salesman
SELECT SUM(total_sales), emp_id
FROM works_with
GROUP BY emp_id
--OUTPUT
--SUM(total_sales) 282000 218000 31000 34500
--emp_id            102     105   107   108

--how much money did each client actually spend with the branch?
SELECT SUM(total_sales), client_id
FROM works_with,
GROUP BY client_id

--WILDCARDS & LIKE KEYWORD IN SQL (grabbing data that matches a specific pattern)
--% = any # of characters, _ = one character

--find any clients who are an LLC
SELECT *
FROM client
WHERE client_name LIKE '%LLC'; --any # of characters and LLC at the end, should be returned

--find any branch suppliers that are in the label business
SELECT supplier_name
FROM branch_supplier
WHERE suppler_name LIKE '% Labels%';

--find any employee born in October
SELECT *
FROM employee
WHERE birthday LIKE '____-10%';

--find any clients who are schools
SELECT *
FROM client
WHERE client_name LIKE '%school%';

--UNIONS IN SQL -> operator to combine results of multiple select stateents into one
SELECT first_name
FROM employee;

SELECT branch_name
FROM branch;

--turns into...
SELECT first_name
FROM employee
UNION
SELECT branch_name
FROM branch;

--rule of union #1: must have the same # of columns selected in the SELECT statement
SELECT first_name, last_name FROM employee
UNION
SELECT branch_name FROM branch;
--The above query will not work because we have 2 columns in the first SELECT and 1 column in the second SELECT

--rule of union #2: must have the same datatype
--the above works because first_name and branch_name both are varchar's aka the same data type
SELECT first_name FROM employee
UNION
SELECT branch_name FROM branch
UNION
SELECT client_name FROM client;
--example showing union of three different tables

--note how the query output always uses the first select statement for generating the column name
--this might not always be good so we can use 'AS' to change what the columnName of our union'ed querie(s) will be

SELECT client_name, client.branch_id
FROM client
UNION
SELECT suppler_name, branch_supplier.branch_id
FROM branch_supplier;

--find a list of all money spent or earned by the company
SELECT salary
FROM employee
UNION
SELECT total_sales
FROM works_with

--JOINS
--used to combine rows from 2 or more tables based on...
--a related column between them

--Find all branches and the names of their managers
SELECT employee.emp_id, employee.first_name, branch.branch_name
FROM employee
INNER JOIN branch
ON employee.emp_id = branch.mgr_id;

--4 types of JOIN's in SQL
--JOIN itself defaults to 'INNER JOIN'

--INNER JOIN aka JOIN: combines rows from employee table and branch table whenever emp_id is equal to mgr_id (because mgr_id references emp_id's on the employee table)
--OUTPUT OF INNER JOIN ABOVE
--emp_id  first_name  branch_name
--  100      David      Corporate
--  102      Michael     Scranton
--  106      Josh        Stamford

--LEFT JOIN -> includes all of the rows from the left table (regardless of whether that rows identifier is located as a key on the other table)
--OUTPUT OF LEFT JOIN ABOVE
--emp_id  first_name  branch_name
--  100      David      Corporate
--  102      Michael     Scranton
--  106      Josh        Stamford
--  101      Jan           NULL
--  103      Angela        NULL
--  104      Kelly         NULL
--  105      Stanley       NULL
--  107      Andy          NULL
--  108      Jim           NULL

--The 'INNER JOIN' query on line 224-227 says FROM employee INNER JOIN branch
--This helps us understand that a LEFT JOIN
--will include all results from employees but not all results from branch

--RIGHT JOIN (will not include all employees like above, but instead will include all branches (regardless of if the branch has a mgr_id that matches a emp_id))
--  100      David      Corporate
--  102      Michael     Scranton
--  106      Josh        Stamford
--  NULL      NULL        Buffalo

--FULL OUTER JOIN
--a LEFT JOIN and a right JOIN combined so essentially just combines the all data in two connected tables regardless of if a match exists

--NESTED QUERIES
--a query where multiple SELECT statements in order to get a very specific piece of information

--Q: Find names of all employees who have sold over 30,000 to a single client
--1. works_with allows us to see that employee #105 had 55,000 in total sales to client #400
--2. this is good but we don't have the name of that employee accessible, we only have the emp_id
--3. since we have the emp_id, we can use that in a nested query to get their first and last name

--First, write a query that will get all emp_id's that have sold more than 30,000 to a single client
SELECT works_with.emp_id
FROM works_with
WHERE works_with.total_sales > 30000
--Note that the works_with.emp_id is not required but is good practice to identify the table where
--the attribute is from, this is especially important in nested queries in the event where we have repeated column names

--The above query returns emp_id 102 and 105
--So now we want to get those employee's first name and last name from the employee table
SELECT first_name, last_name
FROM employee
WHERE emp_id = 102 AND emp_id = 105;

--The above query shows how we'd typically do it
--If we wanted to use nested queries, we replace
--the WHERE statement with the value derived from our first query
SELECT first_name, last_name
FROM employee
WHERE --<emp_id matches the emp_ids returned by query 1>

SELECT employee.first_name, employee.last_name
FROM employee
WHERE employee.emp_id IN (
  SELECT works_with.emp_id
  FROM works_with
  WHERE works_with.total_sales > 30000
)
--we used to use 'IN ()' syntax to check if the id is within a list that we passed of hard-coded values
--employee.emp_id IN (102, 105, 107)
--when using nested queries, we simply put the entire query that returns the emp_id's within the IN ( ... inserted nested query here ... )


--Q: Find all clients who are handled by the branch
--that Michael Scott manages
--Assume you know Michael's ID

SELECT client.client_name
FROM client
WHERE client.branch_id = (
  SELECT branch.branch_id
  FROM branch
  WHERE branch.mgr_id = 102;
)

--when your RDBMS sees an embedded SQL statement like this
--it will execute the embedded SQL (inner SQL statement) first
--then go outwards...

--a note about the nested query above
--our internal query for branch #'s is not guaranteed to only return a single value
--michael scott could be the manager of multiple branches
--because of this, we want to write 'LIMIT 1' at the end of our internal query to ensure

SELECT client.client_name
FROM client
WHERE client.branch_id = (
  SELECT branch.branch_id
  FROM branch
  WHERE branch.mgr_id = 102
  LIMIT 1;
)

--We were able to deal with multiple values in our
--nested query before because we used the special
--WHERE ... IN (multiple values because of IN)

--ON DELETE
--Deleting entries in our DB when they have foreign keys
--associated with them

--Example depicting issues with DELETING entries
--Imagine deleting Michael Scott from the employee table
--Michael Scott has emp_id=102 & branch_id = 2
--The branch table has emp_id 102 listed as the mgr_id of the Scranton branch
--If we delete Michael Scott from the employee table (aka employee #102)
--The #102 on the branch table listed as the mgr_id now points to nothing








































