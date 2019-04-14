# Volunteer Scheduling System
## Jason and Mark

Core Features:
- Create an event
- Create time slots
- Allow people to signup for timeslots

API Interface:

  createEvent(string id, string name, Date startDate, Date endDate, Object timeSlotData, int numberOfSlots, int availableVolunteerSlots) {

    Creates a new event object.

    eventName: Name of the event

    eventStartDate: A Date object that says when the event starts

    eventEndDate: A Date object that says when the event ends

    numberOfSlots: The number of equally sized timeslots

    availableVolunteerSlots: The number of volunteer slots available in each time slot

  }

  joinTimeSlot(string eventId, string timeSlotId) {

    Joins a time slot.

    eventId: The unique identifier of the event which the user wants to attend
    
    timeSlotId: The unique identifier of the timeslot which the user wants to attend

  }


Database Schema:

  EventsList:

    Event: {

      eventId: string id

      dateCreated: Date date

      dateModified: Date date

      eventStartDate: Date date

      eventEndDate: Date date

      timeSlotData: Array [ TimeSlotObject ]

    }

  TimeSlotObject: {

    slotStartDate: Date date

    slotEndDate: Date date

    availableVolunteerSlots: int number

    volunteerSlotsTaken: array[] names

  }


Create Event Form Specifications:

  name: Event name

  startDate: Date and time the event starts

  endDate: Date and time the event ends

  numberOfSlots: The number of slots that the event will have

  availableVolunteerSlots: The number of volunteer slots in each timeslot
