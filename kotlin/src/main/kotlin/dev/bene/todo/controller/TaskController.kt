package dev.bene.todo.controller

import dev.bene.todo.model.Task
import dev.bene.todo.repo.TaskRepository
import jakarta.validation.Valid
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@RestController
class TaskController (
    @Autowired var taskRepository: TaskRepository
) {
    val logger: Logger = LogManager.getLogger(TaskController::class.java)

    @GetMapping("/")
    @ResponseStatus(HttpStatus.I_AM_A_TEAPOT)
    fun index(): Map<String, String> {
        return mapOf("message" to "Hello World")
    }

    @GetMapping("/api/v1/task")
    fun getTasks(): Iterable<Task> {
        val tasks = taskRepository.findAll()
        logger.info("API '/api/v1/task': returns Iterable<Task> of size " + taskRepository.size() + " and content " + tasks.toString())
        return tasks
    }

    @GetMapping("/api/v1/task/{id}")
    fun getTaskById(@PathVariable id: Optional<Long>): Iterable<Task> {
        if(id.isPresent) {
            logger.info("API '/api/v1/task/{id}': returns Iterable<Task> of id " + id.get())
            return taskRepository.findByid(id.get())
        } else {
            logger.error("API '/api/v1/task/{id}': Task not found")
            throw Exception("Task not found")
        }
    }

    @PostMapping("/api/v1/task/add")
    fun addTask(@Valid @RequestBody task: Task): Iterable<Task> {
        logger.info("API '/api/v1/task/add': Adding task: " + task.description)
        taskRepository.save(task)
        return taskRepository.findAll()
    }

    @DeleteMapping("/api/v1/task/delete/{id}")
    fun deleteTaskByid(@PathVariable  id: Optional<Long>): Iterable<Task> {
        if(id.isPresent) {
            logger.info("API '/api/v1/task/delete/{id}': Deleting task of id " + id.get())
            taskRepository.deleteById(id.get())
            return taskRepository.findAll();
        } else {
            logger.error("API '/api/v1/task/delete/{id}': Task not found")
            throw Exception("Task not found")
        }
    }

    @PutMapping("/api/v1/task/edit/{id}")
    fun editTaskById(@PathVariable id: Optional<Long>, @Valid @RequestBody task: Task): Iterable<Task> {
        if(id.isPresent) {
            logger.info("API '/api/v1/task/edit/{id}': Editing task of id " + id.get())
            taskRepository.editTaskById(id.get(), task.description, task.date)
            return taskRepository.findAll()
        } else {
            logger.error("API '/api/v1/task/edit/{id}': Task not found")
            throw Exception("Task not found")
        }
    }

}
