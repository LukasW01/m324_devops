package com.example.demo;

import org.springframework.data.annotation.AccessType;
import org.springframework.data.annotation.Id;
import jakarta.annotation.Generated;
import jakarta.validation.constraints.NotEmpty;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Task {

	@Id
    @Generated("assigned")
	private Integer id;

	@NotEmpty(message = "Please provide a task description")
	private String description;

	@NotEmpty(message = "Please provide a task date")
	@AccessType(AccessType.Type.PROPERTY)
	private Date date;


	public Task() {}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String taskdescription) {
		this.description = taskdescription;
	}

	public String getDate() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		return sdf.format(date);
	}

	public void setDate(String date) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		try {
			this.date = sdf.parse(date);
		} catch (ParseException e) {
			e.printStackTrace();
		}
	}
}
