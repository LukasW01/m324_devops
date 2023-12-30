package com.example.demo;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
@RestController
@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

    private List<Task> tasks = new ArrayList<>();

    @CrossOrigin
	@GetMapping("/")
    public List<Task> getTasks() {
    	System.out.println("API EP '/' returns task-list of size "+tasks.size()+".");
    	if (!tasks.isEmpty()) {
    		int i = 1;
    		for (Task task : tasks) {
                System.out.println("-task "+(i++)+":"+task.getTaskdescription());
            }
    	}
		return tasks;
	}

    @CrossOrigin
    @PostMapping("/tasks")
    public List<Task> addTask(@RequestBody String taskdescription) {
    	System.out.println("API EP '/tasks': '"+taskdescription+"'");
    	ObjectMapper mapper = new ObjectMapper();
		try {
			Task task = mapper.readValue(taskdescription, Task.class);
            task.setId(uniqueId());
            for (Task t : tasks) {
                if (t.getId().equals(task.getId())) {
                    System.out.println(">>>task with ID: '" + task.getId() + "' already exists!");
                }
            }
            System.out.println("...adding task with ID: '" + task.getId() + "' and description: '" + task.getTaskdescription() + "'");
            tasks.add(task);
			return getTasks();
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		return null;
    }

    @CrossOrigin
    @PostMapping("/delete")
    public List<Task> delTask(@RequestBody String id) {
    	System.out.println("API EP '/delete': '"+id+"'");
    	ObjectMapper mapper = new ObjectMapper();
		try {
			Task task;
			task = mapper.readValue(id, Task.class);
	    	Iterator<Task> iter = tasks.iterator();
			while (iter.hasNext()) {
				Task t = iter.next();
				if (t.getId().equals(task.getId())) {
					System.out.println("...deleting task with ID: '" + task.getId() + "' and description: '" + task.getTaskdescription() + "'");
					iter.remove();
				}
			}
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		return getTasks();
    }

	@CrossOrigin
	@PostMapping("/edit")
	public List<Task> editTask(@RequestBody String task) {
		System.out.println("API EP '/edit': '"+task+"'");
		ObjectMapper mapper = new ObjectMapper();
		try {
			Task tasks = mapper.readValue(task, Task.class);
			Iterator<Task> iter = this.tasks.iterator();
			while (iter.hasNext()) {
				Task t = iter.next();
				if (t.getId().equals(tasks.getId())) {
					System.out.println("...editing task with ID: '" + tasks.getId() + "' and description: '" + tasks.getTaskdescription() + "'");
					t.setTaskdescription(tasks.getTaskdescription());
				}
			}
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		return getTasks();
	}

	private Integer uniqueId() {
		Integer id = (int) (Math.random() * 1000);
		for (Task task : tasks) {
			if (task.getId().equals(id)) {
				return uniqueId();
			}
		}
		return id;
	}

	public void setTasks(List<Task> tasks) {
		this.tasks = tasks;
	}

	public List<Task> getTask() {
		return tasks;
	}

}
