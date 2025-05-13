package com.giaule.momentum.dtos;

import lombok.Data;

@Data
public class FilterTodoRequest {
    private String priorityLevel = "ALL";
    private String status = "ALL";

    private String sortBy = "due-desc";
}
