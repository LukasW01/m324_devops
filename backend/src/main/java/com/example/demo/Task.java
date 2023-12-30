package com.example.demo;
import java.util.Iterator;

import org.springframework.data.annotation.Id;
import jakarta.annotation.Generated;
import jakarta.validation.constraints.NotEmpty;

public class Task {
	
	@Id
    @Generated("assigned")
	private Integer id;

	@NotEmpty(message = "Please provide a task description")
	private String taskdescription; 

	public Task() {
    }

	public String getTaskdescription() {
		return taskdescription;
	}

	public void setTaskdescription(String taskdescription) {
		this.taskdescription = taskdescription;
	}

	public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
	}

}