package dev.bene.todo.repo

import dev.bene.todo.model.Task
import jakarta.transaction.Transactional
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface TaskRepository : CrudRepository<Task, Long> {
    fun findByid(id: Long): Iterable<Task>

    @Modifying
    @Query("update Task t set t.description = ?2, t.date = ?3 where t.id = ?1")
    @Transactional
    fun editTaskById(id: Long, description: String, date: java.util.Date)

    @Query("select count(t) from Task t")
    fun size(): Long
}
