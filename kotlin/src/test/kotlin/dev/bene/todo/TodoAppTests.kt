package dev.bene.todo

import dev.bene.todo.controller.TaskController
import dev.bene.todo.model.Task
import dev.bene.todo.repo.TaskRepository
import org.junit.Assert
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.Mockito
import org.mockito.Mockito.mock
import org.springframework.boot.test.context.SpringBootTest
import java.util.*

@SpringBootTest
class TodoAppTests() {

	lateinit var taskController: TaskController

	@BeforeEach
	fun setupTestBeforeEach() {
		val taskRepository = mock<TaskRepository>()
		taskController = TaskController(taskRepository)

		val list = listOf(
			Task("Task 1", Date()), Task("Task 2", Date()), Task("Task 3", Date())
		)
		Mockito.`when`(taskRepository.findAll()).thenReturn(list)
	}

    @Test
	fun testGetTasks() {
		Assertions.assertTrue(taskController.getTasks().toList().isNotEmpty())
	}

	@Test
	fun testGetTaskById() {
		Assertions.assertFalse(taskController.getTaskById(Optional.of(1L)).toList().isNotEmpty())
	}

	@Test
	fun testAddTask() {
		Assertions.assertTrue(taskController.addTask(Task("Task 4", Date())).toList().isNotEmpty())
	}

	@Test
	fun testDeleteTaskById() {
		taskController.deleteTaskByid(Optional.of(1L))
		Assertions.assertTrue(taskController.getTaskById(Optional.of(1L)).toList().isEmpty())
	}

}
