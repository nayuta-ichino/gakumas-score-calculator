package com.example.demo.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FormationRequestDTO {
    private Integer slot1;
    private Integer slot2;
    private Integer slot3;
    private Integer slot4;
    private Integer slot5;
    private Integer slot6;
    
    private List<Integer> slotList;
}
