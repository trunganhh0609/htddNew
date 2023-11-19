import { EventInput } from '@fullcalendar/angular';

let eventGuid = 0;
export function createEventId() {
    return String(eventGuid++);
}

const category = [
    {
        name: 'Danger',
        value: 'bg-danger'
    },
    {
        name: 'Success',
        value: 'bg-success'
    },
    {
        name: 'Primary',
        value: 'bg-primary'
    },
    {
        name: 'Info',
        value: 'bg-info'
    },
    {
        name: 'Dark',
        value: 'bg-dark'
    },
    {
        name: 'Warning',
        value: 'bg-warning'
    },
];

const calendarEvents: EventInput[] = [
    {
        id: createEventId(),
        title: 'Meetingcssssssssssssssssss',
        start: new Date().setHours(new Date().getHours() + 1),
        end: new Date().setHours(new Date().getHours() + 2),
        durationEditable: true,
        className: 'bg-warning text-white',
    },
    {
        id: createEventId(),
        title: 'Lunch',
        start: new Date(),
        end: new Date(),
        durationEditable: true,
        className: 'bg-success text-white',
    },
    {
        id: createEventId(),
        title: 'Birthday - party',
        start: new Date().setDate(new Date().getDate() + 8),
        className: 'bg-info text-white',
    },
    {
        id: createEventId(),
        title: 'Long Event',
        start: new Date().setDate(new Date().getDate() + 7),
        end: new Date().setDate(new Date().getDate() + 8),
        className: 'bg-primary text-white'
    }
];

export { category, calendarEvents };
