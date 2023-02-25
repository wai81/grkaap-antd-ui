import type { Moment } from 'moment';
import momentGenerateConfig from 'rc-picker/lib/generate/moment';
import generateCalendar from 'antd/es/calendar/generateCalendar';

const Calendar = generateCalendar<Moment>(momentGenerateConfig);

export default Calendar;