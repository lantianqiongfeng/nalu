package com.nalu.umbrella.utils;

import org.joda.time.DateTime;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class DateUtils {

	public static final String DATE_FORMATE_LONG = "yyyy-MM-dd HH:mm:ss";

	public static final String DATE_FORMATE_SHOT = "yyyy-MM-dd";

	public static final String TIME_FORMATE_SHOT = "HH:mm:ss";

	public static final String TIME_FORMAT_8 = "yyMMdd";

    public static final Integer SECOND_IN_24_H = 86400;

	public static Date parseDate(String dateStr,String pattern){
		DateFormat format=new SimpleDateFormat(pattern);
		Date date=null;
		try {
			date=format.parse(dateStr);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return date;
	}

	public static Date addDays(final Date date, final int amount) {
		return add(date, Calendar.DAY_OF_MONTH, amount);
	}

	private static Date add(final Date date, final int calendarField, final int amount) {
		if (date == null) {
			throw new IllegalArgumentException("The date must not be null");
		}
		final Calendar c = Calendar.getInstance();
		c.setTime(date);
		c.add(calendarField, amount);
		return c.getTime();
	}

	public static  String format(Date date, String pattern){
		DateFormat format=new SimpleDateFormat(pattern);
		return format.format(date);
	}

	public static String getCurrentDate(){
		DateTime dateTime = DateTime.now();
		return dateTime.toString(DATE_FORMATE_LONG);
	}

	public static int daysBetween(String smdate,String bdate) throws ParseException{
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
		Calendar cal = Calendar.getInstance();
		cal.setTime(sdf.parse(smdate));
		long time1 = cal.getTimeInMillis();
		cal.setTime(sdf.parse(bdate));
		long time2 = cal.getTimeInMillis();
		long between_days=(time2-time1)/(1000*3600*24);

		return Integer.parseInt(String.valueOf(between_days));
	}

	public static int getDays(Date date1,Date date2) {
		Calendar start = Calendar.getInstance();
		start.setTime(date1);
		Calendar end = Calendar.getInstance();
		start.setTime(date2);

		long startTim = start.getTimeInMillis();
		long endTim = end.getTimeInMillis();
		long diff = endTim-startTim;
		long between_days=diff/(1000*3600*24);
		return Integer.parseInt(String.valueOf(between_days));
	}
}
