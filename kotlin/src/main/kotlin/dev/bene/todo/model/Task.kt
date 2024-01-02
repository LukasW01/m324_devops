package dev.bene.todo.model

import com.fasterxml.jackson.annotation.JsonFormat
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import jakarta.validation.constraints.Future
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import org.hibernate.validator.constraints.Length
import org.springframework.data.annotation.AccessType
import java.util.*

@Entity
@Table(name = "task")
data class Task(
    @field:NotBlank @field:Length(min = 3, max = 255) @field:AccessType(AccessType.Type.PROPERTY)
    val description: String,

    @field:NotNull @field:Future @JsonFormat(pattern = "yyyy-MM-dd") @field:AccessType(AccessType.Type.PROPERTY)
    var date: Date,

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    var id: Long = -1
)
{
    constructor() : this("", Date())

}
