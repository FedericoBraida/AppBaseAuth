export class DateUTCHelper {
    public static getDateUTC() {
      const date = new Date();
      const dateUTC = new Date(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds()
      );
      return dateUTC;
    }
  
    public static readonly ShortDateFormatOption: any = {
      weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
    };
  
  
    public static toDateShortString(date: Date, locate: string): string {
      return date.toLocaleDateString(locate, DateUTCHelper.ShortDateFormatOption);
    }
  
    private static dateUTCFormat: RegExp = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}((\.\d*)?))(?:Z|(\+|-)([\d|:]*))?$/;
    private static dateUTCFormatShort: RegExp = /^(\d{4})-(\d{2})-(\d{2})?$/;
  
    public static jsonDateParserResive(key: any, value: any) {
      if (typeof value === 'string') {
        var isValidDateTime = DateUTCHelper.dateUTCFormat.exec(value);
        if (isValidDateTime) {
          return new Date(value);
        }
      }
      return value;
    }
  
    public static valueDateParserResive(value: any) {
      if (typeof value === 'string') {
        var isValidDateTime = DateUTCHelper.dateUTCFormat.exec(value);
        if (isValidDateTime) {
          return new Date(value);
        }
      }
      return value;
    }
  
    public static valueDateShortParserResive(value: any) {
      if (typeof value === 'string') {
        var isValidDateTime = DateUTCHelper.dateUTCFormatShort.exec(value);
        if (isValidDateTime) {
          let date = new Date(value);
          return DateUTCHelper.addMinutes(date, date.getTimezoneOffset());
        }
      }
      return value;
    }
  
    public static valueDateShortEndTimeParserResive(value: any) {
      if (typeof value === 'string') {
        var isValidDateTime = DateUTCHelper.dateUTCFormatShort.exec(value);
        if (isValidDateTime) {
          let date = new Date(value);
          return DateUTCHelper.addMinutes(DateUTCHelper.addMiliSeconds(DateUTCHelper.addDays(date, 1), -1), date.getTimezoneOffset());
        }
      }
      return value;
    }
  
    public static getDateUTCFormat(date: Date) {
      if (typeof date === 'object') {
        var isValidDateTime = DateUTCHelper.dateUTCFormat.exec(date.toISOString());
        if (isValidDateTime) {
          date.setHours(0);
          return date.toISOString().split('T')[0];
        }
      }
      return undefined;
    }
  
    public static addDays(d: Date, days: number): Date {
      var date = new Date(d);
      date.setDate(date.getDate() + days);
      return date;
    }
  
    public static addHours(d: Date, hours: number): Date {
      return DateUTCHelper.addMinutes(d, hours * 60);
    }
  
    public static addMinutes(d: Date, minutes: number): Date {
      return DateUTCHelper.addSeconds(d, minutes * 60);
    }
  
    public static addSeconds(d: Date, seconds: number): Date {
      return DateUTCHelper.addMiliSeconds(d, seconds * 1000);
    }
  
    public static addMiliSeconds(d: Date, miliSeconds: number): Date {
      var numberOfMlSeconds = d.getTime();
      return new Date(numberOfMlSeconds + miliSeconds);
    }
  
  
  }
  