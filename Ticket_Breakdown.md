# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Assumptions
1. An angent can work at multiple facilities provided the shift timings don't overlap.
2. Each row in the Shift table has column of type `JSON`.

### Tasks

**Task 1 - Creation of new table for custom agent ID**
Acceptance criteria:
- The table should contain three columns:
    1. Custom Agent ID (primary key)
    2. Agent ID (forigen key - Agents table)
    2. Facility ID (forigen key - Facilities table)
- All columns should be non-null.

Implementation details:

Time estimate: 2 days

---

**Task 2 - Implement backend logic for handling custom agent IDs**
Acceptance criteria:
- SQL queries for handling custom agent ID should be written
- APIs related to custom agent ID which will be consumed by the UI should be implemented
- Logic of booking shifts should be updated to include custom agent ID to agent's metadata

Implementation details:
We will need four SQL queries:
- Creating custom agent ID - Params: `Custom Agent ID`, `Agent ID` & `Facility ID`
- Query custom agent ID - Params: `Agent ID` & `Facility ID`
- Deleting custom agent ID - Params: `Custom Agent ID`
- Editing custom agent ID - Params: `Custom Agent ID`
We will need four APIs:
- Creating custom agent IDs - Params: `Custom Agent ID`, `Agent ID` & `Facility ID` (`POST` method)
- Querying custom agent IDs - Params: `Custom Agent ID` & `Facility ID` (`GET` method)
- Deleting custom agent IDs - Params: `Custom Agent ID` (`DELETE` method)
- Editing custom agent IDs - Params: `Custom Agent ID` (`PUT` method)
While booking an agent (i.e. creating a shift), Custom Agent ID table should be queried for the agent's custom ID for the facility and the custom agent ID should be added to the agent's metadata in the created shift. Set custom agent ID to null in agent's metadata if it's not found.

Time estimate: 7 days

---

**Task 3 - Create a page in UI which allows facilities to assign custom IDs to agents**
Acceptance criteria:
- User should be able to see a list of availabe agents and assign a custom agnet ID to each agent.
- User should see a confirmation dialog once they submit a custom agent ID.
- User should be able to edit or delete any custom agent ID.

Implementation details:
- User should be able to go to the agents tab and see a list of agents availabe to them.
- If an agent has a custom agent ID for the user's facility, display the custom agent ID, an edit custom agent ID button and delete custom agent ID button next to the agent.
- If user click the edit button, show a form in a modal which has an input field for the custom agent ID. The field should be prefilled with the existing custom agent ID. Show a submit button next to the field.
- If the user click on the delete button, show a confirmation dialog and delete the custom user agent ID if the user proceeds.
- If the agent doesn't have a custom agent ID, show an add custom agent ID button instead.
- Clicking on the add button should show a modal similar to the one shown on clicking the edit button.

Time estimate: 5 days

---

**Task 4 - Update `generateReport` function to display custom agent ID in the report**
Acceptance criteria:
- Display agent ID if custom agent ID when available in shift metadata. Otherwise, display the agent's ID.

Implementation details:
- Each shift returned by `getShiftsByFacility` function should have a field for custom agent ID in the agent's metadata.
- Display the custom agent ID if custom agent ID field is not null.
- Displat the agent ID if custom agent ID is null.

Time estimate: 2 days

---

### Dependency graph
```
Task 1
    |- Task 2
        |- Task 3
        |- Task 4
```