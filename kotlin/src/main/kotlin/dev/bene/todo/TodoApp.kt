package dev.bene.todo

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class TodoApp

fun main(args: Array<String>) {
	runApplication<TodoApp>(*args)
}
