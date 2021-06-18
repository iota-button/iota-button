import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';

// Load extension.
dayjs.extend(localizedFormat)
dayjs.extend(relativeTime)

export class DateTimeHelper {
  public static printDateTime(timestamp: number): string {
      return dayjs(timestamp * 1000).format('LLL');
  }

  public static fromNow(timestamp: number): string {
    return dayjs(timestamp * 1000).fromNow();
}
}