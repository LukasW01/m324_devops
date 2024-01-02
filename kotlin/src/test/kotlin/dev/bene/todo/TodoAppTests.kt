package dev.bene.todo

import dev.bene.todo.controller.TaskController
import dev.bene.todo.model.Task
import dev.bene.todo.repo.TaskRepository
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.Mockito.mock
import org.springframework.boot.test.context.SpringBootTest
import java.util.*

@SpringBootTest
class TodoAppTests() {

	lateinit var taskController: TaskController

	@BeforeEach
	fun setupTestBeforeEach(): Unit {
		val taskRepository = mock<TaskRepository>()
		taskController = TaskController(taskRepository)

		listOf(
			Task("Task 1", Date()), Task("Task 2", Date()), Task("Task 3", Date())
		).forEach { taskRepository.save(it) }
	}

    @Test
	fun testGetTasks() {
		Assertions.assertFalse(taskController.getTasks().toList().isNotEmpty())
	}

	@Test
	fun testGetTaskById() {
		Assertions.assertFalse(taskController.getTaskById(Optional.of(1L)).toList().isNotEmpty())
	}

}
