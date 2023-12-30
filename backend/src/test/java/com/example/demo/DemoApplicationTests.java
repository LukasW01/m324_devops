package com.example.demo;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
@AutoConfigureMockMvc
class DemoApplicationTests {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private DemoApplication demoApplication;

	@BeforeEach
	void addTaskViaEndpoint() throws Exception {
		Task task = new Task();
		task.setId(1);
		task.setTaskdescription("Test"); 

		demoApplication.addTask(new ObjectMapper().writeValueAsString(task));
	}

	@Test
	void getTask() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("http://localhost:8080/").accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk());
	}

	@Test
	void deleteTask() throws Exception {
		Task deleteTask = new Task();
		deleteTask.setId(1);

		mockMvc.perform(MockMvcRequestBuilders.post("http://localhost:8080/delete")
			.contentType(MediaType.APPLICATION_JSON)
			.content(new ObjectMapper().writeValueAsString(deleteTask))
			.accept(MediaType.APPLICATION_JSON))
			.andExpect(status().isOk());
	}

}
